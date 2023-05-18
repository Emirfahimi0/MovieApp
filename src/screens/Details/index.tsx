import { bottomCardContainer, setHeight } from "../../constants/style-component/viewComponent";
import { DetailContext } from "../../contextStore/detail-context/DetailContext";
import { handleMovieDetail } from "../../components/utils/handleFunctions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { normalText } from "../../constants/style-component/textComponent";
import { POSTER_BASE_URL } from "../../constants/utilities";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, ViewStyle, View, TextStyle, FlatList, TouchableOpacity, Text } from "react-native";
import { getAccountState, setWatchlist } from "../../services/api-services";
import { ToastMessage } from "../../components/toastMessage/ToastMessage";
import { WatchlistContext } from "../../contextStore/watchlist-context/WatchlistContext";
import FastImage from "react-native-fast-image";
import Loader from "../../components/loader/Loader";
import React, { useContext, useEffect, useState } from "react";
import { ItemSeparator } from "../../components";
import { color, Font } from "../../constants";
import { HeaderContainerDetails, ReviewContainerDetails, SubContainerDetail } from "./detail-component";

interface IDetailsMovieScreenProps extends NativeStackScreenProps<RootStackParamList, "DetailScreen"> {}

const DetailsMovieScreen = ({ navigation }: IDetailsMovieScreenProps) => {
  const { MovieDetailsState, reviewState, storeAllDetailsState } = useContext(DetailContext);
  const selectedMovie: IMovieDetail | undefined = MovieDetailsState;
  const { getWatchlistData } = useContext(WatchlistContext);
  const [ratingVal, setRatingVal] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [existWatchlist, setExistWatchlist] = useState<boolean>(true);
  const [postRatingDisable, setPostRatingDisable] = useState<boolean | { value: number } | undefined>(true);
  const [showMore, setShowmore] = useState<boolean>(true);

  let title = `${selectedMovie?.id}`;
  let message = "";
  // const ref = useRef()
  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchAccountState = async (id: number | undefined) => {
    const data: IAccountState = await getAccountState(id);
    return data;
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

  const StyleTextArea: ViewStyle = {
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
    color: color.AMBER,
  };
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          top: 0,
          height: 48,
          backgroundColor: !loading ? color.PRIMARY_COLOR : color.BASIC_BACKGROUND,
          width: "100%",
          position: "absolute",
          zIndex: 1,
        }}></View>
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
            {/* bottom container of details screen */}
            <ScrollView contentContainerStyle={{ minHeight: setHeight(2) }}>
              <ItemSeparator height={24} />
              <View style={{ ...bottomCardContainer, backgroundColor: color.ACTIVE }}>
                <SubContainerDetail
                  DetailTextHeader={DetailTextHeader}
                  overviewDetails={MovieDetailsState?.overview}
                  setShowMore={setShowmore}
                  showMore={showMore}
                  StyleTextArea={StyleTextArea}
                />
                <ReviewContainerDetails reviewDetails={reviewState} StyleTextArea={StyleTextArea} DetailTextHeader={DetailTextHeader} />
              </View>
            </ScrollView>
            <View style={{ backgroundColor: color.ACTIVE }}>
              <ItemSeparator height={24} />
            </View>

            {/* Recommendation sections */}
            <View style={{ paddingHorizontal: 24, bottom: "auto", backgroundColor: color.ACTIVE }}>
              <Text style={{ ...DetailTextHeader }}>Recommendations</Text>
              {selectedMovie?.recommendations.results.length !== 0 ? (
                <FlatList
                  data={selectedMovie?.recommendations.results}
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  ItemSeparatorComponent={() => <ItemSeparator width={20} />}
                  ListFooterComponent={() => <ItemSeparator width={20} />}
                  renderItem={({ item, index }) => {
                    const handleActive = () => {
                      handlePressRecommendations(item.id);
                    };

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
                          <FastImage
                            source={{ uri: `${POSTER_BASE_URL}original/${item.backdrop_path ? item.backdrop_path : item.poster_path}` }}
                            style={{ height: 80, width: 152, alignContent: "center", borderRadius: 10 }}
                            resizeMode="cover"
                          />
                          <Text
                            style={{ fontFamily: Font.BOLD, fontSize: 14, color: color.SECONDARY_COLOR, width: 120, textAlign: "center" }}
                            numberOfLines={2}>
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : (
                <Text style={{ ...normalText, color: color.SECONDARY_COLOR }}> no recommendations availables</Text>
              )}
            </View>
          </>
        ) : (
          <Loader />
        )}
      </ScrollView>
      <View
        style={{
          bottom: 0,
          height: 34,
          backgroundColor: loading ? color.BASIC_BACKGROUND : color.ACTIVE,
          width: "100%",
          position: "absolute",
          zIndex: 1,
        }}></View>
    </SafeAreaView>
  );
};

export default DetailsMovieScreen;
