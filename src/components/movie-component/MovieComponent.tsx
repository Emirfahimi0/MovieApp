import { ScrollView, Text, View, ViewStyle } from "react-native";
import React from "react";
import { CardButtons } from "./CardButton";
import { MovieCard } from "./MovieCard";
import { subHeader } from "../../constants/style-component/textComponent";
import { Genre, IDetailsMovie, MovieType } from "../../screens";

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
