import { Genre, TMovieType, TUser } from "../screens";
import React, { createContext, useState } from "react";
import { sessionWithLogIn } from "../services/api-services";
import { IMovieDetail, IAccountState, IResult } from "../services";
import { fetchWatchlist, submitByFaceId } from "../components/features/handleFunctions";

export interface IInitialState {
  accountState: IAccountState;
  activeGenreId: number;
  detailsState: IMovieDetail;
  filteredMovieState: TMovieType[];
  filterMovieByGenre: (item: Genre, index: number) => void;
  genreState: Genre[];
  handleTrendingMovies: (movie: TMovieType[], item: Genre) => void;
  movieState: TMovieType[];
  reviewState: IResult[];
  storeWatchlist: () => void;
  storeAllDetailsState: (detail: IMovieDetail, review: IResult[]) => Promise<void>;
  storeGenre: (genre: Genre[]) => Promise<void>;
  storeUser: (username: string, password: string, requestToken: string, faceId?: string) => Promise<string>;
  watchlistState: TMovieType[];
  userState: TUser;
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
  handleTrendingMovies: () => Promise<void>,
  activeGenreId: 0,
  detailsState: {},
  filterMovieByGenre: () => Promise<void>,
  genreState: [],
  storeGenre: () => Promise.resolve(),
  storeUser: () => Promise.resolve(""),
  movieState: [],
  filteredMovieState: [],
  reviewState: [],
  watchlistState: [],
  storeAllDetailsState: () => Promise.resolve(),
  user: {
    id: "",
    password: "",
    username: "",
    responseToken: "",
  },
  storeWatchlist: () => Promise<void>,
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
  const filterMovieByGenre = (item: Genre, index: number): void => {
    // check if the selected item is already in active filter in the state
    if (item.id === state.activeGenreId) {
      return;
    }
    const currentFilter = state.movieState.filter((element) => {
      return element.genre_ids.includes(item.id);
    });
    setState({ ...state, filteredMovieState: currentFilter, activeGenreId: item.id });
    // console.log(state.activeGenreId);
  };

  const storeWatchlist = async (): Promise<void> => {
    const responseWatchlist = await fetchWatchlist();
    if (responseWatchlist !== undefined) {
      setState({ ...state, watchlistState: responseWatchlist });
    }
  };

  // const removeWatchlist = async (resWatchlist: TMovieType[]): Promise<void> => {};
  // const addWatchlist = async (resWatchlist: TMovieType): Promise<void> => {
  //   const currentWatchlist = state.watchlistState.find((element) => element.id !== resWatchlist.id);
  //   setState({ ...state, watchlistState: currentWatchlist });
  // };

  // set trending movies into a state
  const handleTrendingMovies = async (movies: TMovieType[], item: Genre): Promise<void> => {
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
        watchlistState: state.watchlistState,
        storeWatchlist,
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
        storeAllDetailsState,
        userState: state.userState,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
