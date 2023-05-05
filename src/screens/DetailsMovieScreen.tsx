import { DetailContext } from "../context/detail-context/DetailContext";
import { fetchAccountState } from "../components/features/handleFunctions";
import { HeaderContainerDetails } from "../components/detail-component/HeaderContainerDetails";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, ViewStyle, View } from "react-native";
import { SubContainerDetail } from "../components/detail-component/OverviewContainerDetail";
import Loader from "../components/features/Loader";
import React, { useContext, useEffect, useState } from "react";
import ReviewContainerDetails from "../components/detail-component/ReviewContainerDetails";
import { homeCardContainer, setHeight } from "../constants/style-component/viewComponent";
import color from "../constants/Color";

interface IDetailsMovieScreenProps extends NativeStackScreenProps<RootStackParamList, "DetailScreen"> {}

const DetailsMovieScreen = ({ navigation }: IDetailsMovieScreenProps) => {
  const { MovieDetailsState, reviewState } = useContext(DetailContext);
  const selectedMovie: IMovieDetail | undefined = MovieDetailsState;
  const [accountState, setAccountState] = useState<IAccountState>();
  const [ratingVal, setRatingVal] = useState<number>(5);
  const [postRatingDisable, setPostRatingDisable] = useState<boolean | { value: number } | undefined>();

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
  }, []);

  const overViewTextArea: ViewStyle = {
    backgroundColor: color.AMBER,
    borderRadius: 24,
    flexDirection: "column",
    padding: 12,
  };

  return (
    <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true} bounces={false}>
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

          <ScrollView contentContainerStyle={{ minHeight: setHeight(2) }} nestedScrollEnabled={true}>
            <View style={homeCardContainer}>
              <SubContainerDetail overviewDetails={MovieDetailsState?.overview} overViewStyle={overViewTextArea} />
              <ReviewContainerDetails reviewDetails={reviewState} overViewStyle={overViewTextArea} />
            </View>
          </ScrollView>
        </>
      ) : (
        <Loader />
      )}
    </ScrollView>
  );
};

export default DetailsMovieScreen;
