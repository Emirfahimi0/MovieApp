import { ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import React from "react";
import { CardButtons } from "./CardButton";
import { MovieCard } from "./MovieCard";
import { subHeader, subTitle } from "../../constants/style-component/textComponent";
import { CardContainer } from "../../constants/style-component/viewComponent";
import Color from "../../constants/color";
import { Genre, IDetailsMovie, MovieType } from "../../screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootNavigationProp } from "types/global";
import { useNavigation } from "@react-navigation/native";

interface IMovieComponent {
  searchInput: string;
  Movie: MovieType[];
  Genres: Genre[];
  handleMovieDetail: (id: number) => Promise<IDetailsMovie>;
}

export const MovieComponent = ({ searchInput, Movie, Genres, handleMovieDetail }: IMovieComponent) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <CardButtons Genre={Genres} />
        <ScrollView horizontal={true}>
          {Object.keys(Movie).length > 0 ? (
            <MovieCard handleMovieDetail={handleMovieDetail} MovieData={Movie} keyword={searchInput} />
          ) : (
            <View style={{ ...noMovieStyle }}>
              <Text style={subHeader}> No Movie</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const noMovieStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: "500%",
};
