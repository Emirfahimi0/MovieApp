import { HeaderContainerDetails } from "../components/detail-component/HeaderContainerDetails";
import { ScrollView, ViewStyle, Dimensions } from "react-native";
import { SubContainerDetail } from "../components/detail-component/SubContainerDetail";
import React, { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";
import Color from "../constants/color";
import ReviewContainerDetails from "../components/detail-component/ReviewContainerDetails";
import { GlobalContext } from "../context/GlobalState";

interface IDetailsMovieScreenProps extends NativeStackScreenProps<RootStackParamList, "DetailScreen"> {
  // other props ...
}

const DetailsMovieScreen = ({ navigation }: IDetailsMovieScreenProps) => {
  const { detailsState, accountState, reviewState } = useContext(GlobalContext);
  const [checkingState, setCheckingState] = useState(accountState);
  const { height } = Dimensions.get("screen");

  const handleGoBack = () => {
    navigation.goBack();
  };
  const overViewTextArea: ViewStyle = {
    backgroundColor: Color.TRANSPARENT,
    borderRadius: 24,
    padding: 10,
  };

  useEffect(() => {}, [accountState]);

  return (
    <ScrollView contentContainerStyle={{ minHeight: height, backgroundColor: Color.BLACK }}>
      <HeaderContainerDetails movie={detailsState} onPress={handleGoBack} state={accountState} />
      <SubContainerDetail overview={detailsState.overview} overViewStyle={overViewTextArea} />
      <ReviewContainerDetails review={reviewState} overViewStyle={overViewTextArea} />
    </ScrollView>
  );
};

export default DetailsMovieScreen;

// const [checkButton, setCheckButton] = useState<boolean>();
// const [getMovie, setGetMovie] = useState<MovieType>();
// let [isSuccess, setIsSuccess] = useState<boolean>();

// // return  stored movie   To do condition
// //let StoredMovie = WatchList.find((object) => object.id === movie.id);

// //If found in a watchlist then true else false (use in touchableOpacity component)

// isSuccess = checkButton ? true : false;
// useEffect(() => {
//   const checkMovieExist = async () => {
//     //console.log(checkMovie);
//   };

//   checkMovieExist();
//   handleWatchList().catch(console.error);
// }, [handleWatchList()]);
