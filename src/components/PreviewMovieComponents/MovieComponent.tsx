import { Alert, ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { CardButtons } from "./CardButton";
import { MovieCard } from "./MovieCard";
import { subHeader, subTitle } from "../../constants/Styling/TextStyleComponent";
import { CardContainer } from "../../constants/Styling/ContainerStyling";
import Color from "../../constants/Color";
import { Genre, MovieType } from "../../screens";
import { RootNavigationProp } from "types";
import { getGenreMovie } from "../../services/APIservices";
import { MovieDetail, Review, accountState } from "../../services";
import { fetchAccountState, fetchMovieDetails, fetchReviewMovieDetails, fetchWatchlist } from "./handlingFunction";

interface IMovieComponent {
  searchInput: string;
  navigation: RootNavigationProp;
  Movie: MovieType[];
}

export const MovieComponent = ({ searchInput, navigation, Movie }: IMovieComponent) => {
  const [genre, setGenre] = useState<Genre[]>([]);

  const handleMovieDetail = async (id: number) => {
    const resDetail: MovieDetail = await fetchMovieDetails(id);
    const resReview: Review[] = await fetchReviewMovieDetails(id);
    const resFetchState: accountState = await fetchAccountState(id);

    if (resDetail !== undefined && resReview !== undefined && resFetchState !== undefined) {
      //From api service
      navigation.push("DetailScreen", { item: resDetail, review: resReview, state: resFetchState });
    } else {
      // alert {you dont have data }
      Alert.alert("getDetails undefined. something wrong somewhere");
    }
  };

  const handleWatchList = async () => {
    const resWatchlist = await fetchWatchlist();
    console.log("movie in the watchlist", resWatchlist);
    if (resWatchlist !== undefined) {
      navigation.navigate("WatchListScreen", { resWatchlist: resWatchlist });
    }
  };

  useEffect(() => {
    const fetchGenre = async (): Promise<void> => {
      const responseGenre: Genre[] = await getGenreMovie();
      setGenre(responseGenre);
    };

    fetchGenre().catch(console.error);
  }, []);

  return (
    <ScrollView contentContainerStyle={container}>
      <View style={headerContainer}>
        <View style={headerSubtitle}>
          <Text style={subHeader}> Now Playing </Text>
        </View>
        <TouchableWithoutFeedback onPress={handleWatchList}>
          <View style={[CardContainer, { width: "30%", backgroundColor: Color.HEART }]}>
            <Text style={{ ...subTitle, color: Color.WHITE }}>Watch List</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <CardButtons Genre={genre} />
      <MovieCard handleMovieDetail={handleMovieDetail} MovieData={Movie} keyword={searchInput} navigation={navigation} />
    </ScrollView>
  );
};

const container: ViewStyle = {
  flex: 1,
};
const headerContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingVertical: 10,
};

const headerSubtitle: ViewStyle = {
  paddingBottom: 10,
  paddingTop: 10,
};
