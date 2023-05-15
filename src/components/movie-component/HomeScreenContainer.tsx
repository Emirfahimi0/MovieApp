import { ListCardButtons } from "./ListCardButtons";
import { ListPreviewMovie, bottomCardContainer, movieContainer, noDataStyle } from "../../constants/style-component/viewComponent";
import Icon from "react-native-vector-icons/Ionicons";
import { FlatList, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { subDetail, subHeader, subTitle } from "../../constants/style-component/textComponent";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import Loader from "../features/Loader";
import { useNavigation } from "@react-navigation/native";
import { ItemSeparator } from "./ItemSeparator";
import { POSTER_BASE_URL } from "../../constants/utilities";
import FastImage from "react-native-fast-image";

interface IBottomScreenCardContainer {
  searchInput: string;
  Movies: TMovieType[];
  Genres: TGenre[];
  loading: boolean | undefined;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handlePressGenre: (item: TGenre, index: number) => void;
  handleShowDetailScreen: (
    id: number,
    navigation: RootNavigationProp,
    setLoading: Dispatch<SetStateAction<boolean>>,
    storeAllDetailsState: (detail: IMovieDetail, review: IResultReview[]) => Promise<void>,
  ) => Promise<void>;
  storeAllDetailsState: (detail: IMovieDetail, review: IResultReview[]) => Promise<void>;
}

export const ImagePoster: FastImageStyle = {
  borderRadius: movieContainer.borderRadius,
  height: movieContainer.height,
  width: 150,
};
// type TWatchlist = "Favorite" | "To Watch";

export const BottomScreenCardContainer = ({
  searchInput,
  Movies,
  Genres,
  handleShowDetailScreen,
  loading,
  setLoading,
  handlePressGenre,
  storeAllDetailsState,
}: IBottomScreenCardContainer) => {
  const [active, setActive] = useState<number>(0);
  const navigation: RootNavigationProp = useNavigation();
  loading = false;

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

  // const searchMovies = Movies.filter((item) => {
  //   item.title !== undefined && item.title.toLowerCase().includes(searchInput !== "" ? searchInput.toLowerCase() : "");
  // });

  const searchMovies = Movies.map((item) => {
    const isIncluded = item.title !== undefined && item.title.toLowerCase().includes(searchInput !== "" ? searchInput.toLowerCase() : "");
    return isIncluded ? item : null;
  }).filter((item) => item !== null);

  // console.log("searchMovies", { searchMovies: searchMovies, searchInput: searchInput });

  return (
    <Fragment>
      <View
        style={{
          ...bottomCardContainer,
        }}>
        <ListCardButtons<TGenre> data={Genres} handlePress={handlePressGenre} active={active} setActive={setActive} />

        {Object.keys(Movies).length > 0 && active !== undefined && searchMovies ? (
          // <ListMovieCards handleMovieDetail={handleMovieDetail} MovieData={Movie} keyword={searchInput} />
          <View style={{ ...noDataStyle }}>
            {loading ? (
              <Loader />
            ) : (
              // render MovieCard list
              <FlatList
                data={searchMovies}
                horizontal
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `${item?.id}`}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <ItemSeparator width={20} />}
                ListFooterComponent={() => <ItemSeparator width={20} />}
                renderItem={({ item, index }) => (
                  <Fragment>
                    {Object.keys(searchMovies).length <= 0 || searchMovies === null || searchMovies === undefined ? (
                      <View style={{ ...noDataStyle }}>
                        <Text style={subHeader}> No Movie found{":("}</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        key={`${item?.title}-${index}`}
                        onPress={() => handleShowDetailScreen(item?.id, navigation, setLoading, storeAllDetailsState)}>
                        <View style={{ ...ListPreviewMovie }}>
                          <View style={movieContainer}>
                            <FastImage
                              source={{ uri: `${POSTER_BASE_URL}original${item?.poster_path}` }}
                              style={ImagePoster}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </View>
                          <View style={MovieCardTitle}>
                            <Text style={subHeader} numberOfLines={3}>
                              {item?.title}
                            </Text>
                          </View>
                          <View style={subContainer}>
                            <View>
                              <Text style={subTitle}> {item?.release_date}</Text>
                            </View>
                            <View style={Rating}>
                              <Icon iconStyle={{ marginRight: 10 }} name="heart-sharp" size={12} color="red" />
                              <Text style={subDetail}> {item?.vote_average.toFixed(1)}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  </Fragment>
                )}
              />
            )}
          </View>
        ) : loading ? (
          <View style={{ ...noDataStyle }}>
            <Loader />
          </View>
        ) : (
          <View style={{ ...noDataStyle }}>
            <Text style={subHeader}> No Movie based on this genre</Text>
          </View>
        )}
      </View>
    </Fragment>
  );
};
