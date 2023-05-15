import { getAccountDetails, getMovieType, getTrendingmovie } from "../services/api-services";
import { BottomScreenCardContainer } from "../components/movie-component/HomeScreenContainer";
import { HeaderComponent } from "../components/movie-component/HeaderComponent";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { fetchGenreItem, handleShowDetailScreen } from "../components/features/handleFunctions";
import Loader from "../components/features/Loader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MovieContext } from "../context/movie-context/MovieContext";
import CustomDropDown from "../components/movie-component/CustomDropDown";
import { ToastMessage } from "../components/features/ToastMessage";
import { DetailContext } from "../context/detail-context/DetailContext";
import { SafeAreaView, ScrollView, View } from "react-native";
import { ItemSeparator } from "../components/movie-component/ItemSeparator";
import { setHeight } from "src/constants/style-component/viewComponent";

interface IHomeScreenProps extends NativeStackScreenProps<RootStackParamList, "HomeScreen"> {}

const HomeScreen = ({ navigation }: IHomeScreenProps) => {
  // always use set function
  const [accountDetails, setAccountDetails] = useState<IResponseAccount>();
  const [genreState, setGenreState] = useState<TGenre[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedMovieType, setSelectedMovieType] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const { storeAllDetailsState } = useContext(DetailContext);
  const { handleMovies, filteredMovieState, movieState, filterMovieByGenre } = useContext(MovieContext);
  const actionId = genreState.filter((item) => item.name === "Action");

  const data: Array<{ label: string; value: string }> = [
    { label: "Trending Movies", value: "Trending" },
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
  };

  const handleFetchAccountDetails = async () => {
    const responseAccountDetails: IResponseAccount = await getAccountDetails();
    if (responseAccountDetails !== undefined) {
      setAccountDetails(responseAccountDetails);
    }
  };

  const handleFetchMovies = async (): Promise<void> => {
    setLoading(true);
    const responseApiMovie: TMovieType[] =
      selectedMovieType === "" || selectedMovieType === "Trending" ? await getTrendingmovie() : await getMovieType(selectedMovieType);
    if (responseApiMovie !== undefined) {
      //reset the search components
      setSearchText("");
      // set for trending movies with initial state
      handleMovies(responseApiMovie, actionId[0]);
      setLoading(false);
    } else {
      //Toast Message
      ToastMessage("error", "Error", "Cannot fetch data from api");
    }
  };

  useEffect(() => {
    if (genreState.length === 0) {
      handleFetchGenre();
    }
  }, []);

  useEffect(() => {
    handleFetchAccountDetails();
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
      <ScrollView bounces={false}>
        <HeaderComponent
          searchText={searchText}
          setSearchText={setSearchText}
          handleWatchList={handleWatchList}
          accountDetails={accountDetails}
        />

        {loading || filteredMovieState.length < 0 ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <CustomDropDown movieType={data} setSelectedMovieType={setSelectedMovieType} value={value} setValue={setValue} />
            <ItemSeparator height={24} />
            <BottomScreenCardContainer
              Genres={genreState}
              storeAllDetailsState={storeAllDetailsState}
              handleShowDetailScreen={handleShowDetailScreen}
              handlePressGenre={handlePressGenre}
              loading={loading}
              setLoading={setLoading}
              Movies={searchText !== "" ? movieState : filteredMovieState}
              searchInput={searchText}
            />
          </>
        )}
      </ScrollView>
    </Fragment>
  );
};

export default HomeScreen;
