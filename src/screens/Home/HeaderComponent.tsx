import { CardContainer, SearchBar, setHeight, InputSearcbBar, normalText, subTitle, color } from "../../constants";
import { Image, Pressable, Text, TextInput, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { subHeader } from "../../constants/style-component/textComponent";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import React, { Dispatch, Fragment, SetStateAction, useContext } from "react";
import { GlobalContext } from "../../contextStore/GlobalState";

interface IHeaderComponent {
  accountDetails: IResponseAccount | undefined;
  handleGoBack?: () => void;
  handleWatchList?: () => {};
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}
export const HeaderComponent: React.FunctionComponent<IHeaderComponent> = ({
  searchText,
  setSearchText,
  handleWatchList,
  accountDetails,
  handleGoBack,
}: IHeaderComponent) => {
  const urlAvatar = `https://secure.gravatar.com/avatar/${accountDetails?.avatar.gravatar.hash}.jpg?s=64`;
  const { isUserLoggedIn } = useContext(GlobalContext);
  const navigation: RootNavigationProp = useNavigation();
  const handleLogOut = async () => {
    //To do
    await AsyncStorage.clear();
    //  await AsyncStorage.setItem("userLoggedIn", JSON.stringify(false));
    isUserLoggedIn(false);
    // navigation.replace("LoginScreen");
  };
  return (
    <>
      <Fragment>
        <LinearGradient
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 1]}
          colors={handleGoBack ? [color.BUTTON, color.GREEN] : [color.PRIMARY_COLOR, color.BUTTON]}
          style={{ flexDirection: "column", borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
          <View
            style={{
              ...headerCard,
            }}>
            {handleGoBack ? (
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Icon name="md-chevron-back" size={32} color={"white"} />
              </TouchableWithoutFeedback>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
                paddingBottom: 32,
              }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ ...normalText, fontSize: 16, color: color.SECONDARY_COLOR }}>{handleGoBack ? "" : "Hello! "}</Text>
                <Text style={{ ...normalText, fontSize: 16, fontWeight: "900", color: color.SECONDARY_COLOR }}>{accountDetails?.name}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable onPress={handleLogOut}>
                  <Icon name="exit-outline" size={32} color="#fff" />
                </Pressable>
                <Image source={{ uri: urlAvatar }} resizeMode="cover" style={{ width: 52, height: 52, borderRadius: 50, marginLeft: 16 }} />
              </View>
            </View>

            <View style={{ ...rowView }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ ...subHeader, color: color.SECONDARY_COLOR }}>Book your favourite movie now!</Text>
              </View>
              {handleGoBack ? null : (
                <TouchableWithoutFeedback onPress={handleWatchList}>
                  <View style={{ ...CardContainer, width: "30%", backgroundColor: color.PRIMARY_COLOR }}>
                    <Text style={{ ...subTitle, color: color.SECONDARY_COLOR }}>Watch List</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
          <View style={{ ...styleView }}>
            <View style={SearchBar}>
              <Icon name="ios-search" size={22} color={color.SECONDARY_COLOR} />
              <View style={{ width: SearchBar.width }}>
                <TextInput
                  value={searchText}
                  placeholderTextColor={color.PRIMARY_COLOR}
                  onChangeText={(text) => setSearchText(text)}
                  style={InputSearcbBar}
                  placeholder="Search"
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </Fragment>
    </>
  );
};

const styleView: ViewStyle = {
  alignItems: "center",
  alignContent: "center",
  position: "relative",
  zIndex: 1,
  paddingBottom: 30,
};

const rowView: ViewStyle = {
  flexDirection: "row",
  marginTop: 2,
  justifyContent: "space-between",
  alignItems: "center",
};

export const headerCard: ViewStyle = {
  flexDirection: "column",
  marginTop: setHeight(640 / 100),
  marginBottom: setHeight(320 / 100),
  paddingHorizontal: "4%",
};
