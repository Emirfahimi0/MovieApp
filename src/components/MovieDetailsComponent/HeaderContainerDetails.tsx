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
import { toWatchList } from "../../services/apiServices";
import { Genre, IMovieDetail, IaccountState, IwatchListResponse } from "../../services";

interface IHeaderContainerDetails {
  movie: IMovieDetail;
  onPress: () => void;
  state: IaccountState;
}

export const HeaderContainerDetails = ({ movie, onPress, state }: IHeaderContainerDetails) => {
  const [existWatchlist, setExistWatchlist] = useState<boolean>(state.watchlist);

  const handleWatchList = async () => {
    // Get the data first and complementary based on what user click
    const data: IwatchListResponse = await toWatchList(movie, !existWatchlist);
    // if response of the data return success.
    if (data.success) {
      setExistWatchlist(!existWatchlist);
      if (existWatchlist) {
        Alert.alert("Item remove from watchlist");
      } else {
        Alert.alert("Item added to watchlist!");
      }
    } else {
      if (existWatchlist) {
        Alert.alert("unable to add item in the watchlist.");
      } else {
        Alert.alert("unable to remove item in the watchlist.");
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
          <TouchableOpacity onPress={() => handleWatchList()}>
            <View
              style={[
                existWatchlist
                  ? { ...CardContainer, ...{ backgroundColor: "#2C2C2C", width: 150 } }
                  : { ...CardContainer, ...{ width: 150 } },
              ]}>
              <Icon
                name={existWatchlist ? "bookmark" : "bookmark-outline"}
                size={18}
                color={existWatchlist ? Color.EXTRA_LIGHT_GRAY : Color.BLACK}
              />
              <Text style={existWatchlist ? { ...genreText, color: Color.WHITE } : genreText}>
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
