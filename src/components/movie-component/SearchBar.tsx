import { TextInput, View, ViewStyle } from "react-native";
import React from "react";
import { SearchBar, setHeight } from "../../constants/style-component/ContainerStyling";
import Icon from "react-native-vector-icons/Ionicons";
import Color from "../../constants/color";
import { InputSearcbBar } from "../../constants/style-component/TextStyleComponent";

export const SearchBarComponent = ({ searchText, setSearchText }) => {
  return (
    <View style={styleView}>
      <View style={SearchBar}>
        <Icon iconStyle={{ marginRight: 10 }} name="search" size={22} color={Color.GREEN} />
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
  paddingTop: setHeight(7),
  width: "100%",
};
