import { getAccountDetails, getMovieType, getTrendingmovie } from "../services/api-services";
import { ScreenCardContainer } from "../components/movie-component/HomeScreenContainer";
import { HeaderComponent } from "../components/movie-component/HeaderComponent";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { fetchGenreItem, handleMovieDetail } from "../components/features/handleFunctions";
import Loader from "../components/features/Loader";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MovieContext } from "../context/movie-context/MovieContext";
import CustomDropDown from "../components/movie-component/CustomDropDown";

interface IHomeScreenProps extends NativeStackScreenProps<RootStackParamList, "HomeScreen"> {}

const HomeScreen = ({ navigation }: IHomeScreenProps) => {
  // always use set function
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const { handleMovies, filteredMovieState } = useContext(MovieContext);
  const [genreState, setGenreState] = useState<TGenre[]>([]);
  const [accountDetails, setAccountDetails] = useState<IResponseAccount>();
  const [selectedMovieType, setSelectedMovieType] = useState<string>("");
  const { filterMovieByGenre } = useContext(MovieContext);
  const actionId = genreState.filter((item) => item.name === "Action");

  const data: Array<{ label: string; value: string }> = [
    { label: " Top Rated", value: "top_rated" },
    { label: " Upcoming", value: "upcoming" },
    { label: " Popular", value: "popular" },
  ];

  const handleFetchGenre = async (): Promise<void> => {
    const responseGenre: TGenre[] = await fetchGenreItem();
    // set state for in context provider for Genre [];
    if (responseGenre !== undefined) {
      setGenreState(responseGenre);
    }
  };

  const handlePressGenre = async (genre: TGenre, index: number) => {
    filterMovieByGenre(genre, index);
    console.log("is press?");
  };

  const handleFetchMovies = async (): Promise<void> => {
    setLoading(true);
    const responseApiMovie: TMovieType[] = selectedMovieType === "" ? await getTrendingmovie() : await getMovieType(selectedMovieType);
    console.log(responseApiMovie);
    const responseAccountDetails: IResponseAccount = await getAccountDetails();
    if (responseApiMovie !== undefined && responseAccountDetails !== undefined) {
      setAccountDetails(responseAccountDetails);
      // set for trending movies with initial state
      handleMovies(responseApiMovie, actionId[0]);
      setLoading(false);
    } else {
      Alert.alert("Cannot fetch data from api");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (genreState.length === 0) {
      handleFetchGenre();
    }
  }, []);

  useEffect(() => {
    if (genreState.length > 0 || selectedMovieType !== "") {
      handleFetchMovies().catch(console.error);
    }
  }, [genreState, selectedMovieType]);

  const handleWatchList = async () => {
    const navigationGoBack = true;
    navigation.navigate("WatchlistScreen", { navGoBack: navigationGoBack });
  };

  return (
    <Fragment>
      {loading || filteredMovieState.length < 0 ? (
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
          <CustomDropDown movieType={data} setSelectedMovieType={setSelectedMovieType} />
          <ScreenCardContainer
            Genres={genreState}
            handleMovieDetail={handleMovieDetail}
            handlePressGenre={handlePressGenre}
            loading={loading}
            Movie={filteredMovieState}
            searchInput={searchText}
          />
        </>
      )}
    </Fragment>
  );
};

export default HomeScreen;
