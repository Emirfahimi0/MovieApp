import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/global";
import DetailsMovieScreen from "../../screens/DetailsMovieScreen";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import React, { useContext, useEffect, useState } from "react";
import WatchListScreen from "../../screens/WatchListScreen";
import { GlobalContext } from "../../context/GlobalState";
import { handleLoginWithFaceId } from "./handleFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const { storeData } = useContext(GlobalContext);
  const handleIsUserLoggedIn = async () => {
    storeData();
    const data = await handleLoginWithFaceId();
    if (data === true) {
      setIsLoggedIn(true);
      console.log("loggedIn");
    } else setIsLoggedIn(false);
  };
  useEffect(() => {
    handleIsUserLoggedIn();
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <RootStack.Group>
              <RootStack.Screen name="HomeScreen" component={HomeScreen} />
              <RootStack.Screen name="DetailScreen" component={DetailsMovieScreen} options={{ headerShown: false }} />
              <RootStack.Screen name="WatchlistScreen" component={WatchListScreen as React.ComponentType<any>} />
            </RootStack.Group>
          </>
        ) : (
          <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

// const headerStyle = {
//   title: "MoviesApp",
//   headerStyle: { backgroundColor: color.SEMI_BLACK },
//   headerTitleStyle: { color: color.SECONDARY_COLOR, fontFamily: Font.BOLD },
//   headerShown: true,
// };
