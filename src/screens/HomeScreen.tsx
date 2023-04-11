import { getGenreMovie, getTrendingmovie } from "../services/apiServices";
import { MovieComponent } from "../components/PreviewMovieComponents/MovieComponent";
import { SearchBarComponent } from "../components/PreviewMovieComponents/SearchBar";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { Genre, MovieType } from ".";
import { ScrollView } from "react-native";

const HomeScreen = ({ navigation }) => {
  // always use set function
  const [searchText, setSearchText] = useState<string>("");
  const { Movie, addTrendingMovies, getGenre } = useContext(GlobalContext);
  const [genre, setGenre] = useState<Genre[]>([]);

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      const responseApiMovie: MovieType[] = await getTrendingmovie();
      addTrendingMovies(responseApiMovie);
    };
    const fetchGenre = async (): Promise<void> => {
      const responseGenre: Genre[] = await getGenreMovie();
      console.log("from context", responseGenre);

      setGenre(responseGenre);
      getGenre(responseGenre);
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
