import { Genre, MovieType, user, userRating } from "../screens";
import React, { createContext, useState } from "react";
import { sessionWithLogIn } from "../services/api-services";
import { IMovieDetail, IReview, IAccountState } from "../services";

export interface IInitialState {
  movieState: MovieType[];
  userState: user;
  detailsState: IMovieDetail;
  genreState: Genre[];
  reviewState: IReview[];
  accountState: IAccountState;
  ratingState: userRating[];
  getUser: (username: string, password: string) => Promise<string>;
  addTrendingMovies: (movie: MovieType[]) => void;
  getGenre: (genre: Genre[]) => Promise<void>;
  deleteStoreRating: (id: user) => void;
  storeIntoState: (detail: IMovieDetail, review: IReview[], accstate: IAccountState) => Promise<void>;
  storeRating: (rating: number, user: user, movie: MovieType | IMovieDetail) => void;
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
  storeRating: () => {},
  deleteStoreRating: () => {},
  storeIntoState: () => Promise.resolve(),
  detailsState: {},
  accountState: {},
  reviewState: [],
  genreState: [],
  movieState: [],
  ratingState: [],
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

  // To submit rating
  const storeRating = (rating: number, user: user, movie: MovieType | IMovieDetail) => {
    let storeRate = {
      Movie: movie,
      user: { ...user },
      ratingVal: rating,
    };
    setState({ ...state, ratingState: [storeRate, ...state.ratingState] });
  };

  // To delete submitted rating
  const deleteStoreRating = (currentUser: user) => {
    const updatedRating = [...state.ratingState];
    const currentRatingStore = updatedRating.filter((user: userRating) => user.user.id !== currentUser.id);
    console.log("Deleted current rating by user ", currentRatingStore);
    setState({ ...state, ratingState: currentRatingStore });
  };

  // To do
  const addTrendingMovies = async (movies: MovieType[]): Promise<void> => {
    setState({ ...state, movieState: movies });
    // call the function
  };

  const getGenre = async (genre: Genre[]): Promise<void> => {
    setState({ ...state, genreState: genre });
  };
  const storeIntoState = async (resDetail: IMovieDetail, resReview: IReview[], resFetchState: IAccountState): Promise<void> => {
    // will run all at the same time,
    // ---> method 1st
    // const newState = { ...state };
    // newState.Details = { ...resDetail };
    // newState.Review = { ...resReview };
    // newState.accountState = { ...resFetchState };
    // setState(newState);
    setState({ ...state, accountState: resFetchState, detailsState: resDetail, reviewState: resReview });
  };
  return (
    <GlobalContext.Provider
      value={{
        deleteStoreRating,
        storeRating,
        addTrendingMovies,
        getGenre,
        getUser,
        storeIntoState,
        reviewState: state.reviewState,
        accountState: state.accountState,
        detailsState: state.detailsState,
        movieState: state.movieState,
        ratingState: state.ratingState,
        genreState: state.genreState,
        userState: state.userState,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
