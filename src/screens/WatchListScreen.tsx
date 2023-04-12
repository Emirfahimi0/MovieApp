import { Alert, TouchableWithoutFeedback, View } from "react-native";
import React, { useState, Fragment } from "react";
import { MovieCard } from "../components/movie-component/MovieCard";
import { SearchBarComponent } from "../components/movie-component/SearchBar";
import Icon from "react-native-vector-icons/Entypo";
import { IMovieDetail, IReview, IAccountState } from "../services";
import { fetchAccountState, fetchMovieDetails, fetchReviewMovieDetails } from "../components/features/handlingFunction";

const WatchlistScreen = ({ navigation, route }) => {
  //Access watchlist movie with context
  const { resWatchlist } = route.params;
  const [input, setInput] = useState<string>("");
  // To do

  const handleMovieDetail = async (id: number) => {
    const resDetail: IMovieDetail = await fetchMovieDetails(id);
    const resReview: IReview[] = await fetchReviewMovieDetails(id);
    const resFetchState: IAccountState = await fetchAccountState(id);

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
        <MovieCard handleMovieDetail={handleMovieDetail} MovieData={resWatchlist} keyword={input} />
      </View>
    </Fragment>
  );
};

export default WatchlistScreen;
