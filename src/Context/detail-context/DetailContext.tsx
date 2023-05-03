import { createContext, useState } from "react";

interface IInitialState {
  reviewState: IResultReview[];
  MovieDetailsState: IMovieDetail | undefined;
  storeAllDetailsState: (detail: IMovieDetail, review: IResultReview[]) => Promise<void>;
}

interface IDetailProviderProps {
  // define props here
  children: React.ReactNode;
}

const initialState: IInitialState = {
  reviewState: [],
  storeAllDetailsState: () => Promise.resolve(),
  MovieDetailsState: undefined,
};

export const DetailContext = createContext<IInitialState>(initialState);

export const DetailProvider = (props: React.PropsWithChildren<IDetailProviderProps>) => {
  const [state, setState] = useState(initialState);

  const storeAllDetailsState = async (resDetailMovie: IMovieDetail, resReviewMovie: IResultReview[]): Promise<void> => {
    // will run all at the same time,
    // ---> method 1st
    // const newState = { ...state };
    // newState.Details = { ...resDetail };
    // newState.Review = { ...resReview };
    // newState.accountState = { ...resFetchState };
    // setState(newState);
    resReviewMovie = resReviewMovie.splice(0, 5);
    setState({ ...state, MovieDetailsState: resDetailMovie, reviewState: resReviewMovie });
  };

  return (
    <DetailContext.Provider
      value={{
        MovieDetailsState: state.MovieDetailsState,
        reviewState: state.reviewState,
        storeAllDetailsState,
      }}>
      {props.children}
    </DetailContext.Provider>
  );
};
