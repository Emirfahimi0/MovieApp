import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { CardButtons } from "./cardButton";
import Font from "../../constants/Font";

export const MovieComponent = () => {
  const genre = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-fi"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}> Now Playing </Text>
        <TouchableWithoutFeedback>
          <Text style={styles.headerSubTitle}>Show All</Text>
        </TouchableWithoutFeedback>
      </View>
      <CardButtons genres={genre} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    fontFamily: Font.EXTRA_BOLDItalic,
  },
  headerSubTitle: {
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: Font.REGULAR,
    color: "#77DA0E",
  },
});
