import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/global";
import DetailsMovieScreen from "../../screens/DetailsMovieScreen";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import React, { useContext, useEffect, useState } from "react";
import WatchListScreen from "../../screens/WatchlistScreen";
import { GlobalContext } from "../../context/GlobalState";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { storeGenre } = useContext(GlobalContext);

  useEffect(() => {
    //handleIsUserLoggedIn();
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <>
          <RootStack.Group>
            <RootStack.Screen name="LoginScreen" component={LoginScreen} />
            <RootStack.Screen name="HomeScreen" component={HomeScreen} />
            <RootStack.Screen name="DetailScreen" component={DetailsMovieScreen} />
            <RootStack.Screen name="WatchlistScreen" component={WatchListScreen as React.ComponentType<any>} />
          </RootStack.Group>
        </>
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
