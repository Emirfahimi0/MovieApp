import { FlatList, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { ItemSeparator } from "../../components/itemSeparator/ItemSeparator";
import { CardContainer, setHeight, normalText, color } from "../../constants";

interface ICard<TGenre> {
  id: string;
  value: TGenre;
}

interface ICardButtons {
  data: TGenre[];
  handlePress: (item: TGenre, index: number) => void;
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

export const ListCardButtons = ({ data, handlePress, active, setActive }: ICardButtons) => {
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
            active === index ? { backgroundColor: color.PRIMARY_COLOR } : { backgroundColor: color.BASIC_BACKGROUND };
          const selectedText: TextStyle = active === index ? { color: color.SECONDARY_COLOR, fontWeight: "800" } : { color: color.BLACK };

          return (
            <TouchableOpacity onPress={handleActive} key={index}>
              <View style={{ ...CardContainer, ...selectedButton }}>
                <Text style={{ ...normalText, ...selectedText }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
