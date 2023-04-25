import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ButtonContainerRating, CardContainer, InputContainer, Logincontainer } from "../constants/style-component/viewComponent";
import { InputLogin, genreText, loginText } from "../constants/style-component/textComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { sessionWithLogIn } from "../services/api-services";
import { fetchGenreItem, handleLoginWithFaceId } from "../components/features/handleFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import color from "../constants/Color";
import { Genre } from ".";

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  useEffect(() => {
    handleFaceID();
  }, []);

  const handleFaceID = async () => {
    const data = await AsyncStorage.getAllKeys();
    console.log("check data", data);
    //By doing this, ensuring that the data value is always compared to a boolean value, which avoids the type error.
    // if (!!data) {
    //   console.log("user already logged In", data);
    // navigation.navigate("HomeScreen");
    // } else {

    const responseLoginFaceId: boolean = await handleLoginWithFaceId();
    console.log("is response face id?", responseLoginFaceId);
    if (responseLoginFaceId === true) {
      const responseGenre: Genre[] = await fetchGenreItem();
      if (responseGenre !== undefined) {
        AsyncStorage.setItem("userLoggedIn", JSON.stringify(true));
        navigation.navigate("HomeScreen");
      }
    } else {
      console.log("something wrong with authentication");
    }
    //}
  };

  // arrow function for handling validation and submission of the formdata
  const onSubmitHandler = async () => {
    if (userEmail === "") {
      Alert.alert("User email is empty");
    }
    if (userPassword === "") {
      Alert.alert("User password is empty");
    } else {
      const isSuccess = await sessionWithLogIn(userEmail, userPassword);
      if (isSuccess) {
        navigation.navigate("HomeScreen");
      }
      // else {
      //   Alert.alert("Invalid credential or unknown error occurs");
      // }
      //To do
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: color.BUTTON }}>
      <View style={Logincontainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...genreText, color: color.SECONDARY_COLOR }}>WELCOME!</Text>
          <Text style={{ ...genreText, color: color.SECONDARY_COLOR }}>BACK!</Text>
        </View>

        <View style={InputContainer}>
          <TextInput
            style={{ ...InputLogin }}
            placeholder="Email"
            placeholderTextColor={color.ACTIVE}
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
          />
        </View>
        <View style={InputContainer}>
          <TextInput
            style={InputLogin}
            placeholder="password"
            value={userPassword}
            placeholderTextColor={color.ACTIVE}
            onChangeText={(text) => setUserPassword(text)}
            textContentType={"password"}
            secureTextEntry={true}
          />
        </View>

        <View style={{ ...ButtonContainerRating, marginRight: 40, padding: 20 }}>
          <TouchableOpacity style={{ ...CardContainer, backgroundColor: color.HEART }} onPress={() => onSubmitHandler()}>
            <Text style={loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            flex: 1,
            alignContent: "space-between",
          }}>
          <TouchableOpacity onPress={() => AsyncStorage.clear()}>
            <View style={{ ...CardContainer, borderRadius: 15, width: 100 }}>
              <Icon name="md-logo-instagram" size={20} color="purple" />
              <Text style={{ ...genreText, marginLeft: 5 }}>Instagram</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ ...CardContainer, borderRadius: 15, width: 100 }}>
              <Icon name="md-logo-twitter" size={20} color="#1DBAFA" />
              <Text style={{ ...genreText, marginLeft: 5 }}>Twitter</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ ...CardContainer, borderRadius: 15, width: 100 }}>
              <Icon name="md-logo-facebook" size={20} color="blue" />
              <Text style={{ ...genreText, marginLeft: 5 }}>Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
