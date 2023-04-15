import { getTrendingmovie } from "../services/api-services";
import { MovieComponent } from "../components/movie-component/MovieComponent";
import { SearchBarComponent } from "../components/movie-component/SearchBar";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MovieType } from ".";
import { fetchWatchlist, handleMovieDetail } from "../components/features/handleFunctions";
import Loader from "../components/features/Loader";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";

interface IHomeScreenProps extends NativeStackScreenProps<RootStackParamList, "HomeScreen"> {}

const HomeScreen = ({ navigation }: IHomeScreenProps) => {
  // always use set function
  const [searchText, setSearchText] = useState<string>("");
  const { handleTrendingMovies, genreState, filteredMovieState, movieState } = useContext(GlobalContext);
  const handleGetMovies = async (): Promise<void> => {
    const responseApiMovie: MovieType[] = await getTrendingmovie();
    if (responseApiMovie) {
      const actionId = genreState.filter((item) => item.name === "Action");
      handleTrendingMovies(responseApiMovie, actionId[0], 0);
    } else Alert.alert("Cannot fetch data from api");
  };
  useEffect(() => {
    handleGetMovies().catch(console.error);
  }, []);

  const handleWatchList = async () => {
    // const { reviewState, detailsState } = useContext(GlobalContext);
    const resWatchlist = await fetchWatchlist();
    if (resWatchlist !== undefined) {
      navigation.navigate("WatchlistScreen", { resWatchlist: resWatchlist });
    }
  };

  return (
    <Fragment>
      <SearchBarComponent searchText={searchText} setSearchText={setSearchText} />
      {movieState.length < 0 && movieState === undefined ? (
        <Loader />
      ) : (
        <MovieComponent
          handleMovieDetail={handleMovieDetail}
          handleWatchList={handleWatchList}
          searchInput={searchText}
          Movie={filteredMovieState}
          Genres={genreState}
        />
      )}
    </Fragment>
  );
};

export default HomeScreen;
