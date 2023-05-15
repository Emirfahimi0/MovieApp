import React from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import color from "../../constants/Color";

const Loader = () => {
  return (
    <View style={{ ...activityContainer, flex: 1 }}>
      <ActivityIndicator size="large" color={color.GREEN} />
    </View>
  );
};

export default Loader;

const activityContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  flexDirection: "row",
  padding: 16,
};
