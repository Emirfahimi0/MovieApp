import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = () => {
  return (
    <View style={[styles.activityContainer, styles.horizontal]}>
      <ActivityIndicator size="large" color="#43E382" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
