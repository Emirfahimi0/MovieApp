import { FlatList, Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { ItemSeparator } from "../movie-component/ItemSeparator";
import { normalText } from "../../constants/style-component/textComponent";
import { POSTER_BASE_URL } from "../../constants/utilities";
import { setHeight, setWidth } from "../../constants/style-component/viewComponent";
import Color from "../../constants/Color";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";

const providerLogo: FastImageStyle = {
  width: setWidth(42),
  borderBottomLeftRadius: 0,
  backgroundColor: Color.AMBER,
  borderTopRightRadius: 0,
  height: setHeight(8),
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",
  aspectRatio: 1,
};

const providerView: ViewStyle = {
  height: setHeight(12),
  borderRadius: 30,
  backgroundColor: Color.EXTRA_LIGHT_GRAY,
  padding: 8,
  marginVertical: 2,
  elevation: 3,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  alignContent: "center",
  width: setWidth(42),
};
const ProviderCardList = ({ selectedProviderMovie }) => {
  const [active, setActive] = useState<number>();
  return (
    <View style={{ marginLeft: 32, paddingVertical: 24, width: "85%" }}>
      <FlatList
        data={selectedProviderMovie["watch/providers"].results.AT.buy}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item, index }) => {
          const handleActive = () => {
            setActive(index);

            //filterMovieByGenre(item, index);
          };
          const selectedButton: ViewStyle =
            active === index ? { backgroundColor: Color.ACTIVE } : { backgroundColor: Color.BASIC_BACKGROUND };
          const selectedText: TextStyle = active === index ? { color: Color.SECONDARY_COLOR, fontWeight: "800" } : { color: Color.BLACK };

          return (
            <TouchableOpacity onPress={handleActive} key={index}>
              <View style={selectedButton}>
                <Text style={{ ...selectedText }}>{item.provider_name}</Text>
                <FastImage source={{ uri: `${POSTER_BASE_URL}original/${item.logo_path}` }} style={providerLogo} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ProviderCardList;
