import { getTrendingmovie } from "../services/api-services";
import { MovieComponent } from "../components/movie-component/MovieComponent";
import { SearchBarComponent } from "../components/movie-component/SearchBar";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MovieType } from ".";
import { Alert } from "react-native";
import { fetchMovieDetails, fetchReviewMovieDetails, fetchWatchlist } from "../components/features/handlingFunction";
import { IMovieDetail, IReview } from "../services";
import Loader from "../components/features/Loader";

const HomeScreen = ({ navigation }) => {
  // always use set function
  const [searchText, setSearchText] = useState<string>("");
  const { handleTrendingMovies, genreState, storeAllState, filteredMovieState, movieState } = useContext(GlobalContext);

  useEffect(() => {
    const handlegetMovies = async (): Promise<void> => {
      const responseApiMovie: MovieType[] = await getTrendingmovie();
      const actionId = genreState.filter((item) => item.name === "Action");
      handleTrendingMovies(responseApiMovie, actionId[0], 0);
    };

    handlegetMovies().catch(console.error);
  }, []);

  const handleMovieDetail = async (id: number) => {
    const resDetail: IMovieDetail = await fetchMovieDetails(id);
    const resReview: IReview[] = await fetchReviewMovieDetails(id);

    if (resDetail !== undefined && resReview !== undefined) {
      await storeAllState(resDetail, resReview);

      //From api service
      navigation.push("DetailScreen", { item: resDetail, review: resReview });
    } else {
      // alert {you dont have data }
      Alert.alert("getDetails undefined.");
    }
  };

  const handleWatchList = async () => {
    // const { reviewState, detailsState } = useContext(GlobalContext);
    const resWatchlist = await fetchWatchlist();
    console.log("review State");
    if (resWatchlist !== undefined) {
      navigation.navigate("WatchlistScreen", { resWatchlist: resWatchlist });
    }
  };

  return (
    <Fragment>
      <SearchBarComponent searchText={searchText} setSearchText={setSearchText} />
      {movieState.length < 0 && movieState !== undefined ? (
        <Loader />
      ) : (
        <MovieComponent
          handleMovieDetail={handleMovieDetail}
          handleWatchList={handleWatchList}
          searchInput={searchText}
          navigation={navigation}
          Movie={filteredMovieState}
          Genres={genreState}
        />
      )}
    </Fragment>
  );
};

export default HomeScreen;
