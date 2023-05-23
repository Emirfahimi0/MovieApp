import { Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMessage } from "../../components/toastMessage/ToastMessage";
import { GlobalContext } from "../../contextStore/GlobalState";
import TouchID from "react-native-touch-id";
import { getStorageData, setStorageData } from "../..//utils";

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const { isUserLoggedIn } = useContext(GlobalContext);

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

  const checkForValidSession = async (): Promise<boolean> => {
    console.log("checkForValidSession");
    // let isValidate: boolean = false;

    const resAsyncToken = await getStorageData("responseToken");
    const resAsyncRequestBody = await getStorageData("requestBody");

    console.log("resAsyncToken", resAsyncToken);
    console.log("resAsyncRequestBody", resAsyncRequestBody);

    // AsyncStorage?.getItem("responseToken").then((value) => {
    //   const responseToken: IResponseTokenMerge = JSON.parse(value ?? "null");
    //   return responseToken;
    // });
    // const resAsyncRequestBody = await AsyncStorage?.getItem("requestBody").then((value) => {
    //   const responseToken: IRequestBody = JSON.parse(value ?? "null");
    //   return responseToken;
    // });

    if (resAsyncToken !== null && resAsyncRequestBody !== null) {
      if (resAsyncToken.request_token === resAsyncRequestBody.request_token) {
        if (resAsyncToken.session_id) {
          // isValidate = true;
          console.log("authenticated session received...");
          return true;
        }
      } else {
        console.log("not authenticated token received...");
        return false;
      }
    }
    // else {
    //   isValidate = false;
    // }
    // console.log("isValidate", isValidate);
    // return isValidate;

    return false;
  };

  // if true returns face id
  const handleLoginWithFaceId = async (): Promise<boolean> => {
    console.log("handleLoginWithFaceId");
    const valueStorage = await getStorageData("userLoggedIn");
    console.log("valueStorage", valueStorage);
    const isSessionValid = await checkForValidSession();
    console.log("isSessionValid", isSessionValid);

    let isLoggedIn: boolean = isSessionValid === true;

    if (isSessionValid === false && valueStorage === null) {
      const response = await sessionWithLogIn("emirfahimi", "adidas");
      console.log("will show face id");

      await TouchID.authenticate("Authenticate with Face ID")
        .then((success) => {
          if (response === true) {
            success(true);
            isLoggedIn = true;
            return isLoggedIn;
          } else return isLoggedIn;
        })
        .catch((error: string) => {
          console.log("error", error);
        });
    } else if (isSessionValid === true) {
      await TouchID.authenticate("Authenticate with Face ID")
        .then((success) => {
          success(true);
          return isLoggedIn;
        })
        .catch((error: string) => {
          console.log("error", error);
        });
    } else return isLoggedIn;

    return isLoggedIn;
  };

  const handleFaceID = async () => {
    console.log("LoginScreen handleFaceID");
    // const data = await AsyncStorage.getAllKeys();
    // console.log("check data", data);
    //By doing this, ensuring that the data value is always compared to a boolean value, which avoids the type error.
    // if (!!data) {
    //   console.log("user already logged In", data);
    // navigation.navigate("HomeScreen");
    // } else {

    const responseLoginFaceId: boolean = await handleLoginWithFaceId();
    console.log("LoginScreen is response face id?", responseLoginFaceId);
    if (responseLoginFaceId === true) {
      console.log("responseLoginFaceId is ", responseLoginFaceId);
      const asyncLoginIn = await getStorageData("userLoggedIn");

      // AsyncStorage.getItem("userLoggedIn").then((value) => {
      //   const response = JSON.parse(value ?? "null");
      //   return response;
      // });
      isUserLoggedIn(asyncLoginIn);
      await setStorageData("userLoggedIn", true);
      // AsyncStorage.setItem("userLoggedIn", JSON.stringify(true));
      navigation.navigate("HomeScreen");
    } else {
      console.log("responseLoginFaceId is false");
      isUserLoggedIn(false);
      console.log("something wrong with authentication");
    }
    //}
  };

  useEffect(() => {
    console.log("effect LoginScreen");
    handleFaceID();
  }, []);

  const buttonsocial: ViewStyle = {
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    backgroundColor: "#DFE0E0",
    padding: 8,
    borderRadius: 50,
  };

  const iconSocial = [
    { name: "instagram", color: "purple", size: 25 },
    { name: "twitter", color: "blue", size: 25 },
    { name: "facebook", color: "blue", size: 25 },
  ];

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: color.ACTIVE }}>
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

        <View style={{ ...ButtonContainerRating, marginRight: 40, padding: 20, borderRadius: 50 }}>
          <TouchableOpacity style={{ ...CardContainer, backgroundColor: color.GREEN }} onPress={onSubmitHandler}>
            <Text style={loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            flex: 1,
            alignContent: "space-between",
            alignSelf: "stretch",
          }}>
          {iconSocial.map((item, index) => {
            return (
              <TouchableOpacity key={index}>
                <View
                  style={{
                    ...buttonsocial,
                  }}>
                  <Icon name={`md-logo-${item.name}`} size={item.size} color={`${item.color}`} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
