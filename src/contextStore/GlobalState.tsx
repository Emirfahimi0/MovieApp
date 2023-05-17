import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";

export interface IInitialState {
  storeUser: (username: string, password: string, requestToken: string, faceId?: string) => Promise<string>;
  userState: TUser;
  isUserLoggedIn: (isLoggedIn: boolean) => Promise<void>;
  isLoggedIn: boolean;
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
  storeUser: () => Promise.resolve(""),
  isUserLoggedIn: () => Promise.resolve(),
  userState: {
    id: "",
    password: "",
    responseToken: "",
    username: "",
  },
  isLoggedIn: false,
};

// create Context
export const GlobalContext = createContext<IInitialState>(initialState);

// provider components. build components
export const GlobalProvider = (props: React.PropsWithChildren<GlobalProviderProps>) => {
  const [state, setState] = useState(initialState);

  // Get local user store
  const storeUser = async (username: string, password: string): Promise<string> => {
    let message = "";
    const currentUser = existingUser.find((item) => item.username === username.toLowerCase() && item.password === password);
    if (currentUser) {
      setState({ ...state, userState: { ...currentUser } });
      message = "success!";
    } else {
      message = "no user found";
    }

    return message;
  };

  const isUserLoggedIn = async (isLoggedIn: boolean) => {
    const isUserlogged = await AsyncStorage.getItem("userLoggedIn").then((value) => {
      const storage = JSON.parse(value ?? "null");
      console.log(storage);
      return storage;
    });
    if (isUserlogged === null) {
      setState({ ...state, isLoggedIn: isLoggedIn });
    } else {
      setState({ ...state, isLoggedIn: isUserlogged });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        isUserLoggedIn,
        storeUser,
        userState: state.userState,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
