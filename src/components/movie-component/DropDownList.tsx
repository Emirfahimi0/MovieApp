import { FlatList, Modal, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { FC, Fragment, useState } from "react";
import color from "../../constants/Color";
import Icon from "react-native-vector-icons/Ionicons";

interface ILabel {
  label: string;
  data?: Array<{ label: string; value: string }>;
  onSelect?: (item: { label: string; value: string }) => void;
}

const DropDownList: FC<ILabel> = ({ label, data }) => {
  const [visible, setVisible] = useState<boolean>(true);

  const toggleDropDown = () => {
    setVisible(!visible);
  };

  return (
    <Fragment>
      <View style={{ justifyContent: "center", top: 20, marginLeft: "8%" }}>
        <TouchableOpacity style={buttonArrow} onPress={toggleDropDown}>
          <Modal visible={visible} transparent animationType="none" style={{ backgroundColor: "yellow" }}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <View style={dropDownStyle}>
                <FlatList
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <>
                        <Text style={buttonText}>{item.label}</Text>
                      </>
                    );
                  }}
                />
              </View>
            </TouchableOpacity>
          </Modal>
          <Text style={buttonText}>{label}</Text>
          <Icon name="add-circle-outline" size={20} />
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default DropDownList;

const buttonArrow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  borderRadius: 50,
  backgroundColor: color.AMBER,
  height: 50,
  width: "90%",
  paddingHorizontal: 50,
  zIndex: 1,
};

const buttonText: TextStyle = {
  flex: 1,
  alignItems: "center",
};

const dropDownStyle: ViewStyle = {
  position: "absolute",
  marginLeft: "8%",
  //top: 340,
  width: "80%",
  backgroundColor: color.ACTIVE,
};
