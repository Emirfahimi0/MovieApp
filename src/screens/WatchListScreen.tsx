import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useState, Fragment } from "react";
import { MovieCard } from "../components/movie-component/MovieCard";
import { HeaderComponent } from "../components/movie-component/HeaderComponent";
import Icon from "react-native-vector-icons/Entypo";
import { handleMovieDetail } from "../components/features/handleFunctions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";
interface IWatchlistScreenProps extends NativeStackScreenProps<RootStackParamList, "WatchlistScreen"> {}

const WatchlistScreen = ({ navigation, route }: IWatchlistScreenProps) => {
  //Access watchlist movie with context
  const { resWatchlist, accountDetails } = route.params;
  const [input, setInput] = useState<string>("");

  return (
    <Fragment>
      <View>
        <HeaderComponent searchText={input} setSearchText={setInput} accountDetails={accountDetails} />
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={20} color={"black"} />
        </TouchableWithoutFeedback>

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
