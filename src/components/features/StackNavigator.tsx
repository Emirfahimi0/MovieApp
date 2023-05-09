import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import DetailsMovieScreen from "../../screens/DetailsMovieScreen";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import React, { useContext, useEffect, useState } from "react";
import WatchListScreen from "../../screens/WatchListScreen";
import { GlobalContext } from "../../context/GlobalState";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  const [loading, setLoading] = useState<boolean>(true);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { isLoggedIn } = useContext(GlobalContext);

  const handleIsUserLoggedIn = async () => {
    if (isLoggedIn) {
      // setIsLoggedIn(true);
      console.log("loggedIn", isLoggedIn);
    }
  };
  useEffect(() => {
    handleIsUserLoggedIn();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  console.log("isLoggedIn", isLoggedIn);
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
