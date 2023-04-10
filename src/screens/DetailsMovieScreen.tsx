import { HeaderContainerDetails } from "../components/MovieDetailsComponent/HeaderContainerDetails";
import { ScrollView, ViewStyle, Dimensions, View } from "react-native";
import { SubContainerDetail } from "../components/MovieDetailsComponent/SubContainerDetail";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";
import Color from "../constants/Color";
import ReviewContainerDetails from "../components/MovieDetailsComponent/ReviewContainerDetails";

interface IDetailsMovieScreenProps extends NativeStackScreenProps<RootStackParamList, "DetailScreen"> {
  // other props ...
}

const DetailsMovieScreen = ({ route, navigation }: IDetailsMovieScreenProps) => {
  const { item, review, state } = route.params;
  const overview = item.overview;
  const { height } = Dimensions.get("screen");

  const handleGoBack = () => {
    navigation.goBack();
  };
  const overViewTextArea: ViewStyle = {
    backgroundColor: Color.TRANSPARENT,
    borderRadius: 20,
    padding: 10,
  };
  useEffect(() => {
    // fetchMovieDetails().catch(console.error);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ minHeight: height, backgroundColor: Color.BLACK }}>
      <HeaderContainerDetails movie={item} onPress={handleGoBack} state={state} />
      <SubContainerDetail overview={overview} overViewStyle={overViewTextArea} />
      <ReviewContainerDetails review={review} overViewStyle={overViewTextArea} />
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
