import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/global";
import DetailsMovieScreen from "../../screens/DetailsMovieScreen";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import React from "react";
import WatchListScreen from "../../screens/WatchListScreen";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="DetailScreen" component={DetailsMovieScreen} />
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="WatchListScreen" component={WatchListScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
