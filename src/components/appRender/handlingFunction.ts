import { MovieType } from "../../screens";
import { MovieDetail, Review, accountState } from "src/services";
import { GetMovieWatchlist, getAccountState, getMovieDetailsAPI, getReviewById } from "../../services/APIservices";

export const fetchMovieDetails = async (id: number) => {
    const data: MovieDetail = await getMovieDetailsAPI(id);
    return data;
  };

  export const fetchReviewMovieDetails = async (id: number) => {
    const data: Review[] = await getReviewById(id);
    return data;
  };
  export const fetchAccountState = async (id: number) => {
    const data: accountState = await getAccountState(id);
    return data;
  };
  export const fetchWatchlist = async () => {
    const data: MovieType[] = await GetMovieWatchlist();
    return data;
  };
  