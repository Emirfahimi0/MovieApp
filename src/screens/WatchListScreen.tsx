import { Alert, TouchableWithoutFeedback, View } from "react-native";
import React, { useState, Fragment } from "react";
import { MovieCard } from "../components/PreviewMovieComponents/MovieCard";
import { SearchBarComponent } from "../components/PreviewMovieComponents/SearchBar";
import Icon from "react-native-vector-icons/Entypo";
import { MovieDetail, Review, accountState } from "../services";
import { fetchAccountState, fetchMovieDetails, fetchReviewMovieDetails } from "../components/appRender/handlingFunction";

const WatchListScreen = ({ navigation, route }) => {
  //Access watchlist movie with context
  const { resWatchlist } = route.params;
  const [input, setInput] = useState<string>("");
  // To do

  const handleMovieDetail = async (id: number) => {
    const resDetail: MovieDetail = await fetchMovieDetails(id);
    const resReview: Review[] = await fetchReviewMovieDetails(id);
    const resFetchState: accountState = await fetchAccountState(id);

    console.log("response from account state", resFetchState);

    if (resDetail !== undefined && resReview !== undefined && resFetchState !== undefined) {
      //From APISERVICE
      navigation.push("DetailScreen", { item: resDetail, review: resReview, state: resFetchState });
    } else {
      // alert {you dont have data }
      Alert.alert("getDetails undefined. something wrong somewhere");
    }
  };
  return (
    <Fragment>
      <View style={{ padding: 10 }}>
        <SearchBarComponent searchText={input} setSearchText={setInput} />
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={20} color={"black"} />
        </TouchableWithoutFeedback>

        {/* {WatchList ? ():()} */}
        <MovieCard handleMovieDetail={handleMovieDetail} MovieData={resWatchlist} keyword={input} navigation={navigation} />
      </View>
    </Fragment>
  );
};

export default WatchListScreen;
