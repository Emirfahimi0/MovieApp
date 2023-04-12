import { getTrendingmovie } from "../services/api-services";
import { MovieComponent } from "../components/movie-component/MovieComponent";
import { SearchBarComponent } from "../components/movie-component/SearchBar";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MovieType } from ".";
import { Alert, ScrollView } from "react-native";
import { fetchAccountState, fetchMovieDetails, fetchReviewMovieDetails, fetchWatchlist } from "../components/features/handlingFunction";
import { IMovieDetail, IReview, IAccountState } from "../services";

const HomeScreen = ({ navigation }) => {
  // always use set function
  const [searchText, setSearchText] = useState<string>("");
  const { movieState, addTrendingMovies, genreState, storeIntoState } = useContext(GlobalContext);

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      const responseApiMovie: MovieType[] = await getTrendingmovie();
      addTrendingMovies(responseApiMovie);
    };

    //fetchGenre().catch(console.error);
    getMovies().catch(console.error);
  }, []);

  const handleMovieDetail = async (id: number) => {
    const resDetail: IMovieDetail = await fetchMovieDetails(id);
    const resReview: IReview[] = await fetchReviewMovieDetails(id);
    const resFetchState: IAccountState = await fetchAccountState(id);

    if (resDetail !== undefined && resReview !== undefined && resFetchState !== undefined) {
      await storeIntoState(resDetail, resReview, resFetchState);

      //From api service
      navigation.push("DetailScreen");
    } else {
      // alert {you dont have data }
      Alert.alert("getDetails undefined.");
    }
  };

  const handleWatchList = async () => {
    const resWatchlist = await fetchWatchlist();
    if (resWatchlist !== undefined) {
      navigation.navigate("WatchListScreen", { resWatchlist: resWatchlist });
    }
  };

  return (
    <Fragment>
      <SearchBarComponent searchText={searchText} setSearchText={setSearchText} />
      <ScrollView>
        <MovieComponent
          handleMovieDetail={handleMovieDetail}
          handleWatchList={handleWatchList}
          searchInput={searchText}
          navigation={navigation}
          Movie={movieState}
          Genres={genreState}
        />
      </ScrollView>
    </Fragment>
  );
};

export default HomeScreen;
