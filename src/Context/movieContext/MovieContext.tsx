import { createContext, useState } from "react";
import { Genre, TMovieType } from "../../screens";

export interface IInitialState {
  filteredMovieState: TMovieType[];
  filterMovieByGenre: (item: Genre, index: number) => void;
  handleTrendingMovies: (movie: TMovieType[], item: Genre) => void;
  movieState: TMovieType[];
  activeGenreId: number;
}

interface IMovieContextProviderProps {
  // define props here
  children?: React.ReactNode;
}

const initialState: IInitialState = {
  filteredMovieState: [],
  activeGenreId: 0,

  handleTrendingMovies: () => Promise<void>,
  movieState: [],
  filterMovieByGenre: () => Promise<void>,
};

export const MovieContext = createContext<IInitialState>(initialState);
export const MovieProvider = (props: React.PropsWithChildren<IMovieContextProviderProps>) => {
  const [state, setState] = useState(initialState);

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
  return (
    <MovieContext.Provider
      value={{
        activeGenreId: state.activeGenreId,
        handleTrendingMovies,
        filteredMovieState: state.filteredMovieState,
        filterMovieByGenre,
        movieState: state.movieState,
      }}>
      {props.children}
    </MovieContext.Provider>
  );
};
