import { ScrollView, Text, View, ViewStyle } from "react-native";
import React from "react";
import { CardButtons } from "./CardButton";
import { MovieCard } from "./MovieCard";
import { subHeader } from "../../constants/style-component/textComponent";
import { Genre, IDetailsMovie, MovieType } from "../../screens";
import color from "../../constants/color";

interface IHomeScreenContainer {
  searchInput: string;
  Movie: MovieType[];
  Genres: Genre[];
  handleMovieDetail: (id: number) => Promise<IDetailsMovie>;
}

export const HomeScreenContainer = ({ searchInput, Movie, Genres, handleMovieDetail }: IHomeScreenContainer) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          backgroundColor: color.SECONDARY_COLOR,
          shadowColor: color.LIGHT_GRAY,
          alignContent: "center",
          shadowRadius: 10,
          elevation: 3,
          shadowOpacity: 1.0,
          shadowOffset: { width: 0, height: -3 },
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
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
