import { FlatList, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { useContext, useState } from "react";
import { ViewCard } from "./ViewCard";
import { ItemSeparator } from "./ItemSeparator";
import { MovieContext } from "../../context/movie-context/MovieContext";
import { Genre } from "../../services";
import color from "../../constants/Color";
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
            active === index ? { backgroundColor: color.ACTIVE } : { backgroundColor: color.BASIC_BACKGROUND };
          const selectedText: TextStyle = active === index ? { color: color.SECONDARY_COLOR, fontWeight: "800" } : { color: color.BLACK };

          return (
            <TouchableOpacity onPress={handleActive} key={index}>
              <ViewCard genre={item} isSelected={selectedButton} selectedText={selectedText} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
