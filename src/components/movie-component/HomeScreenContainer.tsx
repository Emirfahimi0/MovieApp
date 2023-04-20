import { ListCardButtons } from "./CardButton";
import { Genre, IDetailsMovie, TMovieType } from "../../screens";
import { homeCardContainer, noDataStyle } from "../../constants/style-component/viewComponent";
import { ListMovieCards } from "./ListMovieCards";
import { ScrollView, Text, View } from "react-native";
import { subHeader } from "../../constants/style-component/textComponent";
import React, { Fragment } from "react";

interface IScreenCardContainer {
  searchInput: string;
  Movie: TMovieType[];
  Genres: Genre[];
  handleMovieDetail: (id: number) => Promise<IDetailsMovie>;
}

export const ScreenCardContainer = ({ searchInput, Movie, Genres, handleMovieDetail }: IScreenCardContainer) => {
  return (
    <Fragment>
      <View
        style={{
          ...homeCardContainer,
        }}>
        <ListCardButtons Genre={Genres} />
        <ScrollView horizontal={true}>
          {Object.keys(Movie).length > 0 ? (
            <ListMovieCards handleMovieDetail={handleMovieDetail} MovieData={Movie} keyword={searchInput} />
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
