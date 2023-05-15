import { Dispatch, Fragment, FunctionComponent, SetStateAction, useRef, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
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

const CustomDropDown: FunctionComponent<ICustomDropDown> = ({ movieType, setSelectedMovieType, value, setValue }: ICustomDropDown) => {
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(movieType);

  const searchRef = useRef(null);
  const onSearch = (search: string) => {
    if (search !== "") {
      let tempData = data.filter((item) => {
        // return item that index of based on search
        return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(movieType);
    }
  };

  const pressStyle: ViewStyle = {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: color.PRIMARY_COLOR,
    borderColor: color.PURPLE,
    borderRadius: 10,
    borderWidth: 1.6,
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    marginTop: 32,
    paddingHorizontal: 15,
    width: "90%",
  };

  const dropDownMenu: ViewStyle = {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    position: "relative",
    width: "90%",
    zIndex: -1,
  };

  const inputSearchDrop: ViewStyle = {
    alignSelf: "center",
    borderColor: "#8e8e8e",
    borderRadius: 7,
    borderWidth: 0.2,
    height: 50,
    marginTop: 20,
    paddingLeft: 20,
    width: "90%",
  };
  return (
    <Fragment>
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
            ...dropDownMenu,
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
          {data.map((item, index) => {
            return (
              <Fragment key={index}>
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
              </Fragment>
            );
          })}
        </View>
      ) : null}
    </Fragment>
  );
};

export default CustomDropDown;
