import { FlatList, ImageBackground, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { handleShowDetailScreen } from "../../components/utils/handleFunctions";
import { ItemSeparator } from "../../components/itemSeparator/ItemSeparator";
import { POSTER_BASE_URL } from "../../constants/utilities";
import { subDetail, subHeader, subTitle, color, setHeight, overlay } from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import React, { Dispatch, Fragment, SetStateAction } from "react";

interface IMovieCardProps {
  MovieData: TMovieType[];
  navigation: RootNavigationProp;
  setLoading: Dispatch<SetStateAction<boolean>>;
  storeAllDetailsState: (details: IMovieDetail, review: IResultReview[]) => Promise<void>;
}
const WatchListCard = ({ MovieData, navigation, setLoading, storeAllDetailsState }: IMovieCardProps) => {
  return (
    <View style={{ padding: 16, shadowColor: color.SEMI_BLACK, shadowOpacity: 1, shadowOffset: { width: 0, height: 3 } }}>
      <FlatList
        data={MovieData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator height={setHeight(2)} />}
        ListFooterComponent={() => <ItemSeparator height={setHeight(2)} />}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={`${item.title}-${index}`}
            onPress={() => handleShowDetailScreen(item.id, navigation, setLoading, storeAllDetailsState)}>
            <Fragment>
              <ImageBackground
                source={{ uri: `${POSTER_BASE_URL}original${item.backdrop_path}` }}
                style={{ height: 200, width: "100%", justifyContent: "center" }}
                imageStyle={{ borderRadius: 30 }}>
                <View style={{ ...overlay }}>
                  <View style={{ ...MovieCardTitle }}>
                    <Text numberOfLines={2} style={{ ...subHeader, color: color.SECONDARY_COLOR }}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={subContainer}>
                    <View>
                      <Text style={{ ...subTitle, color: color.SECONDARY_COLOR }}> {item.release_date}</Text>
                    </View>
                    <View style={Rating}>
                      <Icon name="heart-sharp" size={12} color="red" />
                      <Text style={{ ...subDetail, color: color.SECONDARY_COLOR }}> {item.vote_average.toFixed(1)}</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </Fragment>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const subContainer: ViewStyle = {
  alignItems: "flex-start",
  flexDirection: "row",
  justifyContent: "space-between",
};

const MovieCardTitle: ViewStyle = {
  marginTop: 5,
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "flex-start",
  paddingVertical: 2,
  paddingLeft: 3,
  width: 150,
};
const Rating: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
};
export default WatchListCard;
