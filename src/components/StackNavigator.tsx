import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SplashScreen from "../screens/SplashScreen";

import { RootStackParamList } from "../../types";
import LoginScreen from "../screens/LoginScreen";
import MovieScreen from "../screens/MovieScreen";

const StackNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="MovieScreen" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="MovieScreen" component={MovieScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
