import { handleMovieDetail } from "../components/features/handleFunctions";
import Icon from "react-native-vector-icons/Ionicons";
import { homeCardContainer, noDataStyle } from "../constants/style-component/viewComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";
import { SafeAreaView, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import Loader from "../components/features/Loader";
import React, { useState, Fragment, useEffect, useContext } from "react";
import { subHeader } from "../constants/style-component/textComponent";
import { WatchlistContext } from "../context/watchlist-context/WatchlistContext";
import WatchListCard from "../components/movie-component/WatchListCard";
import color from "../constants/Color";
import { headerContainerStyle } from "../components/detail-component/HeaderContainerDetails";
import Font from "../constants/Font";
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
      navigation.goBack();
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "HomeScreen" }],
      // });
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
  }, [watchlistState]);

  return (
    <Fragment>
      <View
        style={{
          ...headerContainerStyle,
          backgroundColor: color.SEMI_BLACK,
          height: "auto",
          justifyContent: "space-between",
          flexDirection: "row",
        }}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="md-chevron-back" size={32} color={"white"} />
        </TouchableWithoutFeedback>
        <Text style={{ fontFamily: Font.BOLD, fontSize: 24, color: color.SECONDARY_COLOR }}>WATCHLIST</Text>
      </View>
      <View style={{ ...homeCardContainer, borderRadius: 50 }}>
        {watchlistState.length > 0 ? (
          <Fragment>
            <WatchListCard handleMovieDetail={handleMovieDetail} MovieData={watchlistState} keyword={input} />
          </Fragment>
        ) : !loading ? (
          <Loader />
        ) : (
          <View
            style={{
              ...noDataStyle,
              justifyContent: "center",
              alignItems: "flex-start",
            }}>
            <Text style={{ ...subHeader }}>No Watchlist added yet</Text>
          </View>
        )}
      </View>
    </Fragment>
  );
};

export default WatchlistScreen;
