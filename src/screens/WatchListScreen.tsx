import Icon from "react-native-vector-icons/Ionicons";
import { homeCardContainer, noDataStyle } from "../constants/style-component/viewComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import Loader from "../components/features/Loader";
import React, { useState, Fragment, useEffect, useContext } from "react";
import { subHeader } from "../constants/style-component/textComponent";
import { WatchlistContext } from "../context/watchlist-context/WatchlistContext";
import WatchListCard from "../components/movie-component/WatchListCard";
import color from "../constants/Color";
import { headerContainerStyle } from "../constants/style-component/viewComponent";
import Font from "../constants/Font";
import { DetailContext } from "../context/detail-context/DetailContext";
interface IWatchlistScreenProps extends NativeStackScreenProps<RootStackParamList, "WatchlistScreen"> {}

const WatchlistScreen = ({ navigation, route }: IWatchlistScreenProps) => {
  //Access watchlist movie with context
  const [input, setInput] = useState<string>("");
  const { storeAllDetailsState } = useContext(DetailContext);
  const { getWatchlistData, watchlistState } = useContext(WatchlistContext);
  const [loading, setLoading] = useState<boolean>(false);
  const handleGoBack = () => {
    if (route.params.navGoBack) {
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
          backgroundColor: color.AMBER,
          height: "auto",
          flexDirection: "row",
        }}>
        <View style={{}}>
          <TouchableWithoutFeedback onPress={handleGoBack}>
            <Icon name="md-chevron-back" size={32} color={"white"} />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ justifyContent: "center", alignContent: "center", marginLeft: 92 }}>
          <Text
            style={{
              fontFamily: Font.REGULAR,
              fontSize: 24,
              fontWeight: "800",
              color: color.SECONDARY_COLOR,
            }}>
            WATCHLIST
          </Text>
        </View>
      </View>

      <View style={{ ...homeCardContainer, borderRadius: 50 }}>
        {watchlistState.length > 0 ? (
          <Fragment>
            <WatchListCard
              navigation={navigation}
              setLoading={setLoading}
              storeAllDetailsState={storeAllDetailsState}
              MovieData={watchlistState}
              keyword={input}
            />
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
