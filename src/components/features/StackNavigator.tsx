import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/global";
import DetailsMovieScreen from "../../screens/DetailsMovieScreen";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import React, { useContext, useEffect, useState } from "react";
import WatchListScreen from "../../screens/WatchlistScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../context/GlobalState";
import { fetchGenreItem } from "./handleFunctions";
import color from "../../constants/color";
import Font from "../../constants/font";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { storeGenre } = useContext(GlobalContext);

  const handleLogin = async () => {
    //const authenticationResult = await submitByFaceId();
    const data = await AsyncStorage.getItem("userLoggedIn");
    if (!!data) {
      const resGenre = await fetchGenreItem();
      storeGenre(resGenre);
      if (data.endsWith("e")) {
        setUserLoggedIn(true);
      }
    } else {
      //const resGenre = await fetchGenreItem();
      // storeGenre(resGenre);
    }
    console.log("userLoggedIn", userLoggedIn);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLogin();
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <>
          <RootStack.Screen name="LoginScreen" component={LoginScreen} />
          <RootStack.Screen name="HomeScreen" component={HomeScreen} />
          <RootStack.Screen name="DetailScreen" component={DetailsMovieScreen} />
          <RootStack.Screen name="WatchlistScreen" component={WatchListScreen} />
        </>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const headerStyle = {
  title: "MoviesApp",
  headerStyle: { backgroundColor: color.SEMI_BLACK },
  headerTitleStyle: { color: color.SECONDARY_COLOR, fontFamily: Font.BOLD },
  headerShown: true,
};
