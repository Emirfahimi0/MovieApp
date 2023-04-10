import { TextInput, View, ViewStyle } from "react-native";
import React from "react";
import { SearchBar } from "../../constants/Styling/ContainerStyling";
import Icon from "react-native-vector-icons/Ionicons";
import Color from "../../constants/Color";
import { InputSearcbBar } from "../../constants/Styling/TextStyleComponent";

export const SearchBarComponent = ({ searchText, setSearchText }) => {
  return (
    <View style={styleView}>
      <View style={SearchBar}>
        <Icon iconStyle={{ marginRight: 10 }} name="search" size={22} color={Color.AMBER} />
        <View style={{ width: "100%" }}>
          <TextInput value={searchText} onChangeText={(text) => setSearchText(text)} style={InputSearcbBar} placeholder="Search" />
        </View>
      </View>
    </View>
  );
};

const styleView: ViewStyle = {
  paddingBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 50,
  width: "100%",
};
