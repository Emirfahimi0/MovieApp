import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/global";
import DetailsMovieScreen from "../../screens/DetailsMovieScreen";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import React, { useState } from "react";
import WatchListScreen from "../../screens/WatchlistScreen";
import { submitByFaceId } from "./handleFunctions";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogin = async () => {
    const authenticationResult = await submitByFaceId();
    if (authenticationResult === true) {
      setUserLoggedIn(true);
    }
  };
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="DetailScreen" component={DetailsMovieScreen} />
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="WatchlistScreen" component={WatchListScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
