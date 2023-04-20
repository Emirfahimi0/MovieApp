import React from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import color from "../../constants/color";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Loader = () => {
  return (
    <View style={{ ...activityContainer, padding: "50%" }}>
      <ActivityIndicator size="large" color={color.ACTIVE} />
    </View>
  );
};

export default Loader;

const activityContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  flexDirection: "row",
  padding: 10,
};
