import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { Fragment, useState } from "react";
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
import { ItemSeparator } from "../PreviewMovieComponents/ItemSeparator";
import Color from "../../constants/Color";
import Icon from "react-native-vector-icons/Ionicons";
import { POSTER_BASE_URL } from "../../constants/utilities";
import { toWatchList } from "../../services/APIservices";
import { Genre, MovieDetail, accountState, watchListResponse } from "../../services";

interface IHeaderContainerDetails {
  movie: MovieDetail;
  onPress: () => void;
  state: accountState;
}

export const HeaderContainerDetails = ({ movie, onPress, state }: IHeaderContainerDetails) => {
  // const { movie } = movie;
  const [existWatchlist, setExistWatchlist] = useState<boolean>(state.watchlist);
  // const [genre,setGenre] = useState(movie.)
  // if (existWatchlist) {

  // }
  const handleWatchList = async () => {
    let checkWatchlist = state.watchlist;
    console.log(`This item is , ${checkWatchlist} in watchlist`);
    if (checkWatchlist === true) {
      Alert.alert("the item already added in the watchlist");

      // checkWatchlist = await toWatchList(movie, !state.watchlist);
    } else {
      const data: watchListResponse = await toWatchList(movie, !state.watchlist);
      setExistWatchlist(data.success);
      if (data.success === true) {
        Alert.alert("Item added to the watchlist");
        console.log("isSuccess", data.status_message);
        setExistWatchlist(data.success);
      }
    }
  };

  return (
    <Fragment>
      <View style={{ backgroundColor: Color.BLACK }}>
        <View style={ImagePosterDetail}>
          <ScrollView>{<Image style={posterImage} source={{ uri: `${POSTER_BASE_URL}${movie.poster_path}` }} />}</ScrollView>
        </View>
        <View style={[MovieDetailContainer, { paddingTop: setHeight(3) }]}>
          <TouchableOpacity onPress={onPress}>
            <Icon name="arrow-back-circle" size={35} color={Color.EXTRA_LIGHT_GRAY} />
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
          <Text style={additionalDetailText}>Genre: </Text>
          {movie.genres.map((value: Genre, index: number) => (
            <Text key={index} style={additionalDetailText}>
              {" | "}
              {value.name}
            </Text>
          ))}
        </View>
        <View style={smallDetail}>
          <Text style={additionalDetailText}>Original Language: {movie.original_language}</Text>
        </View>
        <View style={smallDetail}>
          <TouchableOpacity disabled={existWatchlist} onPress={() => handleWatchList()}>
            <View
              style={[
                !existWatchlist
                  ? { ...CardContainer, ...{ width: 150 } }
                  : { ...CardContainer, ...{ backgroundColor: "#2C2C2C", width: 150 } },
              ]}>
              <Icon
                name={existWatchlist ? "bookmark" : "bookmark-outline"}
                size={18}
                color={existWatchlist ? Color.EXTRA_LIGHT_GRAY : Color.BLACK}
              />
              <Text style={!existWatchlist ? genreText : { ...genreText, color: Color.WHITE }}>
                {existWatchlist ? "Added in Watchlist" : "Add to Watchlist"}
              </Text>
            </View>
          </TouchableOpacity>

          <ButtonModalRating movie={movie} state={state} />
        </View>
      </View>
    </Fragment>
  );
};
