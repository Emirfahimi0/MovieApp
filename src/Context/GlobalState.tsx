import {
  ADD_MOVIE_WATCHLIST,
  LOAD_MOVIE,
  REMOVE_MOVIE_WATCH_LIST,
  REMOVE_STORED_RATING,
  STORE_RATING,
  SUCCESS_LOAD_MOVIE,
} from "../constants/MovieConstant";
import { IMovie, MovieType } from "../screens";
import { USER_SUCCESS } from "../constants/userConstant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieReducer from "../reducer/MovieReducer";
import React, { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "../constants/utilities";
import { createRequestToken, getTrendingmovie, sessionWithLogIn } from "../services/APIservices";

export interface IInitialState {
  WatchList: MovieType[];
  Watched: IMovie[];
  Movie: IMovie[];
  User: user;
  Genre: listGenres[];
  Rating: userRating[];
  getUser: (username: string, password: string) => Promise<boolean>;
  addMovieWatchList: (movie: MovieType) => void;
  getMovies: (movie: MovieType) => void;
  getGenre: (movie: MovieType) => void;
  deleteStoreRating: (id: user) => void;
  removeMovieWatchList: (id: number) => void;
  storeRating: (rating: number, user: user, movie: MovieType) => void;
}

const existingUser = [
  { username: "emirfahimi", password: "adidas", id: "68xclia3s8" },
  { username: "e", password: "0", id: "q9anz4" },
  { username: "dry", password: "5", id: "A94r78" },
];

export type userRating = {
  user: user;
  Movie: MovieType;
  ratingVal: number;
};

export type user = {
  id: string;
  password: string;
  username: string;
};

interface GlobalProviderProps {
  // define props here
  children?: any;
}

export type listGenres = string;

const initialState: IInitialState = {
  addMovieWatchList: () => {},
  getGenre: () => {},
  getMovies: () => {},
  getUser: () => Promise.resolve(false),
  removeMovieWatchList: () => {},
  storeRating: () => {},
  deleteStoreRating: () => {},
  Genre: [],
  Movie: [],
  Rating: [],
  User: {
    id: "",
    password: "",
    username: "",
  },
  Watched: [],
  WatchList: [],
};

// create Context
export const GlobalContext = createContext<IInitialState>(initialState);

// provider components. build components
export const GlobalProvider = (props: React.PropsWithChildren<GlobalProviderProps>) => {
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  useEffect(() => {
    // declare the data fetching function
    const fetchAsyncStorage = async () => {
      if (state.WatchList && state.Watched) {
        await AsyncStorage.setItem("watchlist", JSON.stringify(state.WatchList));
        await AsyncStorage.setItem("watched", JSON.stringify(state.Watched));
      }
    };
    // call the function
    fetchAsyncStorage()
      // make sure to catch any error
      .catch(console.error);
  }, [state]);

  //actions
  const getMovies = async (movie) => {
    const data = getTrendingmovie();
    console.log("get Movies console log data..", data);
    dispatch({ type: SUCCESS_LOAD_MOVIE, payload: data });
  };

  const addMovieWatchList = (movie: MovieType) => {
    // to do api post
    if (movie) {
      const token = createRequestToken();

      // postWatchlist(movie);
      dispatch({ type: ADD_MOVIE_WATCHLIST, payload: movie });
    }
  };
  const removeMovieWatchList = (id) => {
    const currentWatchList = state.WatchList.filter((movie: MovieType) => movie.id != id);

    dispatch({ type: REMOVE_MOVIE_WATCH_LIST, payload: currentWatchList });
    // console.log()
    console.log("currentWatchList", currentWatchList);
  };

  // Get local user store
  const getUser = async (username: string, password: string): Promise<boolean> => {
    let isLoggedIn: boolean = false;
    let tryLogInUser = await sessionWithLogIn(username, password);
    if (tryLogInUser === true) {
      const currentUser = existingUser.find((item) => item.username === username.toLowerCase() && item.password === password);
      console.log("current user", currentUser);
      if (currentUser) {
        dispatch({ type: USER_SUCCESS, payload: currentUser });
        console.log("currentUser", currentUser);
        isLoggedIn = true;
      }
    } else {
      isLoggedIn = false;
    }
    console.log("isLoggedIn", isLoggedIn);
    return isLoggedIn;
  };

  // To submit rating
  const storeRating = (rating: number, user: user, movie: MovieType) => {
    let storeRate = {
      Movie: movie,
      user: { ...user },
      ratingVal: rating,
    };
    dispatch({ type: STORE_RATING, payload: storeRate });
  };

  // To delete submitted rating
  const deleteStoreRating = (currentUser: user) => {
    const currentRatingStore = state.Rating.filter((user: user) => user.id == currentUser.id);
    console.log("Delete Store Rating", currentRatingStore);
    dispatch({ type: REMOVE_STORED_RATING, payload: currentRatingStore });
  };

  // To fix !!
  const storeMovie = async () => {
    const [Movie, setMovie] = useState<MovieType>();
    useEffect(() => {
      const fetchMovieData = async () => {
        await axios.get(ENDPOINTS.GET_TRENDING, { responseType: "json" }).then(function (response) {
          //console.log("Movie ", response.data.results);
          setMovie(response.data.results);
          return response.data.results;
        });
      };

      console.log("Store Movie context", storeMovie);
      // call the function
      fetchMovieData().catch(console.error);
    }, [Movie]);
    dispatch({ type: LOAD_MOVIE, payload: Movie });
  };

  const getGenre = (genre) => {};

  return (
    <GlobalContext.Provider
      value={{
        addMovieWatchList,
        removeMovieWatchList,
        deleteStoreRating,
        storeRating,
        getMovies,
        getGenre,
        getUser,
        Movie: state.Movie,
        Rating: state.Rating,
        Genre: state.Genre,
        User: state.User,
        Watched: state.Watched,
        WatchList: state.WatchList,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
