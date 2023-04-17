import { ScrollView, Text, View, ViewStyle } from "react-native";
import React, { Fragment } from "react";
import { CardButtons } from "./CardButton";
import { MovieCard } from "./MovieCard";
import { subHeader } from "../../constants/style-component/textComponent";
import { Genre, IDetailsMovie, MovieType } from "../../screens";
import { homeCardContainer } from "../../constants/style-component/viewComponent";

interface IHomeScreenContainer {
  searchInput: string;
  Movie: MovieType[];
  Genres: Genre[];
  handleMovieDetail: (id: number) => Promise<IDetailsMovie>;
}

export const HomeScreenContainer = ({ searchInput, Movie, Genres, handleMovieDetail }: IHomeScreenContainer) => {
  return (
    <Fragment>
      <View
        style={{
          ...homeCardContainer,
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
    </Fragment>
  );
};

const noMovieStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: "500%",
};
