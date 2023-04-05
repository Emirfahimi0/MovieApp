import { ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { CardButtons } from "./CardButton";
import { MovieCard } from "./MovieCard";
import { subHeader, subTitle } from "../../constants/Styling/TextStyleComponent";
import { CardContainer } from "../../constants/Styling/ContainerStyling";
import Color from "../../constants/Color";
import axios from "axios";
import { Genre, MovieType } from "../../screens";
import { RootNavigationProp } from "types";

interface IMovieComponent {
  searchInput: string;
  navigation: RootNavigationProp;
  Movie: MovieType;
}

export const MovieComponent = ({ searchInput, navigation, Movie }: IMovieComponent) => {
  const [genre, setGenre] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchMovieGenre = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=c8dd41ae609200a4c9aef25e9654494a&language=en-US `, {
          responseType: "json",
        })
        .then(function (response) {
          const tempGenre = response.data.genres;
          setGenre(response.data.genres);
          return tempGenre;

          //setGenre([...response.data.genres]);
          //return response.data.genres;
        });
    };

    // call the function
    fetchMovieGenre().catch(console.error);
  }, []);

  return (
    <ScrollView contentContainerStyle={container}>
      <View style={headerContainer}>
        <View style={headerSubtitle}>
          <Text style={subHeader}> Now Playing </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.push("WatchListScreen")}>
          <View style={[CardContainer, { width: "30%", backgroundColor: Color.HEART }]}>
            <Text style={{ ...subTitle, color: Color.WHITE }}>Watch List</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <CardButtons genres={genre} />
      <MovieCard MovieData={Movie} keyword={searchInput} navigation={navigation} />
    </ScrollView>
  );
};

const container: ViewStyle = {
  flex: 1,
};
const headerContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingVertical: 10,
};

const headerSubtitle: ViewStyle = {
  paddingBottom: 10,
  paddingTop: 10,
};
