import { ListCardButtons } from "./CardButton";
import { Genre, IDetailsMovie, TMovieType } from "../../screens";
import { homeCardContainer, noDataStyle, setWidth } from "../../constants/style-component/viewComponent";
import { ListMovieCards } from "./ListMovieCards";
import { ScrollView, Text, View } from "react-native";
import { subHeader } from "../../constants/style-component/textComponent";
import React, { Fragment } from "react";
import Loader from "../features/Loader";

interface IScreenCardContainer {
  searchInput: string;
  Movie: TMovieType[];
  Genres: Genre[];
  loading: boolean;
  handleMovieDetail: (id: number) => Promise<IDetailsMovie>;
}

export const ScreenCardContainer = ({ searchInput, Movie, Genres, handleMovieDetail, loading }: IScreenCardContainer) => {
  return (
    <Fragment>
      <View
        style={{
          ...homeCardContainer,
        }}>
        <ListCardButtons data={Genres} />
        <ScrollView horizontal={true}>
          {Object.keys(Movie).length > 0 ? (
            <ListMovieCards handleMovieDetail={handleMovieDetail} MovieData={Movie} keyword={searchInput} />
          ) : loading ? (
            <View style={{ ...noDataStyle }}>
              <Loader />
            </View>
          ) : (
            <View style={{ ...noDataStyle, width: setWidth(100) }}>
              <Text style={subHeader}> No Movie</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Fragment>
  );
};
