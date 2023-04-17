import { ScrollView, Text, View } from "react-native";
import React, { useState, Fragment, useEffect } from "react";
import { MovieCard } from "../components/movie-component/MovieCard";
import { HeaderComponent } from "../components/movie-component/HeaderComponent";
import { handleMovieDetail } from "../components/features/handleFunctions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";
interface IWatchlistScreenProps extends NativeStackScreenProps<RootStackParamList, "WatchlistScreen"> {
  navGoBack: boolean;
}

const WatchlistScreen = ({ navigation, route, navGoBack }: IWatchlistScreenProps) => {
  //Access watchlist movie with context
  const { resWatchlist, accountDetails } = route.params;
  const [input, setInput] = useState<string>("");

  const handleGoBack = () => {
    if (navGoBack) {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    }
  };
  useEffect(() => {}, []);

  return (
    <Fragment>
      <View style={{ flex: 1, paddingBottom: 10 }}>
        <HeaderComponent searchText={input} setSearchText={setInput} accountDetails={accountDetails} handleGoBack={handleGoBack} />

        <ScrollView scrollEnabled={true} horizontal={true} style={{ paddingTop: 30 }}>
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
