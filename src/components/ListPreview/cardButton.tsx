import { FlatList, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { useState } from "react";
import { GenreCard } from "./genreCard";
import { ItemSeparator } from "./ItemSeparator";
import COLORS from "../../constants/Color";

export const CardButtons = ({ genres }) => {
  const [active, setActive] = useState<number>(0);
  return (
    <View>
      <FlatList
        data={genres}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item, index }) => {
          const handleActive = () => {
            if (item === "All") {
              console.log(item);
              setActive(index);
            } else if (item === "Action") {
              setActive(index);
            } else if (item === "Comedy") {
              setActive(index);
            } else if (item === "Romance") {
              setActive(index);
            } else if (item === "Horror") {
              setActive(index);
            } else setActive(index);
          };
          const selectedButton: ViewStyle = active === index ? { backgroundColor: COLORS.ACTIVE } : { backgroundColor: COLORS.WHITE };
          const selectedText: TextStyle = active === index ? { color: COLORS.WHITE } : { color: COLORS.BLACK };

          return (
            <TouchableOpacity onPress={handleActive}>
              <GenreCard genre={item} isSelected={selectedButton} selectedText={selectedText} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
