import { ListCardButtons } from "./ListCardButtons";
import { homeCardContainer, noDataStyle, setWidth } from "../../constants/style-component/viewComponent";
import { ListMovieCards } from "./ListMovieCards";
import { Text, View } from "react-native";
import { subHeader } from "../../constants/style-component/textComponent";
import React, { Fragment, useState } from "react";
import Loader from "../features/Loader";

interface IScreenCardContainer {
  searchInput: string;
  Movie: TMovieType[];
  Genres: TGenre[];
  loading: boolean | undefined;
  handlePressGenre: (item: TGenre, index: number) => void;
  handleMovieDetail: (id: number) => Promise<IDetailsMovie>;
}

type TlistGenre = "Action" | "Comedy" | "Fantasy";
// type TWatchlist = "Favorite" | "To Watch";

export const ScreenCardContainer = ({ searchInput, Movie, Genres, handleMovieDetail, loading, handlePressGenre }: IScreenCardContainer) => {
  const [active, setActive] = useState<number>(0);

  return (
    <Fragment>
      <View
        style={{
          ...homeCardContainer,
        }}>
        <ListCardButtons<TlistGenre> data={Genres} handlePress={handlePressGenre} active={active} setActive={setActive} />
        <View>
          {Object.keys(Movie).length > 0 && active !== undefined ? (
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
