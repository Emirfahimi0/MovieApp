import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useState, Fragment } from "react";
import { MovieCard } from "../components/movie-component/MovieCard";
import { SearchBarComponent } from "../components/movie-component/SearchBar";
import Icon from "react-native-vector-icons/Entypo";
import { handleMovieDetail } from "../components/features/handleFunctions";

const WatchlistScreen = ({ navigation, route }) => {
  //Access watchlist movie with context
  const { resWatchlist } = route.params;
  const [input, setInput] = useState<string>("");

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
