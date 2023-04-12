import { ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import React from "react";
import { CardButtons } from "./CardButton";
import { MovieCard } from "./MovieCard";
import { subHeader, subTitle } from "../../constants/style-component/TextStyleComponent";
import { CardContainer } from "../../constants/style-component/ContainerStyling";
import Color from "../../constants/color";
import { Genre, MovieType } from "../../screens";
import { RootNavigationProp } from "types/global";

interface IMovieComponent {
  searchInput: string;
  navigation: RootNavigationProp;
  Movie: MovieType[];
  Genres: Genre[];
  handleWatchList: () => {};
  handleMovieDetail: (id: number) => {};
}

export const MovieComponent = ({ searchInput, Movie, Genres, handleMovieDetail, handleWatchList }: IMovieComponent) => {
  return (
    <ScrollView contentContainerStyle={container}>
      <View style={headerContainer}>
        <View style={headerSubtitle}>
          <Text style={subHeader}> Now Playing </Text>
        </View>
        <TouchableWithoutFeedback onPress={handleWatchList}>
          <View style={{ ...CardContainer, width: "30%", backgroundColor: Color.HEART }}>
            <Text style={{ ...subTitle, color: Color.WHITE }}>Watch List</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <CardButtons Genre={Genres} />
      <MovieCard handleMovieDetail={handleMovieDetail} MovieData={Movie} keyword={searchInput} />
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
