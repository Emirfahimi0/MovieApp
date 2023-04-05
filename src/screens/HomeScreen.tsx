import { getTrendingmovie } from "../services/APIservices";
import { MovieComponent } from "../components/PreviewMovieComponents/MovieComponent";
import { SearchBarComponent } from "../components/PreviewMovieComponents/SearchBar";
import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "../constants/utilities";
import { IMovie, MovieType } from ".";
import { GlobalContext } from "../Context/GlobalState";

const HomeScreen = ({ navigation }) => {
  // always use set function
  const [searchText, setSearchText] = useState<string>("");
  const [Movie, setMovie] = useState<MovieType>();
  const { getMovies } = useContext(GlobalContext);

  useEffect(() => {
    const fetchMovieData = async () => {
      await axios.get(ENDPOINTS.GET_TRENDING, { responseType: "json" }).then(function (response) {
        //console.log("Movie ", response.data.results);
        setMovie(response.data.results);
        return response.data.results;
      });
    };
    getMovies;
    console.log("Store Movie context", getTrendingmovie);
    // call the function
    fetchMovieData().catch(console.error);
  }, []);

  return (
    <Fragment>
      <SearchBarComponent searchText={searchText} setSearchText={setSearchText} />
      <MovieComponent searchInput={searchText} navigation={navigation} Movie={Movie} />
    </Fragment>
  );
};

export default HomeScreen;
