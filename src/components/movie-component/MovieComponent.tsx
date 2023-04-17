import { ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import React from "react";
import { CardButtons } from "./CardButton";
import { MovieCard } from "./MovieCard";
import { subHeader, subTitle } from "../../constants/style-component/textComponent";
import { CardContainer } from "../../constants/style-component/viewComponent";
import Color from "../../constants/color";
import { Genre, IDetailsMovie, MovieType } from "../../screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootNavigationProp } from "types/global";
import { useNavigation } from "@react-navigation/native";

interface IMovieComponent {
  searchInput: string;
  Movie: MovieType[];
  Genres: Genre[];
  handleMovieDetail: (id: number) => Promise<IDetailsMovie>;
}

export const MovieComponent = ({ searchInput, Movie, Genres, handleMovieDetail }: IMovieComponent) => {
  const navigation: RootNavigationProp = useNavigation();

  const handleLogOut = async () => {
    //To do
    AsyncStorage.clear();
    navigation.popToTop();
  };
  return (
    <>
      <View style={container}>
        <View style={headerContainer}></View>
        <CardButtons Genre={Genres} />
        <ScrollView horizontal={true}>
          {Object.keys(Movie).length > 0 ? (
            <MovieCard handleMovieDetail={handleMovieDetail} MovieData={Movie} keyword={searchInput} />
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center", width: "500%" }}>
              <Text style={subHeader}> No Movie</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const container: ViewStyle = {
  flex: 1.5,
};
const headerContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
  paddingHorizontal: 20,
  paddingVertical: 30,
};

const headerSubtitle: ViewStyle = {
  paddingBottom: 10,
  paddingTop: 10,
};
