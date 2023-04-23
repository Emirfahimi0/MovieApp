import { CardContainer, SearchBar, setHeight, setWidth } from "../../constants/style-component/viewComponent";
import { Image, Pressable, Text, TextInput, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { InputSearcbBar, genreText, subTitle } from "../../constants/style-component/textComponent";
import { IResponseAccount } from "src/services";
import { RootNavigationProp } from "types/global";
import { subHeader } from "../../constants/style-component/textComponent";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import color from "../../constants/Color";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import React, { Dispatch, Fragment, SetStateAction } from "react";

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

  const navigation: RootNavigationProp = useNavigation();
  const handleLogOut = async () => {
    //To do
    navigation.popToTop();
    AsyncStorage.clear();
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
                alignItems: "flex-start",
                paddingBottom: 30,
              }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ ...subTitle, color: color.EXTRA_LIGHT_GRAY }}>Welcome Back</Text>
                <Text style={{ ...genreText, fontSize: 24, fontWeight: "900", color: color.SECONDARY_COLOR }}>
                  {accountDetails?.name.toUpperCase()}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable onPress={handleLogOut}>
                  <Icon name="exit-outline" size={32} color="#fff" />
                </Pressable>
                <Image source={{ uri: urlAvatar }} resizeMode="cover" style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 15 }} />
              </View>
            </View>

            <View style={{ ...rowView }}>
              {/* To put data */}
              <View style={{ flexDirection: "column" }}>
                <Text style={{ ...subHeader, color: color.ACTIVE }}>ACTIVE</Text>
                <Text style={{ ...subTitle, color: color.EXTRA_LIGHT_GRAY }}>Updated 2 mins ago</Text>
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
              <Icon iconStyle={{ marginRight: 10 }} name="ios-search" size={22} color={color.AMBER} />
              <View style={{ width: "100%" }}>
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
  justifyContent: "center",
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

const headerCard: ViewStyle = {
  flexDirection: "column",
  marginTop: setHeight(640 / 100),
  marginBottom: setWidth(640 / 100),
  paddingHorizontal: "4%",
};
