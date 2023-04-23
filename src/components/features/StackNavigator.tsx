import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/global";
import DetailsMovieScreen from "../../screens/DetailsMovieScreen";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import React, { useContext, useEffect, useState } from "react";
import WatchListScreen from "../../screens/WatchListScreen";
import { GlobalContext } from "../../context/GlobalState";
import { fetchGenreItem, handleLoginWithFaceId } from "./handleFunctions";
import { Genre } from "src/services";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const { storeGenre } = useContext(GlobalContext);
  const handleIsUserLoggedIn = async () => {
    const response = await handleLoginWithFaceId();
    const responseGenre: Genre[] = await fetchGenreItem();
    if (responseGenre !== undefined) {
      storeGenre(responseGenre);
      setIsLoggedIn(true);
      console.log("loggedIn");
    }
    if (response === false) {
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
