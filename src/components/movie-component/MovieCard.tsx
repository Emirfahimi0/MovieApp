import { Fragment, useContext } from "react";
import { ImagePoster, ListPreviewMovie, movieContainer } from "../../constants/style-component/ContainerStyling";
import { IDetailsMovie, MovieType } from "../../screens";
import { ItemSeparator } from "./ItemSeparator";
import { subDetail, subHeader, subTitle } from "../../constants/style-component/TextStyleComponent";
import { Text, View, FlatList, TouchableOpacity, Image, ViewStyle } from "react-native";
import { POSTER_BASE_URL } from "../../constants/utilities";
import Icon from "react-native-vector-icons/Ionicons";
import { GlobalContext } from "../../context/GlobalState";
import { RootNavigationProp } from "types/global";
import { useNavigation } from "@react-navigation/native";
import Loader from "../features/Loader";

interface IMovieCardProps {
  keyword: string;
  MovieData: MovieType[];
  handleMovieDetail: (id: number) => Promise<IDetailsMovie>;
}

export const MovieCard = ({ MovieData, keyword, handleMovieDetail }: IMovieCardProps) => {
  const { storeAllDetailsState } = useContext(GlobalContext);
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

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={MovieData}
          numColumns={2}
          keyExtractor={(item) => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={`${item.title}-${index}`} onPress={() => handleShowDetailScreen(item.id)}>
              {item.title?.toLowerCase().includes(keyword.toLowerCase()) ? (
                <View style={ListPreviewMovie}>
                  <View style={movieContainer}>
                    <Image source={{ uri: `${POSTER_BASE_URL}${item.poster_path}` }} style={ImagePoster}></Image>
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
                      <Icon iconStyle={{ marginRight: 10 }} name="heart-sharp" size={16} color="red" />
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

const MovieCardTitle: ViewStyle = {
  marginTop: 5,
  paddingVertical: 2,
  width: 200,
};
const subContainer: ViewStyle = {
  alignItems: "flex-start",
  flexDirection: "row",
  justifyContent: "space-between",
};
const Rating: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
};
