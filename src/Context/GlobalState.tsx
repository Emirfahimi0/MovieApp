import { Genre, MovieType, user } from "../screens";
import React, { createContext, useState } from "react";
import { sessionWithLogIn } from "../services/api-services";
import { IMovieDetail, IReview, IAccountState } from "../services";

export interface IInitialState {
  accountState: IAccountState;
  addTrendingMovies: (movie: MovieType[]) => void;
  detailsState: IMovieDetail;
  filterMovieByGenre: (item: Genre, index: number) => void;
  genreState: Genre[];
  getGenre: (genre: Genre[]) => Promise<void>;
  getUser: (username: string, password: string) => Promise<string>;
  movieState: MovieType[];
  reviewState: IReview[];
  storeIntoState: (detail: IMovieDetail, review: IReview[]) => Promise<void>;
  userState: user;
}

const existingUser = [
  { username: "emirfahimi", password: "adidas", id: "68xclia3s8" },
  { username: "e", password: "0", id: "q9anz4" },
  { username: "dry", password: "5", id: "A94r78" },
];

interface GlobalProviderProps {
  // define props here
  children?: JSX.Element[];
}

const initialState: IInitialState = {
  getGenre: () => Promise.resolve(),
  addTrendingMovies: () => {},
  getUser: () => Promise.resolve(""),
  storeIntoState: () => Promise.resolve(),
  filterMovieByGenre: () => {},
  detailsState: {},
  accountState: {},
  reviewState: [],
  genreState: [],
  movieState: [],
  user: {
    id: "",
    password: "",
    username: "",
  },
};

// create Context
export const GlobalContext = createContext<IInitialState>(initialState);

// provider components. build components
export const GlobalProvider = (props: React.PropsWithChildren<GlobalProviderProps>) => {
  const [state, setState] = useState(initialState);

  // Get local user store
  const getUser = async (username: string, password: string): Promise<string> => {
    let message = "";
    let tryLogInUser = await sessionWithLogIn(username, password);
    if (tryLogInUser) {
      const currentUser = existingUser.find((item) => item.username === username.toLowerCase() && item.password === password);
      if (currentUser) {
        setState({ ...state, userState: { ...currentUser } });
        message = "success!";
      } else {
        message = "no user found";
      }
    } else {
      message = "error uknown";
    }
    return message;
  };

  const filterMovieByGenre = (item: Genre, index: number): void => {
    const currentFilter = state.movieState.filter((element) => {
      element.genre_ids.includes(item.id);
    });
    console.log(currentFilter);
    // setState({ ...state, movieState: currentFilter });
  };

  // set trending movies into a state
  const addTrendingMovies = async (movies: MovieType[]): Promise<void> => {
    setState({ ...state, movieState: movies });
    // call the function
  };

  const getGenre = async (genre: Genre[]): Promise<void> => {
    setState({ ...state, genreState: genre });
  };
  const storeIntoState = async (resDetail: IMovieDetail, resReview: IReview[]): Promise<void> => {
    // will run all at the same time,
    // ---> method 1st
    // const newState = { ...state };
    // newState.Details = { ...resDetail };
    // newState.Review = { ...resReview };
    // newState.accountState = { ...resFetchState };
    // setState(newState);
    setState({ ...state, detailsState: resDetail, reviewState: resReview });
  };
  return (
    <GlobalContext.Provider
      value={{
        addTrendingMovies,
        getGenre,
        getUser,
        storeIntoState,
        filterMovieByGenre,
        reviewState: state.reviewState,
        accountState: state.accountState,
        detailsState: state.detailsState,
        movieState: state.movieState,
        genreState: state.genreState,
        userState: state.userState,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
