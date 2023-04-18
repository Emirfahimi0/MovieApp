import { CardButtons } from "./CardButton";
import { Genre, IDetailsMovie, TMovieType } from "../../screens";
import { homeCardContainer, noDataStyle } from "../../constants/style-component/viewComponent";
import { MovieCard } from "./MovieCard";
import { ScrollView, Text, View } from "react-native";
import { subHeader } from "../../constants/style-component/textComponent";
import React, { Fragment } from "react";

interface IHomeScreenContainer {
  searchInput: string;
  Movie: TMovieType[];
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
            <View style={{ ...noDataStyle }}>
              <Text style={subHeader}> No Movie</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Fragment>
  );
};
