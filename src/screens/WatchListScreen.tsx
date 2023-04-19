import { handleMovieDetail } from "../components/features/handleFunctions";
import { HeaderComponent } from "../components/movie-component/HeaderComponent";
import { homeCardContainer, noDataStyle } from "../constants/style-component/viewComponent";
import { MovieCard } from "../components/movie-component/MovieCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";
import { ScrollView, Text, View } from "react-native";
import Loader from "../components/features/Loader";
import React, { useState, Fragment, useEffect, useContext } from "react";
import { WatchlistContext } from "../context/watchlist-context/WatchlistContext";
import { subHeader } from "../constants/style-component/textComponent";
interface IWatchlistScreenProps extends NativeStackScreenProps<RootStackParamList, "WatchlistScreen"> {
  navGoBack: boolean;
}

const WatchlistScreen = ({ navigation, route, navGoBack }: IWatchlistScreenProps) => {
  //Access watchlist movie with context
  const { accountDetails } = route.params;
  const [input, setInput] = useState<string>("");
  const { getWatchlistData, watchlistState } = useContext(WatchlistContext);
  const [loading, setLoading] = useState<boolean>();
  const handleGoBack = () => {
    if (navGoBack) {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    }
  };

  const handleGetWatchlist = async () => {
    setLoading(true);
    getWatchlistData();
    if (watchlistState !== undefined) {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetWatchlist().catch(console.error);
  }, []);

  return (
    <Fragment>
      <View style={{ flex: 1 }}>
        <HeaderComponent searchText={input} setSearchText={setInput} accountDetails={accountDetails} handleGoBack={handleGoBack} />
        {!loading ? (
          <View style={{ ...homeCardContainer }}>
            <ScrollView scrollEnabled={true} horizontal={true} style={{ paddingTop: 30 }}>
              {watchlistState.length > 0 ? (
                <MovieCard handleMovieDetail={handleMovieDetail} MovieData={watchlistState} keyword={input} />
              ) : (
                <View
                  style={{
                    ...noDataStyle,
                    paddingLeft: "65%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}>
                  <Text style={{ ...subHeader }}>No Watchlist added yet</Text>
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          <Loader />
        )}
      </View>
    </Fragment>
  );
};

export default WatchlistScreen;
