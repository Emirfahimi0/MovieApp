import { TUser } from "../screens";
import React, { createContext, useState } from "react";
import { sessionWithLogIn } from "../services/api-services";
import { IAccountState } from "../services";
import { handleIsLogin } from "../components/features/handleFunctions";

export interface IInitialState {
  accountState: IAccountState;
  storeUser: (username: string, password: string, requestToken: string, faceId?: string) => Promise<string>;
  userState: TUser;
}

const existingUser = [
  { username: "emirfahimi", password: "adidas", id: "68xclia3s8" },
  { username: "e", password: "0", id: "q9anz4" },
  { username: "dry", password: "5", id: "A94r78" },
];

interface GlobalProviderProps {
  // define props here
  children: React.ReactNode;
}

const initialState: IInitialState = {
  accountState: {
    favourite: true,
    id: 0,
    rated: true,
    watchlist: true,
  },
  storeUser: () => Promise.resolve(""),
  userState: {
    id: "",
    password: "",
    responseToken: "",
    username: "",
  },
};

// create Context
export const GlobalContext = createContext<IInitialState>(initialState);

// provider components. build components
export const GlobalProvider = (props: React.PropsWithChildren<GlobalProviderProps>) => {
  const [state, setState] = useState(initialState);

  // Get local user store
  const storeUser = async (username: string, password: string, requestToken?: string, authMethod?: string): Promise<string> => {
    let message = "";
    let tryAuth = false;

    if (authMethod === "faceId") {
      tryAuth = await handleIsLogin(); // Function to authenticate with Face ID
    } else {
      tryAuth = await sessionWithLogIn(username, password);
    }

    if (tryAuth) {
      const currentUser = existingUser.find((item) => item.username === username.toLowerCase() && item.password === password);
      if (currentUser) {
        setState({ ...state, userState: { ...currentUser } });
        message = "success!";
      } else {
        message = "no user found";
      }
    } else {
      message = "authentication failed";
    }
    return message;
  };

  return (
    <GlobalContext.Provider
      value={{
        accountState: state.accountState,
        storeUser,
        userState: state.userState,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
