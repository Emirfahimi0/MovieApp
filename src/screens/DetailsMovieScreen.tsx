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

// interface IDetailsMovieScreenProps extends NativeStackScreenProps<RootStackParamList, "DetailScreen"> {}

const DetailsMovieScreen = ({ navigation }) => {
  const { detailsState, reviewState } = useContext(GlobalContext);
  const [checkingState, setCheckingState] = useState<IAccountState>();
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
      console.log(resFetchState);
      setCheckingState(resFetchState);
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    getUpdatedAccState();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ minHeight: height, backgroundColor: Color.BLACK }}>
      {checkingState?.watchlist !== undefined || checkingState?.rated !== undefined ? (
        <HeaderContainerDetails movie={detailsState} onPress={handleGoBack} state={checkingState} />
      ) : (
        <Loader />
      )}
      <SubContainerDetail overview={detailsState.overview} overViewStyle={overViewTextArea} />
      <ReviewContainerDetails review={reviewState} overViewStyle={overViewTextArea} />
    </ScrollView>
  );
};

export default DetailsMovieScreen;
