import { Dimensions, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { FunctionComponent } from "react";
import COLORS from "../../constants/Color";
import Font from "../../constants/Font";
const { height, width } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;

interface IGenreCardProps {
  genre: string[];
  isSelected: ViewStyle;
  selectedText: TextStyle;
}

export const GenreCard: FunctionComponent<IGenreCardProps> = ({ genre, isSelected, selectedText }: IGenreCardProps) => {
  return (
    <View style={{ ...styles.container, ...isSelected }}>
      <Text style={{ ...styles.genreText, ...selectedText }}>{genre}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#DFE0E0",
    paddingVertical: 8,
    elevation: 3,
    marginVertical: 2,
    width: setWidth(25),
  },
  genreText: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: Font.BOLD,
    color: COLORS.BLACK,
  },
});
