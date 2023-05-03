import { ListCardButtons } from "./ListCardButtons";
import { homeCardContainer, noDataStyle, setWidth } from "../../constants/style-component/viewComponent";
import { ListMovieCards } from "./ListMovieCards";
import { Text, View } from "react-native";
import { subHeader } from "../../constants/style-component/textComponent";
import React, { Fragment } from "react";
import Loader from "../features/Loader";

interface IScreenCardContainer {
  searchInput: string;
  Movie: TMovieType[];
  Genres: TGenre[];
  loading: boolean | undefined;
  handlePressGenre: (item: TGenre, index: number) => void;
  handleMovieDetail: (id: number) => Promise<IDetailsMovie>;
}

type TOtherGenre = "Action" | "Comedy" | "Fantasy";
type TWatchlist = "Favorite" | "To Watch";

export const ScreenCardContainer = ({ searchInput, Movie, Genres, handleMovieDetail, loading, handlePressGenre }: IScreenCardContainer) => {
  return (
    <Fragment>
      <View
        style={{
          ...homeCardContainer,
        }}>
        <ListCardButtons<TOtherGenre> data={Genres} handlePress={handlePressGenre} />
        <View>
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
        </View>
      </View>
    </Fragment>
  );
};
