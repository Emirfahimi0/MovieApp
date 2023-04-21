import { FlatList, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { useContext, useState } from "react";
import { GenreCard } from "./GenreCard";
import { ItemSeparator } from "./ItemSeparator";
import COLORS from "../../constants/color";
import { MovieContext } from "../../context/movie-context/MovieContext";
import { Genre } from "../../services";
import color from "../../constants/color";
import { setHeight } from "../../constants/style-component/viewComponent";

interface ICardButtons {
  data: Genre[];
}

export const ListCardButtons = ({ data }: ICardButtons) => {
  const [active, setActive] = useState<number>(0);
  const { filterMovieByGenre } = useContext(MovieContext);
  return (
    <View
      style={{
        marginLeft: 32,
        paddingVertical: 24,
        width: "85%",
        height: setHeight(10),
      }}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item, index }) => {
          const handleActive = () => {
            setActive(index);
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
