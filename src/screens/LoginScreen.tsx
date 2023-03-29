import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  //const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const dispatch = useDispatch();

  const onSubmitHandler = () => {
    if (userEmail === "") {
      Alert.alert("User email is empty");
    } else if (userPassword === "") {
      Alert.alert("User password is empty");
    } else {
      //To do
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.appContainer}>
            <TextInput style={styles.Input} placeholder="Email" value={userEmail} onChangeText={(text) => setUserEmail(text)} />
          </View>
          <View style={styles.appContainer}>
            <TextInput style={styles.Input} placeholder="password" value={userPassword} onChangeText={(text) => setUserPassword(text)} />
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => onSubmitHandler()}>
          <Text style={styles.txt_input}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    margin: 20,
  },

  btn: {
    padding: 20,
    margin: 50,
    width: "73%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    borderRadius: 20,
    backgroundColor: "#0A1537",
  },
  textStyle: {
    padding: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
    color: "#EEF3F0",
  },
  txt_input: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },

  appContainer: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#DCDFDE",
    borderRadius: 10,
    alignItems: "center",
  },

  Input: {
    fontSize: 15,
    width: "100%",
  },
});
