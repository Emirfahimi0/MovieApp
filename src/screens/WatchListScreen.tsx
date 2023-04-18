import { fetchWatchlist, handleMovieDetail } from "../components/features/handleFunctions";
import { HeaderComponent } from "../components/movie-component/HeaderComponent";
import { homeCardContainer } from "../constants/style-component/viewComponent";
import { MovieCard } from "../components/movie-component/MovieCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";
import { ScrollView, Text, View } from "react-native";
import { TMovieType } from ".";
import Loader from "../components/features/Loader";
import React, { useState, Fragment, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
interface IWatchlistScreenProps extends NativeStackScreenProps<RootStackParamList, "WatchlistScreen"> {
  navGoBack: boolean;
}

const WatchlistScreen = ({ navigation, route, navGoBack }: IWatchlistScreenProps) => {
  //Access watchlist movie with context
  const { accountDetails } = route.params;
  const [input, setInput] = useState<string>("");
  const { storeWatchlist, watchlistState } = useContext(GlobalContext);
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
    storeWatchlist(watchlistState);
    if (watchlistState !== undefined) {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetWatchlist().catch();
  }, [watchlistState]);

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
                <Text>No Watchlist added yet</Text>
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
