import { Alert, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useState, Fragment, useContext } from "react";
import { MovieCard } from "../components/movie-component/MovieCard";
import { SearchBarComponent } from "../components/movie-component/SearchBar";
import Icon from "react-native-vector-icons/Entypo";
import { IMovieDetail, IReview } from "../services";
import { fetchMovieDetails, fetchReviewMovieDetails } from "../components/features/handlingFunction";
import { GlobalContext } from "../context/GlobalState";

const WatchlistScreen = ({ navigation, route }) => {
  //Access watchlist movie with context
  const { resWatchlist } = route.params;
  const [input, setInput] = useState<string>("");
  const { storeAllState } = useContext(GlobalContext);

  // To do

  const handleMovieDetail = async (id: number) => {
    const resDetail: IMovieDetail = await fetchMovieDetails(id);
    const resReview: IReview[] = await fetchReviewMovieDetails(id);

    if (resDetail !== undefined && resReview !== undefined) {
      // replace back the current state
      await storeAllState(resDetail, resReview);

      //From APISERVICE
      navigation.push("DetailScreen", { item: resDetail, review: resReview });
    } else {
      // alert {you dont have data }
      Alert.alert("fetching data are undefined.Check back the api");
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
        {/* <MovieCard handleMovieDetail={handleMovieDetail} MovieData={Movie} keyword={searchInput} /> */}
        <ScrollView scrollEnabled={true} horizontal={true}>
          {Object.keys(resWatchlist).length > 0 ? (
            <MovieCard handleMovieDetail={handleMovieDetail} MovieData={resWatchlist} keyword={input} />
          ) : (
            <Text>No Watchlist added yet</Text>
          )}
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default WatchlistScreen;
