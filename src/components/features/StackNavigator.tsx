import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsMovieScreen from "../../screens/Details/DetailsMovieScreen";
import HomeScreen from "../../screens/Home/HomeScreen";
import LoginScreen from "../../screens/Login/LoginScreen";
import React, { useContext, useEffect, useState } from "react";
import WatchListScreen from "../../screens/Watchlist/WatchListScreen";
import { GlobalContext } from "../../contextStore/GlobalState";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  // const [i, setIsLoggedIn] = useState<boolean>(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);
  console.log("isLoggedIn", isLoggedIn);

  // const handleIsUserLoggedIn = async () => {
  //   if (isLoggedIn === true) {
  //     // setIsLoggedIn(true);
  //     console.log("loggedIn", isLoggedIn);
  //   }
  // };

  useEffect(() => {
    const handleIsUserLoggedIn = async () => {
      const storageData = await AsyncStorage.getItem("userLoggedIn");
      if (storageData) {
        const response = JSON.parse(storageData);
        console.log("handleIsUserLoggedIn response", response);
        if (setIsLoggedIn !== undefined) {
          setIsLoggedIn(response);
        }
        // if (response === true && setIsLoggedIn !== undefined) {
        //   setIsLoggedIn(response);
        //   setIsLoggedIn(true);
        // }
      }
    };

    handleIsUserLoggedIn().catch(console.error);
  }, []);

  return (
    <>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <RootStack.Group>
            <RootStack.Screen name="HomeScreen" component={HomeScreen} />
            <RootStack.Screen name="DetailScreen" component={DetailsMovieScreen} />
            <RootStack.Screen name="WatchlistScreen" component={WatchListScreen as React.ComponentType<any>} />
          </RootStack.Group>
        ) : (
          <RootStack.Group>
            <RootStack.Screen name="LoginScreen" component={LoginScreen} />
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    </>
  );
};

// const headerStyle = {
//   title: "MoviesApp",
//   headerStyle: { backgroundColor: color.SEMI_BLACK },
//   headerTitleStyle: { color: color.SECONDARY_COLOR, fontFamily: Font.BOLD },
//   headerShown: true,
// };
