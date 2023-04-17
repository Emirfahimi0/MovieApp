import { getAccountDetails, getTrendingmovie } from "../services/api-services";
import { HomeScreenContainer } from "../components/movie-component/HomeScreenContainer";
import { HeaderComponent } from "../components/movie-component/HeaderComponent";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MovieType } from ".";
import { fetchWatchlist, handleMovieDetail } from "../components/features/handleFunctions";
import Loader from "../components/features/Loader";
import { Alert, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";
import { IResponseAccount } from "src/services";

interface IHomeScreenProps extends NativeStackScreenProps<RootStackParamList, "HomeScreen"> {}

const HomeScreen = ({ navigation }: IHomeScreenProps) => {
  // always use set function
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const { handleTrendingMovies, genreState, filteredMovieState } = useContext(GlobalContext);
  const [accountDetails, setAccountDetails] = useState<IResponseAccount | undefined>();
  const handleGetMovies = async (): Promise<void> => {
    setLoading(false);
    const responseApiMovie: MovieType[] = await getTrendingmovie();
    const responseAccountDetails: IResponseAccount = await getAccountDetails();
    if (responseApiMovie && responseAccountDetails) {
      setAccountDetails(responseAccountDetails);
      // set for trending movies with initial state
      const actionId = genreState.filter((item) => item.name === "Action");
      handleTrendingMovies(responseApiMovie, actionId[0], 0);
      setLoading(true);
    } else Alert.alert("Cannot fetch data from api");
  };
  useEffect(() => {
    handleGetMovies().catch(console.error);
  }, []);

  const handleWatchList = async () => {
    console.log("lets go to watchlist screen");
    // const { reviewState, detailsState } = useContext(GlobalContext);
    const resWatchlist = await fetchWatchlist();
    if (resWatchlist !== undefined) {
      const navigationGoBack = true;
      navigation.navigate("WatchlistScreen", { resWatchlist: resWatchlist, accountDetails: accountDetails, navGoBack: navigationGoBack });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <>
          <HeaderComponent
            searchText={searchText}
            setSearchText={setSearchText}
            handleWatchList={handleWatchList}
            accountDetails={accountDetails}
          />
          <View style={{ paddingBottom: 30 }}></View>
          <HomeScreenContainer
            handleMovieDetail={handleMovieDetail}
            searchInput={searchText}
            Movie={filteredMovieState}
            Genres={genreState}
          />
        </>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default HomeScreen;
