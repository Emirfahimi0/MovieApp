import { Image, Pressable, Text, TextInput, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { CardContainer, SearchBar } from "../../constants/style-component/viewComponent";
import Icon from "react-native-vector-icons/Entypo";
import Color from "../../constants/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import { InputSearcbBar, subTitle } from "../../constants/style-component/textComponent";
import { subHeader } from "../../constants/style-component/textComponent";
import { IResponseAccount } from "src/services";
import { RootNavigationProp } from "types/global";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface IHeaderComponent {
  accountDetails: IResponseAccount | undefined;
  handleWatchList?: () => {};
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}
export const HeaderComponent: React.FunctionComponent<IHeaderComponent> = ({
  searchText,
  setSearchText,
  handleWatchList,
  accountDetails,
}: IHeaderComponent) => {
  const urlAvatar = `https://secure.gravatar.com/avatar/${accountDetails?.avatar.gravatar.hash}.png?s=200`;
  console.log("url", urlAvatar);
  const navigation: RootNavigationProp = useNavigation();
  const handleLogOut = async () => {
    //To do
    AsyncStorage.clear();
    navigation.popToTop();
  };
  return (
    <>
      <Fragment>
        <LinearGradient
          start={{ x: 0.0, y: 0.4 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 1]}
          colors={[Color.LIGHT_BLUE, Color.BLUE]}
          style={{ flexDirection: "column", borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
          <View style={{ flexDirection: "column", marginTop: hp("8%"), marginBottom: hp("4%"), paddingHorizontal: "4%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 30 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ ...subTitle, color: Color.EXTRA_LIGHT_GRAY }}>Welcome Back</Text>
                <Text style={{ ...subTitle, fontSize: 32, color: Color.WHITE }}>{accountDetails?.name}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable onPress={handleLogOut}>
                  <Icon name="log-out" size={32} color="#fff" />
                </Pressable>
                <Image source={{ uri: urlAvatar }} resizeMode="cover" style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 15 }} />
              </View>
            </View>

            <View style={{ ...rowView }}>
              {/* To put data */}
              <View style={{ flexDirection: "column" }}>
                <Text style={{ ...subHeader, color: Color.ACTIVE }}>ACTIVE</Text>
                <Text style={{ ...subTitle, color: Color.TRANSPARENT }}>Updated 2 mins ago</Text>
              </View>
              <TouchableWithoutFeedback onPress={handleWatchList}>
                <View style={{ ...CardContainer, width: "30%", backgroundColor: Color.AMBER }}>
                  <Text style={{ ...subTitle, color: Color.WHITE }}>Watch List</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={{ ...styleView }}>
            <View style={SearchBar}>
              <Icon iconStyle={{ marginRight: 10 }} name="magnifying-glass" size={22} color={Color.GREEN} />
              <View style={{ width: "100%" }}>
                <TextInput value={searchText} onChangeText={(text) => setSearchText(text)} style={InputSearcbBar} placeholder="Search" />
              </View>
            </View>
          </View>
        </LinearGradient>
      </Fragment>
    </>
  );
};

const styleView: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  paddingBottom: 40,
};

const rowView: ViewStyle = {
  flexDirection: "row",
  marginTop: 2,
  justifyContent: "space-between",
  alignItems: "center",
};
