import { Alert, Image, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { Dispatch, Fragment, SetStateAction, useCallback, useContext, useState } from "react";
import {
  CardContainer,
  ContainerRow,
  ImagePosterDetail,
  MovieDetailContainer,
  posterImage,
  setHeight,
  smallDetail,
  youtubePlayerView,
} from "../../constants/style-component/viewComponent";
import { additionalDetailText, normalText, MovieDetailTitle, RatingText } from "../../constants/style-component/textComponent";
import { ButtonModalRating } from "./ButtonModalRating";
import { Genre, IMovieDetail, IAccountState, IWatchListResponse } from "../../services";
import { ItemSeparator } from "../movie-component/ItemSeparator";
import { POSTER_BASE_URL } from "../../constants/utilities";
import { setWatchlist } from "../../services/api-services";
import Icon from "react-native-vector-icons/Ionicons";
import color from "../../constants/Color";
import { WatchlistContext } from "../../context/watchlist-context/WatchlistContext";
import YoutubeIframe from "react-native-youtube-iframe";
import Font from "../../constants/Font";

interface IHeaderContainerDetails {
  getUpdatedAccState: () => void;
  onPress: () => void;
  postRatingDisable: boolean | { value: number } | undefined;
  ratingVal: number;
  selectedMovie: IMovieDetail | undefined;
  setPostRatingDisable: Dispatch<SetStateAction<boolean | { value: number } | undefined>>;
  setRating: Dispatch<SetStateAction<number>>;
  state: IAccountState;
}

export const HeaderContainerDetails = ({
  getUpdatedAccState,
  onPress,
  postRatingDisable,
  ratingVal,
  selectedMovie,
  setPostRatingDisable,
  setRating,
  state,
}: IHeaderContainerDetails) => {
  const [existWatchlist, setExistWatchlist] = useState<boolean>(state?.watchlist);
  const [playTrailer, setPlayTrailer] = useState<boolean>(false);
  const { getWatchlistData } = useContext(WatchlistContext);

  const handleWatchList = async () => {
    // Get the data first and complementary based on what user click
    const data: IWatchListResponse = await setWatchlist(selectedMovie, !existWatchlist);
    // if response of the data return success.
    if (data.success) {
      setExistWatchlist(!existWatchlist);
      if (existWatchlist) {
        getWatchlistData();
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

  const trailer = selectedMovie?.videos.results.find((vid) => vid.name === "Official Trailer");

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlayTrailer(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlayTrailer((prev) => !prev);
  }, []);
  return (
    <Fragment>
      <View style={{ position: "absolute", paddingHorizontal: "4%", zIndex: 1, top: 40, left: 30 }}>
        <TouchableOpacity onPress={onPress}>
          <Icon name="return-up-back-outline" size={30} color={color.HEART} />
        </TouchableOpacity>
      </View>
      <View style={headerContainerStyle}>
        <Fragment>
          {selectedMovie?.videos && playTrailer ? (
            <View style={{ justifyContent: "center", flexDirection: "column", alignContent: "space-between" }}>
              <YoutubeIframe
                webViewStyle={{ ...youtubePlayerView }}
                height={200}
                width={300}
                play={playTrailer}
                videoId={trailer?.key}
                onChangeState={onStateChange}
              />
            </View>
          ) : (
            <View style={ImagePosterDetail}>
              <Image style={posterImage} source={{ uri: `${POSTER_BASE_URL}original/${selectedMovie?.poster_path}` }} />
            </View>
          )}
        </Fragment>
        <View
          //Play button
          style={
            !playTrailer
              ? playButton
              : {
                  ...playButton,
                  top: 40,
                  right: 10,
                  height: 40,
                  width: 40,
                  backgroundColor: color.TRANSPARENT,
                }
          }>
          <TouchableOpacity onPress={togglePlaying}>
            {playTrailer ? (
              <Icon name="close-outline" style={{ marginLeft: 2 }} size={35} color={color.BLACK} />
            ) : (
              <Icon name="play-outline" style={{ marginLeft: 5 }} size={50} color={color.AMBER} />
            )}
          </TouchableOpacity>
        </View>

        <ItemSeparator height={setHeight(2)} />
        <View style={MovieDetailContainer}>
          <Text style={MovieDetailTitle} numberOfLines={2}>
            {selectedMovie?.title}
          </Text>
          <View style={ContainerRow}>
            <Icon name="heart-sharp" size={15} color="red" />
            <Text style={RatingText}>{selectedMovie?.vote_average.toFixed(1)}</Text>
          </View>
        </View>
        <View style={{ ...smallDetail, flexWrap: "wrap" }}>
          {/* <Text style={{ ...additionalDetailText }}>Genre: </Text> */}
          {selectedMovie?.genres.map((value: Genre, index: number) => (
            <View
              key={index}
              style={{
                width: 70,
                backgroundColor: color.GREEN,
                paddingVertical: 6,
                borderRadius: 10,
                margin: 4,
                alignItems: "center",
              }}>
              <Text key={index} style={{ fontFamily: Font.BOLD, fontWeight: "900", fontSize: 8, color: color.SECONDARY_COLOR }}>
                {value.name}
              </Text>
            </View>
          ))}
        </View>
        <View style={smallDetail}>
          <Text style={additionalDetailText}>Original Language: {selectedMovie?.original_language}</Text>
        </View>
        <View style={smallDetail}>
          <Text style={additionalDetailText}>Release Date: {selectedMovie?.release_date.toString()}</Text>
        </View>
        <View style={smallDetail}>
          <Text style={additionalDetailText}>Status: {selectedMovie?.status.toString()}</Text>
        </View>
        <View style={{ ...smallDetail }}>
          <TouchableOpacity onPress={() => handleWatchList()}>
            <View
              style={{
                ...(existWatchlist
                  ? { ...CardContainer, ...{ backgroundColor: "#2C2C2C", width: 150 } }
                  : { ...CardContainer, ...{ width: 150 } }),
              }}>
              <Icon
                name={existWatchlist ? "bookmark" : "bookmark-outline"}
                size={18}
                color={existWatchlist ? color.EXTRA_LIGHT_GRAY : color.BLACK}
              />
              <Text style={existWatchlist ? { ...normalText, color: color.SECONDARY_COLOR } : normalText}>
                {existWatchlist ? "Added in Watchlist" : "Add to Watchlist"}
              </Text>
            </View>
          </TouchableOpacity>

          <ButtonModalRating
            selectedMovie={selectedMovie}
            getUpdatedAccState={getUpdatedAccState}
            ratingVal={ratingVal}
            setRating={setRating}
            postRatingDisable={postRatingDisable}
            setPostRatingDisable={setPostRatingDisable}
          />
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
  paddingHorizontal: 10,
  paddingVertical: 80,
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
  bottom: "80%",
  borderRadius: 50,
  backgroundColor: color.TRANSPARENT,
  borderColor: color.SECONDARY_COLOR,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
};
