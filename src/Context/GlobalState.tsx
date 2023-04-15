import { Genre, MovieType, user } from "../screens";
import React, { createContext, useState } from "react";
import { sessionWithLogIn } from "../services/api-services";
import { IMovieDetail, IReview, IAccountState } from "../services";

export interface IInitialState {
  accountState: IAccountState;
  handleTrendingMovies: (movie: MovieType[], item: Genre, index: number) => void;
  activeGenreId: number;
  detailsState: IMovieDetail;
  filterMovieByGenre: (item: Genre, index: number) => void;
  genreState: Genre[];
  storeGenre: (genre: Genre[]) => Promise<void>;
  storeUser: (username: string, password: string) => Promise<string>;
  movieState: MovieType[];
  filteredMovieState: MovieType[];
  reviewState: IReview[];
  storeAllState: (detail: IMovieDetail, review: IReview[]) => Promise<void>;
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
  accountState: {
    favourite: true,
    id: 0,
    rated: 5 | true,
    watchlist: true,
  },
  handleTrendingMovies: () => {},
  activeGenreId: 0,
  detailsState: {},
  filterMovieByGenre: () => {},
  genreState: [],
  storeGenre: () => Promise.resolve(),
  storeUser: () => Promise.resolve(""),
  movieState: [],
  filteredMovieState: [],
  reviewState: [],
  storeAllState: () => Promise.resolve(),
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
  const storeUser = async (username: string, password: string): Promise<string> => {
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
      message = "error unknown";
    }
    return message;
  };

  // Method filtering movie by genre
  const filterMovieByGenre = (item: Genre, index: number): void => {
    // check if the selected item is already in active filter in the state
    if (item.id === state.activeGenreId) {
      return;
    }
    const currentFilter = state.movieState.filter((element) => {
      return element.genre_ids.includes(item.id);
    });
    // console.log("current filter", currentFilter);
    setState({ ...state, filteredMovieState: currentFilter, activeGenreId: item.id });
    // console.log(state.activeGenreId);
  };

  // set trending movies into a state
  const handleTrendingMovies = async (movies: MovieType[], item: Genre, index: number): Promise<void> => {
    // check if the selected item is already in active filter in the state
    if (item.id === state.activeGenreId) {
      return;
    }
    const currentFilter = movies.filter((element) => {
      return element.genre_ids.includes(item.id);
    });
    setState({ ...state, movieState: movies, filteredMovieState: currentFilter, activeGenreId: item.id });
    // call the function
  };

  const storeGenre = async (genre: Genre[]): Promise<void> => {
    setState({ ...state, genreState: genre });
  };
  const storeAllState = async (resDetail: IMovieDetail, resReview: IReview[]): Promise<void> => {
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
        accountState: state.accountState,
        activeGenreId: state.activeGenreId,
        handleTrendingMovies,
        detailsState: state.detailsState,
        filteredMovieState: state.filteredMovieState,
        filterMovieByGenre,
        genreState: state.genreState,
        storeGenre,
        storeUser,
        movieState: state.movieState,
        reviewState: state.reviewState,
        storeAllState,
        userState: state.userState,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
