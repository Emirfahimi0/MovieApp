import { FlatList, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { useContext, useState } from "react";
import { GenreCard } from "./GenreCard";
import { ItemSeparator } from "./ItemSeparator";
import COLORS from "../../constants/color";
import { MovieContext } from "../../context/movie-context/MovieContext";

export const CardButtons = ({ Genre }) => {
  const [active, setActive] = useState<number>(0);
  const { filterMovieByGenre } = useContext(MovieContext);
  return (
    <View style={{ marginLeft: 32, paddingVertical: 24, width: "85%" }}>
      <FlatList
        data={Genre}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item, index }) => {
          const handleActive = () => {
            setActive(index);
            console.log("genre item", item);
            filterMovieByGenre(item, index);
          };
          const selectedButton: ViewStyle =
            active === index ? { backgroundColor: COLORS.ACTIVE } : { backgroundColor: COLORS.BASIC_BACKGROUND };
          const selectedText: TextStyle = active === index ? { color: COLORS.SECONDARY_COLOR, fontWeight: "800" } : { color: COLORS.BLACK };

          return (
            <TouchableOpacity onPress={handleActive} key={index}>
              <GenreCard genre={item} isSelected={selectedButton} selectedText={selectedText} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
