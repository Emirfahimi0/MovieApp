import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { Fragment, useContext, useState } from "react";
import {
  CardContainer,
  ContainerRow,
  ImagePosterDetail,
  MovieDetailContainer,
  posterImage,
  setHeight,
  smallDetail,
} from "../../constants/Styling/ContainerStyling";
import { additionalDetailText, genreText, MovieDetailTitle, RatingText } from "../../constants/Styling/TextStyleComponent";
import { ButtonModalRating } from "./ButtonModalRating";
import { GlobalContext } from "../../Context/GlobalState";
import { MovieType } from "../../screens";
import { ItemSeparator } from "../PreviewMovieComponents/ItemSeparator";
import Color from "../../constants/Color";
import Icon from "react-native-vector-icons/Ionicons";
import { POSTER_BASE_URL } from "../../constants/utilities";

interface IHeaderContainerDetails {
  movie: MovieType;
  onPress: () => void;
}

export const HeaderContainerDetails = ({ movie, onPress }: IHeaderContainerDetails) => {
  // const { movie } = movie;

  const { addMovieWatchList, WatchList, removeMovieWatchList } = useContext(GlobalContext);
  const [CheckButton, setCheckButton] = useState<boolean>(false);

  // return  stored movie   To do condition
  let StoredMovie = WatchList.find((object) => object.id === movie.id);

  //If found in a watchlist then true else false (use in touchableOpacity component)
  const WatchListDisabled = StoredMovie ? true : false;

  const handleWatchList = () => {
    if (!WatchListDisabled) {
      addMovieWatchList(movie);
      setCheckButton(WatchListDisabled);
    } else {
      removeMovieWatchList(movie.id);
    }
  };

  return (
    <Fragment>
      <View style={{ backgroundColor: Color.BLACK, paddingBottom: 30 }}>
        <View style={ImagePosterDetail}>
          <ScrollView>
            <Image style={posterImage} source={{ uri: `${POSTER_BASE_URL}${movie.poster_path}` }} />
          </ScrollView>
        </View>
        <View style={[MovieDetailContainer, { paddingTop: 20 }]}>
          <TouchableOpacity onPress={onPress}>
            <Icon name="arrow-back-circle" iconStyle={{ paddingTop: 20 }} size={35} color={Color.EXTRA_LIGHT_GRAY} />
          </TouchableOpacity>
        </View>
        <ItemSeparator height={setHeight(35)} />
        <View style={MovieDetailContainer}>
          <Text style={MovieDetailTitle} numberOfLines={2}>
            {movie.title}
          </Text>
          <View style={ContainerRow}>
            <Icon iconStyle={{ marginLeft: 8 }} name="heart-sharp" size={18} color="red" />
            <Text style={RatingText}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        </View>
        <View style={smallDetail}>
          <Text style={additionalDetailText}>Genre:{movie.genre_ids}</Text>
        </View>
        <View style={smallDetail}>
          <Text style={additionalDetailText}>Original Language: {movie.original_language}</Text>
        </View>
        <TouchableOpacity onPress={() => handleWatchList()}>
          <View style={smallDetail}>
            <View
              style={[
                !WatchListDisabled
                  ? { ...CardContainer, ...{ width: 150 } }
                  : { ...CardContainer, ...{ backgroundColor: "#2C2C2C", width: 150 } },
              ]}>
              <Icon
                name={WatchListDisabled ? "bookmark" : "bookmark-outline"}
                size={18}
                color={WatchListDisabled ? Color.EXTRA_LIGHT_GRAY : Color.BLACK}
              />
              <Text style={!WatchListDisabled ? genreText : { ...genreText, color: Color.WHITE }}>
                {WatchListDisabled ? "Added in Watchlist" : "Add to Watchlist"}
              </Text>
            </View>
            <ButtonModalRating movie={movie} />
          </View>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};
