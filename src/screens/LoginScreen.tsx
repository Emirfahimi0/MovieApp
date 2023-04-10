import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ButtonContainerRating, CardContainer, InputContainer, Logincontainer } from "../constants/Styling/ContainerStyling";
import { InputLogin, genreText, loginText } from "../constants/Styling/TextStyleComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import Color from "../constants/Color";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { getUser, getGenre } = useContext(GlobalContext);
  //const [loading, setLoading] = useState(false);
  //const [errortext, setErrortext] = useState("");
  //const dispatch = useDispatch();

  const onSubmitHandler = async () => {
    if (userEmail === "") {
      Alert.alert("User email is empty");
    }
    if (userPassword === "") {
      Alert.alert("User password is empty");
    } else {
      let checkLogin = getUser(userEmail, userPassword);
      if (await checkLogin) {
        navigation.navigate("HomeScreen");
      }
      //To do
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: Color.BLUE }}>
      <View style={Logincontainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={[genreText, { color: Color.WHITE }]}>WELCOME!</Text>
          <Text style={[genreText, { color: Color.WHITE }]}>BACK!</Text>
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

        <View style={[ButtonContainerRating, { marginRight: 40, padding: 20 }]}>
          <TouchableOpacity style={[CardContainer, { backgroundColor: Color.HEART }]} onPress={() => onSubmitHandler()}>
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
            <View style={[CardContainer, { borderRadius: 15, width: 100 }]}>
              <Icon name="md-logo-instagram" size={20} color="purple" />
              <Text style={[genreText, { marginLeft: 5 }]}>Instagram</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[CardContainer, { borderRadius: 15, width: 100 }]}>
              <Icon name="md-logo-twitter" size={20} color="#1DBAFA" />
              <Text style={[genreText, { marginLeft: 5 }]}>Twitter</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[CardContainer, { borderRadius: 15, width: 100 }]}>
              <Icon name="md-logo-facebook" size={20} color="blue" />
              <Text style={[genreText, { marginLeft: 5 }]}>Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
