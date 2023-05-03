import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { FlatList, Pressable, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { normalText, primaryTitle } from "../../constants/style-component/textComponent";
import color from "../../constants/Color";

interface ICustomDropDown {
  movieType: Array<{ label: string; value: string }>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setSelectedMovieType: Dispatch<SetStateAction<string>>;
}

const CustomDropDown = ({ movieType, setSelectedMovieType, value, setValue }: ICustomDropDown) => {
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(movieType);

  const searchRef = useRef(null);
  const onSearch = (search: string) => {
    if (search !== "") {
      let tempData = data.filter((item) => {
        // return item that index
        return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(movieType);
    }
  };

  const pressStyle: ViewStyle = {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1.6,
    borderColor: color.PURPLE,
    alignSelf: "center",
    marginTop: 32,
    backgroundColor: color.PRIMARY_COLOR,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  };

  return (
    <View style={{}}>
      <Pressable
        style={{
          ...pressStyle,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{ ...primaryTitle, color: color.SECONDARY_COLOR }}>{value === "" ? "Select movie type" : value}</Text>
        {clicked ? (
          <Fragment>
            <Icon name="duplicate-outline" size={20} color={color.SECONDARY_COLOR} />
          </Fragment>
        ) : (
          <Icon name="arrow-down-circle-outline" size={20} color={color.SECONDARY_COLOR} />
        )}
      </Pressable>
      {clicked ? (
        <View
          style={{
            elevation: 5,
            height: 300,
            marginTop: -10,
            alignSelf: "center",
            width: "90%",
            zIndex: -1,
            position: "relative",
            backgroundColor: "#fff",
            borderRadius: 10,
          }}>
          <TextInput
            placeholder="Search..."
            value={search}
            ref={searchRef}
            onChangeText={(txt) => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              ...inputSearchDrop,
            }}
          />

          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    width: "85%",
                    alignSelf: "center",
                    height: 50,
                    justifyContent: "center",
                    borderBottomWidth: 0.8,
                    borderColor: "#8e8e8e",
                  }}
                  onPress={() => {
                    setSelectedMovieType(item.value);
                    setValue(item.label);
                    setClicked(!clicked);
                    onSearch("");
                    setSearch("");
                    //to do
                  }}>
                  <Text style={normalText}>{item.label}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const inputSearchDrop: ViewStyle = {
  width: "90%",
  height: 50,
  alignSelf: "center",
  borderWidth: 0.2,
  borderColor: "#8e8e8e",
  borderRadius: 7,
  marginTop: 20,
  paddingLeft: 20,
};

export default CustomDropDown;
