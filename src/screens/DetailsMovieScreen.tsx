import { DetailContext } from "../context/detail-context/DetailContext";
import { fetchAccountState } from "../components/features/handleFunctions";
import { HeaderContainerDetails } from "../components/detail-component/HeaderContainerDetails";
import { homeCardContainer, setHeight } from "../constants/style-component/viewComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, ViewStyle, View, TextStyle } from "react-native";
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

interface IDetailsMovieScreenProps extends NativeStackScreenProps<RootStackParamList, "DetailScreen"> {}

const DetailsMovieScreen = ({ navigation }: IDetailsMovieScreenProps) => {
  const { MovieDetailsState, reviewState } = useContext(DetailContext);
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
    <SafeAreaView style={{ height: "100%" }}>
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
