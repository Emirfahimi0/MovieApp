import { Text, TextStyle, View, ViewStyle } from "react-native";
import React, { FunctionComponent } from "react";
import { CardContainer } from "../../constants/Styling/ContainerStyling";
import { genreText } from "../../constants/Styling/TextStyleComponent";
import { Genre } from "../../screens";
import { listGenres } from "../../Context/GlobalState";

// get dimension of current screen

interface IGenreCardProps {
  genre: Genre;
  isSelected: ViewStyle;
  selectedText: TextStyle;
}

export const GenreCard: FunctionComponent<IGenreCardProps> = ({ genre, isSelected, selectedText }: IGenreCardProps) => {
  return (
    <View style={{ ...CardContainer, ...isSelected }}>
      <Text style={{ ...genreText, ...selectedText }}>{genre.name}</Text>
    </View>
  );
};
