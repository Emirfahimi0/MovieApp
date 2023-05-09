import { Image, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { Dispatch, Fragment, SetStateAction, useCallback, useState } from "react";
import {
  CardContainer,
  ContainerRow,
  ImagePosterDetail,
  MovieDetailContainer,
  headerContainerStyle,
  posterImage,
  setHeight,
  smallDetail,
  youtubePlayerView,
} from "../../constants/style-component/viewComponent";
import { additionalDetailText, normalText, MovieDetailTitle, RatingText } from "../../constants/style-component/textComponent";
import { ButtonModalRating } from "./ButtonModalRating";
import { ItemSeparator } from "../movie-component/ItemSeparator";
import { POSTER_BASE_URL } from "../../constants/utilities";
import Icon from "react-native-vector-icons/Ionicons";
import color from "../../constants/Color";
import YoutubeIframe from "react-native-youtube-iframe";
import Font from "../../constants/Font";
import { ToastMessage } from "../features/ToastMessage";

interface IHeaderContainerDetails {
  onPress: () => void;
  postRatingDisable: boolean | { value: number } | undefined;
  ratingVal: number;
  handleWatchlist: () => void;
  selectedMovie: IMovieDetail | undefined;
  existWatchlist: boolean;
  setPostRatingDisable: Dispatch<SetStateAction<boolean | { value: number } | undefined>>;
  setRating: Dispatch<SetStateAction<number>>;
}

export const HeaderContainerDetails = ({
  onPress,
  postRatingDisable,
  ratingVal,
  selectedMovie,
  setPostRatingDisable,
  setRating,
  handleWatchlist,
  existWatchlist,
}: IHeaderContainerDetails) => {
  const [playTrailer, setPlayTrailer] = useState<boolean>(false);
  const trailer = selectedMovie?.videos.results.find((vid) => vid.name === "Official Trailer");

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlayTrailer(false);
      ToastMessage("success", "Finished", "video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlayTrailer((prev) => !prev);
  }, []);

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
  return (
    <Fragment>
      <View style={{ position: "absolute", zIndex: 1, top: 8, left: 8 }}>
        <TouchableOpacity onPress={onPress}>
          <Icon name="chevron-back-outline" size={30} color={color.ACTIVE} />
        </TouchableOpacity>
      </View>
      <View style={{ ...headerContainerStyle, paddingBottom: "3%", paddingVertical: 0 }}>
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
        <View style={{ ...MovieDetailContainer, flexDirection: "column", flex: 1 }}>
          <Text style={MovieDetailTitle} numberOfLines={2}>
            {selectedMovie?.title}
          </Text>
          <View style={{ ...ContainerRow, paddingTop: 8 }}>
            <Icon name="heart-sharp" size={15} color="red" />
            <Text style={RatingText}>{selectedMovie?.vote_average.toFixed(1)}</Text>
          </View>
        </View>
        <View
          style={{
            ...smallDetail,
            flexDirection: "row",
            flexGrow: 1,
            flexWrap: "wrap",
          }}>
          {selectedMovie?.genres.map((value: TGenre, index: number) => (
            <View
              key={index}
              style={{
                backgroundColor: color.PRIMARY_COLOR,
                padding: 4,
                margin: 4,
                borderRadius: 5,
              }}>
              <Text key={index} style={{ fontFamily: Font.BOLD, fontSize: 12, color: color.SECONDARY_COLOR }}>
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
        <View style={{ ...smallDetail, paddingBottom: 32 }}>
          <TouchableOpacity onPress={handleWatchlist}>
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
            ratingVal={ratingVal}
            setRating={setRating}
            ToastMessage={ToastMessage}
            postRatingDisable={postRatingDisable}
            setPostRatingDisable={setPostRatingDisable}
          />
        </View>
      </View>
    </Fragment>
  );
};
