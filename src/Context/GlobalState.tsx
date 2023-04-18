import { Genre, TMovieType, TUser } from "../screens";
import React, { createContext, useState } from "react";
import { sessionWithLogIn } from "../services/api-services";
import { IMovieDetail, IAccountState, IResult } from "../services";
import { submitByFaceId } from "../components/features/handleFunctions";

export interface IInitialState {
  accountState: IAccountState;
  detailsState: IMovieDetail;
  genreState: Genre[];

  reviewState: IResult[];
  storeAllDetailsState: (detail: IMovieDetail, review: IResult[]) => Promise<void>;
  storeGenre: (genre: Genre[]) => Promise<void>;
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
  children?: React.ReactNode;
}

const initialState: IInitialState = {
  accountState: {
    favourite: true,
    id: 0,
    rated: 5 | true,
    watchlist: true,
  },
  detailsState: {},

  genreState: [],
  reviewState: [],
  storeAllDetailsState: () => Promise.resolve(),
  storeGenre: () => Promise.resolve(),
  storeUser: () => Promise.resolve(""),
  user: {
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
      tryAuth = await submitByFaceId(); // Function to authenticate with Face ID
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

  //  filter movie by genre

  // const removeWatchlist = async (resWatchlist: TMovieType[]): Promise<void> => {};
  // const addWatchlist = async (resWatchlist: TMovieType): Promise<void> => {
  //   const currentWatchlist = state.watchlistState.find((element) => element.id !== resWatchlist.id);
  //   setState({ ...state, watchlistState: currentWatchlist });
  // };

  // set trending movies into a state

  const storeGenre = async (genre: Genre[]): Promise<void> => {
    setState({ ...state, genreState: genre });
  };
  const storeAllDetailsState = async (resDetailMovie: IMovieDetail, resReviewMovie: IResult[]): Promise<void> => {
    // will run all at the same time,
    // ---> method 1st
    // const newState = { ...state };
    // newState.Details = { ...resDetail };
    // newState.Review = { ...resReview };
    // newState.accountState = { ...resFetchState };
    // setState(newState);
    resReviewMovie = resReviewMovie.splice(0, 5);
    setState({ ...state, detailsState: resDetailMovie, reviewState: resReviewMovie });
  };
  return (
    <GlobalContext.Provider
      value={{
        accountState: state.accountState,
        detailsState: state.detailsState,
        genreState: state.genreState,
        storeGenre,
        storeUser,
        reviewState: state.reviewState,
        storeAllDetailsState,
        userState: state.userState,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
