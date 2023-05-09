import { Text, TextStyle, View, ViewStyle } from "react-native";
import React, { FunctionComponent } from "react";
import { CardContainer } from "../../constants/style-component/viewComponent";
import { normalText } from "../../constants/style-component/textComponent";

// get dimension of current screen

interface IGenreCardProps {
  data: TGenre;
  isSelected: ViewStyle;
  selectedText: TextStyle;
}

export const ViewCard: FunctionComponent<IGenreCardProps> = ({ data, isSelected, selectedText }: IGenreCardProps) => {
  return (
    <View style={{ ...CardContainer, ...isSelected }}>
      <Text style={{ ...normalText, ...selectedText }}>{data.name}</Text>
    </View>
  );
};
