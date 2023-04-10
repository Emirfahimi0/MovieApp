import { getGenreMovie, getTrendingmovie } from "../services/APIservices";
import { MovieComponent } from "../components/PreviewMovieComponents/MovieComponent";
import { SearchBarComponent } from "../components/PreviewMovieComponents/SearchBar";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { Genre, MovieType } from ".";
import { ScrollView } from "react-native";

const HomeScreen = ({ navigation }) => {
  // always use set function
  const [searchText, setSearchText] = useState<string>("");
  const { Movie, addTrendingMovies } = useContext(GlobalContext);
  const [genre, setGenre] = useState<Genre[]>([]);

  const fetchGenre = async (): Promise<void> => {
    const responseGenre: Genre[] = await getGenreMovie();
    setGenre(responseGenre);
  };
  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      const responseApiMovie: MovieType[] = await getTrendingmovie();
      addTrendingMovies(responseApiMovie);
    };
    fetchGenre().catch(console.error);
    getMovies().catch(console.error);
  }, []);

  return (
    <Fragment>
      <SearchBarComponent searchText={searchText} setSearchText={setSearchText} />
      <ScrollView>
        <MovieComponent searchInput={searchText} navigation={navigation} Movie={Movie} Genres={genre} />
      </ScrollView>
    </Fragment>
  );
};

export default HomeScreen;
