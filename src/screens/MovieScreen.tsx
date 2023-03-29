import { StyleSheet, TextInput, View } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { movieList } from "../dummyData";
import { MovieComponent } from "../components/ListPreview/movieComponent";
import { IMovie } from ".";

const MovieScreen = () => {
  // always use set function
  const [movie, setMovie] = useState<IMovie[]>([movieList]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const urlMovieList = "https://api.themoviedb.org/3/movie/550?api_key=c8dd41ae609200a4c9aef25e9654494a";

    axios.get(`${urlMovieList}/1`).then((response) => {
      setMovie(response.data);
      console.log(movie);
      fetchMovieData();
    });
  }, []);

  const fetchMovieData = () => {
    setMovie([...movieList.results]);

    console.log("List of movie should be", movie);
  };
  return (
    <Fragment>
      <View style={styleView.container}>
        <View style={styleView.appContainer}>
          <TextInput value={searchText} onChangeText={(text) => setSearchText(text)} style={styleView.Input} placeholder="Search" />
        </View>
      </View>
      <MovieComponent />
    </Fragment>
  );
};

export default MovieScreen;

const styleView = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
  },
  appContainer: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#DCDFDE",
    borderRadius: 10,
    alignItems: "center",
  },
  Input: {
    fontSize: 15,
    width: "100%",
  },
});
