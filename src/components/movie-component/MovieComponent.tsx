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
  handleWatchList: () => {};
  handleMovieDetail: (id: number) => Promise<IDetailsMovie>;
}

export const MovieComponent = ({ searchInput, Movie, Genres, handleMovieDetail, handleWatchList }: IMovieComponent) => {
  const navigation: RootNavigationProp = useNavigation();

  const handleLogOut = async () => {
    //To do
    AsyncStorage.clear();
    navigation.navigate("LoginScreen");
  };
  return (
    <View style={container}>
      <View style={headerContainer}>
        <View style={headerSubtitle}>
          <Text onPress={handleLogOut} style={subHeader}>
            {" "}
            Now Playing{" "}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={handleWatchList}>
          <View style={{ ...CardContainer, width: "30%", backgroundColor: Color.PURPLE }}>
            <Text style={{ ...subTitle, color: Color.WHITE }}>Watch List</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
