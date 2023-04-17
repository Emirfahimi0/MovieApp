import { Image, Text, TextInput, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { CardContainer, SearchBar } from "../../constants/style-component/viewComponent";
import Icon from "react-native-vector-icons/Entypo";
import Color from "../../constants/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import font from "../../constants/font";
import { InputSearcbBar, genreText, subTitle } from "../../constants/style-component/textComponent";
import { subHeader } from "../../constants/style-component/textComponent";
interface IHeaderComponent {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  handleWatchList: () => {};
}
export const HeaderComponent: React.FunctionComponent<IHeaderComponent> = ({
  searchText,
  setSearchText,
  handleWatchList,
}: IHeaderComponent) => {
  return (
    <>
      <Fragment>
        <LinearGradient
          start={{ x: 0.0, y: 0.4 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 1]}
          colors={[Color.LIGHT_BLUE, Color.BLUE]}
          style={{ flexDirection: "column", borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
          <View style={{ flexDirection: "column", marginTop: hp("10%"), marginBottom: hp("5%"), paddingHorizontal: "5%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 30 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontFamily: font.BOLD, fontSize: 16, color: "#fff" }}>Welcome Back</Text>
                <Text style={{ fontFamily: font.BOLD, color: "#fff", fontSize: 22 }}>Emir Fahimi</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="log-out" size={30} color="#fff" />
                <Image
                  source={require("../../assets/images/Deadpool.jpg")}
                  resizeMode="cover"
                  style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 15 }}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 2, justifyContent: "space-between", alignItems: "center" }}>
              {/* Amount */}
              <View style={{ flexDirection: "column" }}>
                <Text style={{ ...subHeader, color: Color.ACTIVE }}>ACTIVE</Text>
                <Text style={{ ...subTitle, color: Color.TRANSPARENT }}>Updated 2 mins ago</Text>
              </View>
              <TouchableWithoutFeedback onPress={handleWatchList}>
                <View style={{ ...CardContainer, width: "30%", backgroundColor: Color.AMBER }}>
                  <Text style={{ ...subTitle, color: Color.WHITE }}>Watch List</Text>
                </View>
              </TouchableWithoutFeedback>
              {/* <ProfitIndicator type="I" percentage_change={dummyData.portfolio.changes} /> */}
            </View>
          </View>
        </LinearGradient>
      </Fragment>
      <View style={{ ...styleView }}>
        <View style={SearchBar}>
          <Icon iconStyle={{ marginRight: 10 }} name="magnifying-glass" size={22} color={Color.GREEN} />
          <View style={{ width: "100%" }}>
            <TextInput value={searchText} onChangeText={(text) => setSearchText(text)} style={InputSearcbBar} placeholder="Search" />
          </View>
        </View>
      </View>
    </>
  );
};

const styleView: ViewStyle = {
  padding: 50,
  justifyContent: "center",
  position: "absolute",
  width: hp("45%"),
  height: hp("57%"),
  paddingHorizontal: wp("10%"),
};
