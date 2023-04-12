import { MovieType } from "../../screens";
import { IMovieDetail, IReview, IaccountState } from "src/services";
import { GetMovieWatchlist, getAccountState, getMovieDetailsAPI, getReviewById } from "../../services/api-services";

export const fetchMovieDetails = async (id: number) => {
    const data: IMovieDetail = await getMovieDetailsAPI(id);
    return data;
  };

  export const fetchReviewMovieDetails = async (id: number) => {
    const data: IReview[] = await getReviewById(id);
    return data;
  };
  export const fetchAccountState = async (id: number) => {
    const data: IaccountState = await getAccountState(id);
    return data;
  };
  export const fetchWatchlist = async () => {
    const data: MovieType[] = await GetMovieWatchlist();
    return data;
  };
  