import { DetailContext } from "../../contextStore/detail-context/DetailContext";
import { fetchGenreItem, handleShowDetailScreen } from "../../components/utils";
import { getAccountDetails, getMovieType, getTrendingmovie } from "../../services/api-services";
import { MovieContext } from "../../contextStore/movie-context/MovieContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Animated, ScrollView } from "react-native";
import { ToastMessage } from "../../components/toastMessage";
import Loader from "../../components/loader/Loader";
import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { HeaderComponent } from "./HeaderComponent";
import { BottomScreenCardContainer } from "./HomeScreenContainer";
import { CustomDropDown, ItemSeparator } from "../../components";
import { setHeight } from "../../constants";

interface IHomeScreenProps extends NativeStackScreenProps<RootStackParamList, "HomeScreen"> {}

const HomeScreen = ({ navigation }: IHomeScreenProps) => {
  // always use set function
  const [accountDetails, setAccountDetails] = useState<IResponseAccount>();
  const [genreState, setGenreState] = useState<TGenre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
    setSearchText("");
  };

  const handleFetchAccountDetails = async () => {
    const responseAccountDetails: IResponseAccount = await getAccountDetails();
    if (responseAccountDetails !== undefined) {
      setAccountDetails(responseAccountDetails);
    }
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const handleFetchMovies = async (): Promise<void> => {
    setLoading(true);
    fadeIn();

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
    handleFetchAccountDetails();
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
      <ScrollView bounces={false} contentContainerStyle={{ minHeight: "100%" }} style={{}}>
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
            <ItemSeparator height={setHeight(4)} />
            <BottomScreenCardContainer
              fadeAnim={fadeAnim}
              Genres={genreState}
              storeAllDetailsState={storeAllDetailsState}
              handleShowDetailScreen={handleShowDetailScreen}
              handlePressGenre={handlePressGenre}
              loading={loading}
              setLoading={setLoading}
              Movies={searchText !== "" ? movieState : filteredMovieState}
              // Movies={searchText !== "" ? movieState : filteredMovieState}
              searchInput={searchText}
            />
          </>
        )}
      </ScrollView>
    </Fragment>
  );
};

export default HomeScreen;
