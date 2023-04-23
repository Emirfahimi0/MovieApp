import { DetailContext } from "../context/detail-context/DetailContext";
import { fetchAccountState } from "../components/features/handleFunctions";
import { HeaderContainerDetails } from "../components/detail-component/HeaderContainerDetails";
import { IAccountState, IMovieDetail } from "../services";
import { POSTER_BASE_URL } from "../constants/utilities";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";
import { ScrollView, ViewStyle, View } from "react-native";
import { SubContainerDetail } from "../components/detail-component/OverviewContainerDetail";
import Loader from "../components/features/Loader";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReviewContainerDetails from "../components/detail-component/ReviewContainerDetails";
import { homeCardContainer, setHeight } from "../constants/style-component/viewComponent";
import ProviderCardList from "../components/detail-component/ProviderCardList";
import color from "../constants/Color";
import { WatchlistContext } from "../context/watchlist-context/WatchlistContext";

interface IDetailsMovieScreenProps extends NativeStackScreenProps<RootStackParamList, "DetailScreen"> {}

const DetailsMovieScreen = ({ navigation }: IDetailsMovieScreenProps) => {
  const { MovieDetailsState, reviewState } = useContext(DetailContext);
  const selectedMovie: IMovieDetail | undefined = MovieDetailsState;
  const [accountState, setAccountState] = useState<IAccountState>();
  const [ratingVal, setRatingVal] = useState<number>(0);
  const [postRatingDisable, setPostRatingDisable] = useState<boolean | { value: number } | undefined>();
  const { watchlistState } = useContext(WatchlistContext);

  // const ref = useRef()
  const handleGoBack = () => {
    navigation.goBack();
  };
  // console.log(`${POSTER_BASE_URL}w300/${item.logo_path}`)
  //console.log(`${POSTER_BASE_URL}w300/${MovieDetailsState["watch/providers"].results.AT.buy[0].logo_path}`);
  const getUpdatedAccState = async (): Promise<void> => {
    const resFetchState: IAccountState = await fetchAccountState(MovieDetailsState?.id);

    try {
      if (resFetchState !== undefined) {
        setAccountState(resFetchState);
        if (typeof accountState?.rated === "object") {
          setRatingVal(accountState?.rated.value);
          setPostRatingDisable(true);
        } else if (resFetchState?.rated === false) {
          let stateRating: boolean | { value: number } = resFetchState?.rated;
          setPostRatingDisable(stateRating);
          setRatingVal(0);
        } else {
          setAccountState(resFetchState);
          console.log("something satisfied here");
        }
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    getUpdatedAccState();
    //handleRenderTrailer();
  }, [watchlistState]);

  return (
    <View style={{ flex: 1 }}>
      {accountState !== undefined ? (
        <>
          <HeaderContainerDetails
            selectedMovie={selectedMovie}
            getUpdatedAccState={getUpdatedAccState}
            onPress={handleGoBack}
            postRatingDisable={postRatingDisable}
            state={accountState}
            setRating={setRatingVal}
            setPostRatingDisable={setPostRatingDisable}
            ratingVal={ratingVal}
          />
          {/* <ProviderCardList selectedProviderMovie={selectedMovie?.["watch/providers"]} /> */}
          <ScrollView contentContainerStyle={{}}>
            <View style={homeCardContainer}>
              <SubContainerDetail overviewDetails={MovieDetailsState?.overview} overViewStyle={overViewTextArea} />
              <ReviewContainerDetails reviewDetails={reviewState} overViewStyle={overViewTextArea} />
            </View>
          </ScrollView>
        </>
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default DetailsMovieScreen;

const overViewTextArea: ViewStyle = {
  backgroundColor: color.AMBER,
  borderRadius: 24,
  padding: 10,
};
