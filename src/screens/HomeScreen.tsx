import { getAccountDetails, getTrendingmovie } from "../services/api-services";
import { ScreenCardContainer } from "../components/movie-component/HomeScreenContainer";
import { HeaderComponent } from "../components/movie-component/HeaderComponent";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Genre, TMovieType } from ".";
import { fetchGenreItem, handleMovieDetail } from "../components/features/handleFunctions";
import Loader from "../components/features/Loader";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";
import { IResponseAccount } from "../services";
import { MovieContext } from "../context/movie-context/MovieContext";
import CustomDropDown from "../components/movie-component/CustomDropDown";

interface IHomeScreenProps extends NativeStackScreenProps<RootStackParamList, "HomeScreen"> {}

const HomeScreen = ({ navigation }: IHomeScreenProps) => {
  // always use set function
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { handleTrendingMovies, filteredMovieState, movieState } = useContext(MovieContext);
  const [genreState, setGenreState] = useState<Genre[]>([]);
  const [accountDetails, setAccountDetails] = useState<IResponseAccount>();

  const data: Array<{ label: string; value: string }> = [
    { label: "Trending", value: "Trending" },
    { label: "Get Latest", value: "latest" },
    { label: "Get Popular", value: "popular" },
  ];

  const handleRenderedGenre = async (): Promise<void> => {
    const responseGenre: Genre[] = await fetchGenreItem();
    // set state for in context provider for Genre [];
    if (responseGenre !== undefined) {
      setGenreState(responseGenre);
    }
  };

  const handleGetMovies = async (): Promise<void> => {
    setLoading(true);
    const responseApiMovie: TMovieType[] = await getTrendingmovie();
    const responseAccountDetails: IResponseAccount = await getAccountDetails();
    if (responseApiMovie !== undefined && responseAccountDetails !== undefined) {
      setAccountDetails(responseAccountDetails);
      setLoading(false);
      // set for trending movies with initial state
      const actionId = genreState.filter((item) => item.name === "Action");
      handleTrendingMovies(responseApiMovie, actionId[0]);
    } else Alert.alert("Cannot fetch data from api");
  };
  useEffect(() => {
    if (genreState.length === 0) {
      handleRenderedGenre();
    }
  }, []);

  useEffect(() => {
    if (genreState.length > 0) {
      handleGetMovies().catch(console.error);
    }
  }, [genreState]);

  const handleWatchList = async () => {
    const navigationGoBack = true;
    navigation.navigate("WatchlistScreen", { navGoBack: navigationGoBack });
  };

  return (
    <Fragment>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <HeaderComponent
            searchText={searchText}
            setSearchText={setSearchText}
            handleWatchList={handleWatchList}
            accountDetails={accountDetails}
          />
          <CustomDropDown movieType={data} />
          <ScreenCardContainer
            loading={loading}
            handleMovieDetail={handleMovieDetail}
            searchInput={searchText}
            Movie={filteredMovieState}
            Genres={genreState}
          />
        </>
      )}
    </Fragment>
  );
};

export default HomeScreen;
