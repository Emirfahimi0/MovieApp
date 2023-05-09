import { DetailContext } from "../context/detail-context/DetailContext";
import { fetchAccountState, handleMovieDetail } from "../components/features/handleFunctions";
import { HeaderContainerDetails } from "../components/detail-component/HeaderContainerDetails";
import { homeCardContainer, setHeight } from "../constants/style-component/viewComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, ViewStyle, View, TextStyle, FlatList, TouchableOpacity, Text, ImageBackground } from "react-native";
import { setWatchlist } from "../services/api-services";
import { SubContainerDetail } from "../components/detail-component/OverviewContainerDetail";
import { WatchlistContext } from "../context/watchlist-context/WatchlistContext";
import color from "../constants/Color";
import Font from "../constants/Font";
import Loader from "../components/features/Loader";
import React, { useContext, useEffect, useState } from "react";
import ReviewContainerDetails from "../components/detail-component/ReviewContainerDetails";
import { ToastMessage } from "../components/features/ToastMessage";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemSeparator } from "../components/movie-component/ItemSeparator";
import { normalText } from "../constants/style-component/textComponent";
import { POSTER_BASE_URL } from "../constants/utilities";

interface IDetailsMovieScreenProps extends NativeStackScreenProps<RootStackParamList, "DetailScreen"> {}

const DetailsMovieScreen = ({ navigation, route }: IDetailsMovieScreenProps) => {
  const { MovieDetailsState, reviewState, storeAllDetailsState } = useContext(DetailContext);
  console.log(route.params.item);
  const selectedMovie: IMovieDetail | undefined = MovieDetailsState;
  const { getWatchlistData } = useContext(WatchlistContext);
  const [ratingVal, setRatingVal] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [existWatchlist, setExistWatchlist] = useState<boolean>(true);
  const [postRatingDisable, setPostRatingDisable] = useState<boolean | { value: number } | undefined>(true);
  let title = `${selectedMovie?.id}`;
  let message = "";
  // const ref = useRef()
  const handleGoBack = () => {
    navigation.goBack();
  };

  const getUpdatedAccState = async (): Promise<void> => {
    const resFetchState: IAccountState = await fetchAccountState(MovieDetailsState?.id);
    try {
      if (resFetchState !== undefined) {
        setExistWatchlist(resFetchState.watchlist);
        if (typeof resFetchState.rated === "object") {
          setRatingVal(resFetchState.rated.value);
          setPostRatingDisable(true);
        } else if (resFetchState.rated === false) {
          let stateRating: boolean | { value: number } = resFetchState.rated;
          setPostRatingDisable(stateRating);
          setRatingVal(0);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };
  const handleWatchList = async () => {
    // Get the data first and complementary based on what user click
    const data: IWatchListResponse = await setWatchlist(selectedMovie, !existWatchlist);
    // if response of the data return success.
    const responseSuccess = data.success ? "success" : "error";
    if (data.success) {
      setExistWatchlist(!existWatchlist);
      if (existWatchlist) {
        getWatchlistData();
        message = `${selectedMovie?.title} is removed from watchlist`;
      } else {
        message = `${selectedMovie?.title} Item added to watchlist😎`;
      }

      ToastMessage(responseSuccess, title, message);
    } else {
      if (existWatchlist) {
        message = `Unable to add ${selectedMovie?.title} in the watchlist.${data.status_message}`;
      } else {
        message = `unable to add ${selectedMovie?.title} in the watchlist.${data.status_message}`;
      }
      ToastMessage(responseSuccess, "error", message);
    }
  };

  const handlePressRecommendations = async (id: number) => {
    setLoading(true);
    const selectedMovie = await handleMovieDetail(id);
    if (selectedMovie !== undefined) {
      storeAllDetailsState(selectedMovie.detail, selectedMovie.review);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUpdatedAccState();
  }, []);

  const overViewTextArea: ViewStyle = {
    backgroundColor: color.AMBER,
    borderRadius: 24,
    flexDirection: "column",
    padding: 12,
    width: "auto",
    height: "auto",
  };
  const DetailTextHeader: TextStyle = {
    fontFamily: Font.REGULAR,
    fontSize: 16,
    marginLeft: 12,
    color: color.AMBER,
  };
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: color.SECONDARY_COLOR }}>
      <ScrollView nestedScrollEnabled={true} bounces={false}>
        {!loading ? (
          <>
            <HeaderContainerDetails
              selectedMovie={selectedMovie}
              onPress={handleGoBack}
              existWatchlist={existWatchlist}
              handleWatchlist={handleWatchList}
              postRatingDisable={postRatingDisable}
              setRating={setRatingVal}
              setPostRatingDisable={setPostRatingDisable}
              ratingVal={ratingVal}
            />
            <View style={{ padding: 24, top: 4 }}>
              <Text style={{ ...normalText, fontSize: 16 }}>Recommendations</Text>
              <FlatList
                data={selectedMovie?.recommendations.results}
                horizontal
                showsHorizontalScrollIndicator={true}
                ItemSeparatorComponent={() => <ItemSeparator width={20} />}
                ListFooterComponent={() => <ItemSeparator width={20} />}
                renderItem={({ item, index }) => {
                  const handleActive = () => {
                    // setActive(index);
                    // handlePress(item, index);
                    handlePressRecommendations(item.id);
                    console.log(item.id);
                  };
                  // const selectedButton: ViewStyle =
                  //   active === index ? { backgroundColor: color.ACTIVE } : { backgroundColor: color.BASIC_BACKGROUND };
                  // const selectedText: TextStyle = active === index ? { color: color.SECONDARY_COLOR, fontWeight: "800" } : { color: color.BLACK };

                  return (
                    <TouchableOpacity onPress={handleActive} key={index}>
                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "column",
                          borderRadius: 5,
                          justifyContent: "space-between",
                          padding: 8,
                          width: "auto",
                        }}>
                        <ImageBackground
                          source={{ uri: `${POSTER_BASE_URL}original/${item.poster_path}` }}
                          style={{ height: 80, width: 120, alignContent: "center" }}
                          imageStyle={{ borderRadius: 10, width: 120 }}></ImageBackground>
                        <Text style={{ fontFamily: Font.BOLD, fontSize: 14, color: color.ACTIVE, width: 120 }} numberOfLines={2}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <ScrollView contentContainerStyle={{ minHeight: setHeight(2) }} nestedScrollEnabled={true}>
              <View style={{ ...homeCardContainer }}>
                <SubContainerDetail
                  overviewDetails={MovieDetailsState?.overview}
                  overViewStyle={overViewTextArea}
                  DetailTextHeader={DetailTextHeader}
                />
                <ReviewContainerDetails reviewDetails={reviewState} overViewStyle={overViewTextArea} DetailTextHeader={DetailTextHeader} />
              </View>
            </ScrollView>
          </>
        ) : (
          <Loader />
        )}
      </ScrollView>
      <View
        style={{
          bottom: 0,
          height: 34,
          backgroundColor: color.SECONDARY_COLOR,
          width: "100%",
          position: "absolute",
          zIndex: 1,
        }}></View>
    </SafeAreaView>
  );
};

export default DetailsMovieScreen;
