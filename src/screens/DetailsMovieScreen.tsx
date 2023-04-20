import { DetailContext } from "../context/detail-context/DetailContext";
import { fetchAccountState } from "../components/features/handleFunctions";
import { HeaderContainerDetails } from "../components/detail-component/HeaderContainerDetails";
import { IAccountState } from "../services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";
import { ScrollView, ViewStyle, View } from "react-native";
import { SubContainerDetail } from "../components/detail-component/OverviewContainerDetail";
import Color from "../constants/color";
import Loader from "../components/features/Loader";
import React, { useContext, useEffect, useState } from "react";
import ReviewContainerDetails from "../components/detail-component/ReviewContainerDetails";
import { homeCardContainer, setHeight, setWidth } from "../constants/style-component/viewComponent";
import { ListCardButtons } from "../components/movie-component/CardButton";
import { GlobalContext } from "../context/GlobalState";
import YoutubeIframe from "react-native-youtube-iframe";

interface IDetailsMovieScreenProps extends NativeStackScreenProps<RootStackParamList, "DetailScreen"> {}

const DetailsMovieScreen = ({ navigation }: IDetailsMovieScreenProps) => {
  const { MovieDetailsState, reviewState } = useContext(DetailContext);
  const { genreState } = useContext(GlobalContext);
  const [checkingState, setCheckingState] = useState<IAccountState>();
  const [ratingVal, setRatingVal] = useState<number>(0);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getUpdatedAccState = async (): Promise<void> => {
    try {
      const resFetchState: IAccountState = await fetchAccountState(MovieDetailsState.id);
      setCheckingState(resFetchState);
      if (typeof checkingState?.rated === "object") {
        setRatingVal(checkingState.rated.value);
      } else {
        setRatingVal(0);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    getUpdatedAccState();
    //handleRenderTrailer();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ minHeight: setHeight(20) }}>
      {checkingState?.watchlist !== undefined ? (
        <>
          <HeaderContainerDetails
            movie={MovieDetailsState}
            onPress={handleGoBack}
            state={checkingState}
            setRating={setRatingVal}
            ratingVal={ratingVal}
          />
          <ListCardButtons Genre={genreState} />
          <View style={homeCardContainer}>
            <SubContainerDetail overviewDetails={MovieDetailsState.overview} overViewStyle={overViewTextArea} />
            <ReviewContainerDetails reviewDetails={reviewState} overViewStyle={overViewTextArea} />
          </View>
        </>
      ) : (
        <Loader />
      )}
    </ScrollView>
  );
};

export default DetailsMovieScreen;
const overViewTextArea: ViewStyle = {
  backgroundColor: Color.AMBER,
  borderRadius: 24,
  padding: 10,
};
