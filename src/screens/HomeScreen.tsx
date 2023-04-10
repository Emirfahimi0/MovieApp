import { getTrendingmovie } from "../services/APIservices";
import { MovieComponent } from "../components/PreviewMovieComponents/MovieComponent";
import { SearchBarComponent } from "../components/PreviewMovieComponents/SearchBar";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { Genre, MovieType } from ".";

const HomeScreen = ({ navigation }) => {
  // always use set function
  const [searchText, setSearchText] = useState<string>("");
  const { Movie, addTrendingMovies } = useContext(GlobalContext);

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      const responseApiMovie: MovieType[] = await getTrendingmovie();
      addTrendingMovies(responseApiMovie);

      // call the function
    };

    getMovies().catch(console.error);
  }, []);

  return (
    <Fragment>
      <SearchBarComponent searchText={searchText} setSearchText={setSearchText} />
      <MovieComponent searchInput={searchText} navigation={navigation} Movie={Movie} />
    </Fragment>
  );
};

export default HomeScreen;
