import { HeaderContainerDetails } from "../components/detail-component/HeaderContainerDetails";
import { ScrollView, ViewStyle, Dimensions } from "react-native";
import { SubContainerDetail } from "../components/detail-component/SubContainerDetail";
import React, { useContext, useEffect, useState } from "react";
import Color from "../constants/color";
import ReviewContainerDetails from "../components/detail-component/ReviewContainerDetails";
import { GlobalContext } from "../context/GlobalState";
import { IAccountState } from "../services";
import { fetchAccountState } from "../components/features/handlingFunction";
import Loader from "../components/features/Loader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";

interface IDetailsMovieScreenProps extends NativeStackScreenProps<RootStackParamList, "DetailScreen"> {}

const DetailsMovieScreen = ({ navigation }: IDetailsMovieScreenProps) => {
  const { detailsState, reviewState } = useContext(GlobalContext);
  const [checkingState, setCheckingState] = useState<IAccountState>();
  const [ratingVal, setRatingVal] = useState<number>(0);
  const { height } = Dimensions.get("screen");
  const handleGoBack = () => {
    navigation.goBack();
  };
  const overViewTextArea: ViewStyle = {
    backgroundColor: Color.TRANSPARENT,
    borderRadius: 24,
    padding: 10,
  };
  const getUpdatedAccState = async (): Promise<void> => {
    try {
      const resFetchState: IAccountState = await fetchAccountState(detailsState.id);
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
  }, [checkingState?.rated]);

  return (
    <ScrollView contentContainerStyle={{ minHeight: height, backgroundColor: Color.BLACK }}>
      {checkingState?.watchlist !== undefined || checkingState?.rated !== undefined ? (
        <HeaderContainerDetails
          movie={detailsState}
          onPress={handleGoBack}
          state={checkingState}
          setRating={setRatingVal}
          ratingVal={ratingVal}
        />
      ) : (
        <Loader />
      )}
      <SubContainerDetail overview={detailsState.overview} overViewStyle={overViewTextArea} />
      <ReviewContainerDetails review={reviewState} overViewStyle={overViewTextArea} />
    </ScrollView>
  );
};

export default DetailsMovieScreen;
