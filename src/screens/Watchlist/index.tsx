import { bottomCardContainer, sectionStyle } from "../../constants/style-component/viewComponent";
import { DetailContext } from "../../contextStore/detail-context/DetailContext";
import { headerContainerStyle, color, Font } from "../../constants";
import { ItemSeparator } from "../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { subHeader } from "../../constants/style-component/textComponent";
import { WatchlistContext } from "../../contextStore/watchlist-context/WatchlistContext";
import Icon from "react-native-vector-icons/Ionicons";
import Loader from "../../components/loader/Loader";
import React, { useState, Fragment, useEffect, useContext } from "react";
import WatchListCard from "./WatchListCard";
interface IWatchlistScreenProps extends NativeStackScreenProps<RootStackParamList, "WatchlistScreen"> {}

const WatchlistScreen = ({ navigation, route }: IWatchlistScreenProps) => {
  //Access watchlist movie with context

  const { storeAllDetailsState } = useContext(DetailContext);
  const { getWatchlistData, watchlistState } = useContext(WatchlistContext);
  const [loading, setLoading] = useState<boolean>(true);
  const handleGoBack = () => {
    if (route.params.navGoBack) {
      console.log(typeof route.params.navGoBack);
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
          paddingVertical: "12%",
          backgroundColor: color.PRIMARY_COLOR,
          flexDirection: "row",
        }}>
        <View style={{ left: 24, zIndex: 1 }}>
          <Pressable onPress={handleGoBack}>
            <Icon name="md-chevron-back" size={32} color={"white"} />
          </Pressable>
        </View>
        <View style={{ justifyContent: "center", alignContent: "center", paddingLeft: 92 }}>
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
      <ItemSeparator height={32} />
      <View style={{ ...bottomCardContainer, backgroundColor: color.ACTIVE, borderRadius: 20 }}>
        {watchlistState.length > 0 ? (
          <Fragment>
            <WatchListCard
              navigation={navigation}
              setLoading={setLoading}
              storeAllDetailsState={storeAllDetailsState}
              MovieData={watchlistState}
            />
          </Fragment>
        ) : !loading ? (
          <Loader />
        ) : (
          <View
            style={{
              ...sectionStyle,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ ...subHeader }}>No movie added in watchlist yet</Text>
          </View>
        )}
      </View>
    </Fragment>
  );
};

export default WatchlistScreen;
