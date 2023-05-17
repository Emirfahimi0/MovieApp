import { AppContextProviders } from "./src/contextStore//utils/AppContextProviders";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigator } from "./src/components/features//StackNavigator";
import { StatusBar } from "react-native";
import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Toast from "react-native-toast-message";

function App() {
  return (
    <Fragment>
      <NavigationContainer>
        <AppContextProviders>
          <SafeAreaView>
            <StatusBar barStyle={"light-content"} translucent={true} />
          </SafeAreaView>
          <StackNavigator />
          <Toast />
        </AppContextProviders>
      </NavigationContainer>
    </Fragment>
  );
}

export default App;
