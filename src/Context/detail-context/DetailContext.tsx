import { createContext, useState } from "react";
import { IMovieDetail, IResult } from "../../services";

interface IInitialState {
  reviewState: IResult[];
  detailsState: IMovieDetail;
  storeAllDetailsState: (detail: IMovieDetail, review: IResult[]) => Promise<void>;
}

interface IDetailProviderProps {
  // define props here
  children: JSX.Element;
}

const initialState: IInitialState = {
  reviewState: [],
  storeAllDetailsState: () => Promise.resolve(),
  detailsState: {},
};

export const DetailContext = createContext<IInitialState>(initialState);

export const DetailProvider = (props: React.PropsWithChildren<IDetailProviderProps>) => {
  const [state, setState] = useState(initialState);

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
    <DetailContext.Provider
      value={{
        detailsState: state.detailsState,
        reviewState: state.reviewState,
        storeAllDetailsState,
      }}>
      {props.children}
    </DetailContext.Provider>
  );
};
