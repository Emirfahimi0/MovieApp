import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  ButtonContainerRating,
  CardContainer,
  InputContainer,
  Logincontainer,
  color,
  InputLogin,
  normalText,
  loginText,
} from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useContext, useEffect, useState } from "react";
import { sessionWithLogIn } from "../../services/api-services";
import { handleLoginWithFaceId } from "../../components/features/handleFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMessage } from "../../components/features/ToastMessage";
import { GlobalContext } from "../../contextStore/GlobalState";

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const { isUserLoggedIn } = useContext(GlobalContext);

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
      console.log("responseLoginFaceId is ", responseLoginFaceId);
      const asyncLoginIn = await AsyncStorage.getItem("userLoggedIn").then((value) => {
        const response = JSON.parse(value ?? "null");
        return response;
      });
      isUserLoggedIn(asyncLoginIn);
      await AsyncStorage.setItem("userLoggedIn", JSON.stringify(true));
      // navigation.replace("HomeScreen");
    } else {
      console.log("responseLoginFaceId is false");
      isUserLoggedIn(false);
      console.log("something wrong with authentication");
    }
    //}
  };

  // arrow function for handling validation and submission
  const onSubmitHandler = async () => {
    const success = "error";
    if (userEmail === "") {
      ToastMessage(success, "Error", "User email is empty!");
    }
    if (userPassword === "") {
      ToastMessage(success, "Error", "User password is empty!");
    } else {
      const isSuccess = await sessionWithLogIn(userEmail, userPassword);
      if (isSuccess) {
        navigation.navigate("HomeScreen");
      } else {
        ToastMessage(success, "Error", "Invalid credential!");
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: color.BUTTON }}>
      <View style={Logincontainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...normalText, color: color.SECONDARY_COLOR }}>WELCOME!</Text>
          <Text style={{ ...normalText, color: color.SECONDARY_COLOR }}>BACK!</Text>
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
              <Text style={{ ...normalText, marginLeft: 5 }}>Instagram</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ ...CardContainer, borderRadius: 15, width: 100 }}>
              <Icon name="md-logo-twitter" size={20} color="#1DBAFA" />
              <Text style={{ ...normalText, marginLeft: 5 }}>Twitter</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ ...CardContainer, borderRadius: 15, width: 100 }}>
              <Icon name="md-logo-facebook" size={20} color="blue" />
              <Text style={{ ...normalText, marginLeft: 5 }}>Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
