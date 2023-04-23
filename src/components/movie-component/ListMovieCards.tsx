import { DetailContext } from "../../context/detail-context/DetailContext";
import { Fragment, useContext } from "react";
import { IDetailsMovie, TMovieType } from "../../screens";
import { ImagePoster, ListPreviewMovie, movieContainer } from "../../constants/style-component/viewComponent";
import { ItemSeparator } from "./ItemSeparator";
import { POSTER_BASE_URL } from "../../constants/utilities";
import { RootNavigationProp } from "types/global";
import { subDetail, subHeader, subTitle } from "../../constants/style-component/textComponent";
import { Text, View, FlatList, TouchableOpacity, Image, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Loader from "../features/Loader";

interface IMovieCardProps {
  keyword: string;
  MovieData: TMovieType[];
  handleMovieDetail: (id: number) => Promise<IDetailsMovie>;
}

export const ListMovieCards = ({ MovieData, keyword, handleMovieDetail }: IMovieCardProps) => {
  const { storeAllDetailsState } = useContext(DetailContext);
  const navigation: RootNavigationProp = useNavigation();
  let loading = false;
  const handleShowDetailScreen = async (id: number) => {
    const getDetailsFromApi = await handleMovieDetail(id);
    console.log("object", getDetailsFromApi.detail);
    if (getDetailsFromApi !== undefined) {
      loading = false;
      storeAllDetailsState(getDetailsFromApi.detail, getDetailsFromApi.review);
      // navigate...
      navigation.navigate("DetailScreen", { item: getDetailsFromApi.detail, review: getDetailsFromApi.review });
    } else loading = true;
  };
  const posterUrl = `${POSTER_BASE_URL}original/`;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={MovieData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={`${item.title}-${index}`} onPress={() => handleShowDetailScreen(item.id)}>
              {item.title?.toLowerCase().includes(keyword.toLowerCase()) ? (
                <View style={ListPreviewMovie}>
                  <View style={movieContainer}>
                    <Image source={{ uri: `${posterUrl}${POSTER_BASE_URL}original/${item.backdrop_path}` }} style={ImagePoster}></Image>
                  </View>
                  <View style={MovieCardTitle}>
                    <Text style={subHeader} numberOfLines={3}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={subContainer}>
                    <View>
                      <Text style={subTitle}> {item.release_date}</Text>
                    </View>
                    <View style={Rating}>
                      <Icon iconStyle={{ marginRight: 10 }} name="heart-sharp" size={12} color="red" />
                      <Text style={subDetail}>{item.vote_average.toFixed(1)}</Text>
                    </View>
                  </View>
                </View>
              ) : null}
            </TouchableOpacity>
          )}
        />
      )}
    </Fragment>
  );
};
const subContainer: ViewStyle = {
  alignItems: "flex-start",
  flexDirection: "row",
  justifyContent: "space-between",
};

const MovieCardTitle: ViewStyle = {
  marginTop: 5,
  alignItems: "flex-start",
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
