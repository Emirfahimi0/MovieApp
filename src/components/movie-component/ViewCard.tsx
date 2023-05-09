import { Text, TextStyle, View, ViewStyle } from "react-native";
import React, { FunctionComponent } from "react";
import { CardContainer } from "../../constants/style-component/viewComponent";
import { normalText } from "../../constants/style-component/textComponent";

// get dimension of current screen

interface IGenreCardProps {
  genre: TGenre;
  isSelected: ViewStyle;
  selectedText: TextStyle;
}

export const ViewCard: FunctionComponent<IGenreCardProps> = ({ genre, isSelected, selectedText }: IGenreCardProps) => {
  return (
    <View style={{ ...CardContainer, ...isSelected }}>
      <Text style={{ ...normalText, ...selectedText }}>{genre.name}</Text>
    </View>
  );
};
