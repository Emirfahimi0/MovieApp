import { Alert, Image, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { Dispatch, Fragment, SetStateAction, useContext, useState } from "react";
import {
  CardContainer,
  ContainerRow,
  ImagePosterDetail,
  MovieDetailContainer,
  posterImage,
  setHeight,
  setWidth,
  smallDetail,
} from "../../constants/style-component/viewComponent";
import { additionalDetailText, genreText, MovieDetailTitle, RatingText } from "../../constants/style-component/textComponent";
import { ButtonModalRating } from "./ButtonModalRating";
import { Genre, IMovieDetail, IAccountState, IWatchListResponse } from "../../services";
import { ItemSeparator } from "../movie-component/ItemSeparator";
import { POSTER_BASE_URL } from "../../constants/utilities";
import { toWatchList } from "../../services/api-services";
import Color from "../../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import { WatchlistContext } from "../../context/watchlist-context/WatchlistContext";
import color from "../../constants/color";
import YoutubeIframe from "react-native-youtube-iframe";

interface IHeaderContainerDetails {
  selectedMovie: IMovieDetail;
  onPress: () => void;
  state: IAccountState;
  ratingVal: number;
  setRating: Dispatch<SetStateAction<number>>;
}

export const HeaderContainerDetails = ({ selectedMovie, onPress, state, ratingVal, setRating }: IHeaderContainerDetails) => {
  const [existWatchlist, setExistWatchlist] = useState<boolean>(state?.watchlist);
  const { getWatchlistData } = useContext(WatchlistContext);
  const [playTrailer, setPlayTrailer] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const handleWatchList = async () => {
    // Get the data first and complementary based on what user click
    const data: IWatchListResponse = await toWatchList(selectedMovie, !existWatchlist);
    // if response of the data return success.
    if (data.success) {
      getWatchlistData();
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

  const handleRenderTrailer = () => {
    const trailer = selectedMovie.videos.results.find((vid) => vid.name === "Official Trailer");
    <YoutubeIframe height={500} width={setWidth(500)} play={playTrailer} videoId={trailer?.key} />;
  };
  return (
    <Fragment>
      <View style={{ position: "absolute", padding: "10%", zIndex: 1, top: 20, left: 30 }}>
        <TouchableOpacity onPress={onPress}>
          <Icon name="arrow-back-circle" size={35} color={Color.SEMI_BLACK} />
        </TouchableOpacity>
      </View>
      <View style={headerContainerStyle}>
        <View style={ImagePosterDetail}>
          <Image style={posterImage} source={{ uri: `${POSTER_BASE_URL}original/${selectedMovie.poster_path}` }} />
        </View>
        <View
          //Play button
          {...(selectedMovie.videos && playTrailer ? handleRenderTrailer : null)}
          style={{ ...playButton }}>
          <TouchableOpacity onPress={() => setPlayTrailer(true)}>
            <Icon name="play-circle-outline" style={{ marginLeft: 5 }} size={100} color={color.AMBER} />
          </TouchableOpacity>
        </View>

        <ItemSeparator height={setHeight(2)} />
        <View style={MovieDetailContainer}>
          <Text style={MovieDetailTitle} numberOfLines={2}>
            {selectedMovie.title}
          </Text>
          <View style={ContainerRow}>
            <Icon iconStyle={{ marginLeft: 8 }} name="heart-sharp" size={18} color="red" />
            <Text style={RatingText}>{selectedMovie.vote_average.toFixed(1)}</Text>
          </View>
        </View>
        <View style={smallDetail}>
          <Text style={additionalDetailText}>Genre: </Text>
          {selectedMovie.genres.map((value: Genre, index: number) => (
            <Text key={index} style={additionalDetailText}>
              {" | "}
              {value.name}
            </Text>
          ))}
        </View>
        <View style={smallDetail}>
          <Text style={additionalDetailText}>Original Language: {selectedMovie.original_language}</Text>
        </View>
        <View style={{ ...smallDetail }}>
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
              <Text style={existWatchlist ? { ...genreText, color: Color.SECONDARY_COLOR } : genreText}>
                {existWatchlist ? "Added in Watchlist" : "Add to Watchlist"}
              </Text>
            </View>
          </TouchableOpacity>

          <ButtonModalRating movie={selectedMovie} state={state} ratingVal={ratingVal} setRating={setRating} />
        </View>
      </View>
    </Fragment>
  );
};

export const headerContainerStyle: ViewStyle = {
  alignItems: "center",
  alignContent: "center",
  justifyContent: "center",
  borderBottomRightRadius: 40,
  borderBottomLeftRadius: 40,
  backgroundColor: color.SECONDARY_COLOR,
  paddingBottom: 20,
  paddingHorizontal: 10,
  paddingTop: 80,
  shadowOpacity: 1.0,
  shadowOffset: {
    height: 0,
    width: -3,
  },
};

const playButton: ViewStyle = {
  flexDirection: "row",
  position: "absolute",
  alignSelf: "center",
  width: 200,
  borderRadius: 20,
  borderColor: color.ACTIVE,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
};
