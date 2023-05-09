import { FlatList, ImageBackground, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { ItemSeparator } from "./ItemSeparator";
import Icon from "react-native-vector-icons/Ionicons";
import { POSTER_BASE_URL } from "../../constants/utilities";
import { subDetail, subHeader, subTitle } from "../../constants/style-component/textComponent";
import color from "../../constants/Color";
import { handleShowDetailScreen } from "../features/handleFunctions";

interface IMovieCardProps {
  keyword: string;
  MovieData: TMovieType[];
  navigation: RootNavigationProp;
  setLoading: Dispatch<SetStateAction<boolean>>;
  storeAllDetailsState: (details: IMovieDetail, review: IResultReview[]) => Promise<void>;
}
const WatchListCard = ({ MovieData, keyword, navigation, setLoading, storeAllDetailsState }: IMovieCardProps) => {
  return (
    <View style={{ padding: 16, shadowColor: color.SEMI_BLACK, shadowOpacity: 1.5, shadowOffset: { width: 0, height: 4 } }}>
      <FlatList
        data={MovieData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator height={20} />}
        ListFooterComponent={() => <ItemSeparator height={20} />}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={`${item.title}-${index}`}
            onPress={() => handleShowDetailScreen(item.id, navigation, setLoading, storeAllDetailsState)}>
            {item.title?.toLowerCase().includes(keyword.toLowerCase()) ? (
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
                        <Icon iconStyle={{ marginRight: 10 }} name="heart-sharp" size={12} color="red" />
                        <Text style={{ ...subDetail, color: color.SECONDARY_COLOR }}> {item.vote_average.toFixed(1)}</Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </Fragment>
            ) : null}
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

const overlay: ViewStyle = {
  flexDirection: "column",
  marginTop: "auto",
  width: "100%",
  padding: 24,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  backgroundColor: "rgba(0,0,0,0.5)",
  alignSelf: "center",
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
