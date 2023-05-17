import { ListCardButtons } from "./ListCardButtons";
import { bottomCardContainer, ListPreviewMovie, movieContainer, sectionStyle, subDetail, subHeader, subTitle } from "../../constants";
import { FlatList, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { ItemSeparator } from "./ItemSeparator";
import { POSTER_BASE_URL } from "../../constants/utilities";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Ionicons";
import Loader from "../features/Loader";
import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";

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
  const useDebounce = (searchInput: string, delay: number) => {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(searchInput);
    useEffect(() => {
      //set debounce vale after certain passed delay
      const handler = setTimeout(() => {
        setDebouncedValue(searchInput);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [searchInput]);

    return debouncedValue;
  };
  const debouncedValues = useDebounce(searchInput, 1000);

  const searchMovies = Movies.map((item) => {
    const isIncluded =
      item.title !== undefined && item.title.toLowerCase().includes(debouncedValues !== "" ? debouncedValues.toLowerCase() : "");
    return isIncluded ? item : null;
  }).filter((item) => item !== null);

  return (
    <Fragment>
      <View
        style={{
          ...bottomCardContainer,
        }}>
        <ListCardButtons data={Genres} handlePress={handlePressGenre} active={active} setActive={setActive} />

        <View style={{ ...sectionStyle }}>
          {Object.keys(searchMovies).length > 0 && active !== undefined && searchMovies !== undefined ? (
            // <ListMovieCards handleMovieDetail={handleMovieDetail} MovieData={Movie} keyword={searchInput} />
            <Fragment>
              {loading ? (
                <Loader />
              ) : (
                // render MovieCard list
                <FlatList
                  data={searchMovies}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => `${item?.id}`}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  ListFooterComponent={() => <ItemSeparator width={24} />}
                  renderItem={({ item, index }) => (
                    <Fragment>
                      {Object.keys(searchMovies).length == 0 || searchMovies == null || searchMovies === undefined ? null : (
                        <TouchableOpacity
                          key={`${item?.title}-${index}`}
                          onPress={() =>
                            handleShowDetailScreen(
                              item?.id ? item?.id : searchMovies.indexOf(item),
                              navigation,
                              setLoading,
                              storeAllDetailsState,
                            )
                          }>
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
                                <Icon name="heart-sharp" size={12} color="red" />
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
            </Fragment>
          ) : !loading ? (
            <Loader />
          ) : (
            <Text style={subHeader}> No Movie found{":("}</Text>
          )}
        </View>
      </View>
    </Fragment>
  );
};
