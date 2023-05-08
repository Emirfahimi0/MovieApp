import { FlatList, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { ViewCard } from "./ViewCard";
import { ItemSeparator } from "./ItemSeparator";
import color from "../../constants/Color";
import { setHeight } from "../../constants/style-component/viewComponent";

interface ICard<TGenre> {
  id: string;
  value: TGenre;
}

interface ICardButtons<T> {
  data: ICard<T>[];
  handlePress: (item: T, index: number) => void;
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

export const ListCardButtons = <T extends string>({ data, handlePress, active, setActive }: ICardButtons<T>) => {
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
            handlePress(item, index);
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
