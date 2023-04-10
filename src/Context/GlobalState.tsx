import { Genre, MovieType, user, userRating } from "../screens";
import React, { createContext, useState } from "react";
import { sessionWithLogIn } from "../services/APIservices";
import { MovieDetail } from "src/services";

export interface IInitialState {
  Movie: MovieType[];
  User: user;
  Genre: Genre[];
  Rating: userRating[];
  getUser: (username: string, password: string) => Promise<boolean>;
  addTrendingMovies: (movie: MovieType[]) => void;
  getGenre: (genre: Genre[]) => Promise<void>;
  deleteStoreRating: (id: user) => void;

  storeRating: (rating: number, user: user, movie: MovieType | MovieDetail) => void;
}

const existingUser = [
  { username: "emirfahimi", password: "adidas", id: "68xclia3s8" },
  { username: "e", password: "0", id: "q9anz4" },
  { username: "dry", password: "5", id: "A94r78" },
];

interface GlobalProviderProps {
  // define props here
  children?: any;
}

const initialState: IInitialState = {
  getGenre: () => Promise.resolve(),
  addTrendingMovies: () => {},
  getUser: () => Promise.resolve(false),
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
};

// create Context
export const GlobalContext = createContext<IInitialState>(initialState);

// provider components. build components
export const GlobalProvider = (props: React.PropsWithChildren<GlobalProviderProps>) => {
  const [state, setState] = useState(initialState);

  // Get local user store
  const getUser = async (username: string, password: string): Promise<boolean> => {
    let isLoggedIn: boolean = false;
    let tryLogInUser = await sessionWithLogIn(username, password);
    if (tryLogInUser === true) {
      const currentUser = existingUser.find((item) => item.username === username.toLowerCase() && item.password === password);
      if (currentUser) {
        setState({ ...state, User: { ...currentUser } });
        isLoggedIn = true;
      }
    } else {
      isLoggedIn = false;
    }
    return isLoggedIn;
  };

  // To submit rating
  const storeRating = (rating: number, user: user, movie: MovieType | MovieDetail) => {
    let storeRate = {
      Movie: movie,
      user: { ...user },
      ratingVal: rating,
    };
    setState({ ...state, Rating: [storeRate, ...state.Rating] });
  };

  // To delete submitted rating
  const deleteStoreRating = (currentUser: user) => {
    const updatedRating = [...state.Rating];
    const currentRatingStore = updatedRating.filter((user: userRating) => user.user.id !== currentUser.id);
    console.log("Deleted current rating by user ", currentRatingStore);
    setState({ ...state, Rating: currentRatingStore });
  };

  // To do
  const addTrendingMovies = async (movies: MovieType[]): Promise<void> => {
    setState({ ...state, Movie: movies });
    // call the function
  };

  const getGenre = async (genre: Genre[]): Promise<void> => {
    setState({ ...state, Genre: genre });
  };

  return (
    <GlobalContext.Provider
      value={{
        deleteStoreRating,
        storeRating,
        addTrendingMovies,
        getGenre,
        getUser,
        Movie: state.Movie,
        Rating: state.Rating,
        Genre: state.Genre,
        User: state.User,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

// cammel cases
