import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ButtonContainerRating, CardContainer, InputContainer, Logincontainer } from "../constants/style-component/ContainerStyling";
import { InputLogin, genreText, loginText } from "../constants/style-component/TextStyleComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import Color from "../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Genre } from ".";
import { getGenreMovie } from "../services/api-services";

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { storeUser, storeGenre } = useContext(GlobalContext);

  useEffect(() => {
    const fetchGenre = async (): Promise<void> => {
      const responseGenre: Genre[] = await getGenreMovie();
      // set state for in context provider for Genre []
      storeGenre(responseGenre);
    };
    fetchGenre().catch(console.error);
  }, []);

  // arrow function for handling validation and submission of the formdata
  const onSubmitHandler = async () => {
    if (userEmail === "") {
      Alert.alert("User email is empty");
    }
    if (userPassword === "") {
      Alert.alert("User password is empty");
    } else {
      let checkLogin = await storeUser(userEmail, userPassword);
      if (checkLogin === "success!") {
        navigation.navigate("HomeScreen");
      } else {
        Alert.alert("Invalid credential or unknown error occurs");
      }
      //To do
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: Color.BLUE }}>
      <View style={Logincontainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...genreText, color: Color.WHITE }}>WELCOME!</Text>
          <Text style={{ ...genreText, color: Color.WHITE }}>BACK!</Text>
        </View>

        <View style={InputContainer}>
          <TextInput style={InputLogin} placeholder="Email" value={userEmail} onChangeText={(text) => setUserEmail(text)} />
        </View>
        <View style={InputContainer}>
          <TextInput
            style={InputLogin}
            placeholder="password"
            value={userPassword}
            onChangeText={(text) => setUserPassword(text)}
            textContentType={"password"}
            secureTextEntry={true}
          />
        </View>

        <View style={{ ...ButtonContainerRating, marginRight: 40, padding: 20 }}>
          <TouchableOpacity style={{ ...CardContainer, backgroundColor: Color.HEART }} onPress={() => onSubmitHandler()}>
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
          <TouchableOpacity>
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
