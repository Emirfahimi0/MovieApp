import { AppContextProviders } from "./src/context/utils/AppContextProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigator } from "./src/components/features//StackNavigator";
import { StatusBar } from "react-native";
import React, { Fragment } from "react";
import Toast from "react-native-toast-message";
import Color from "./src/constants/Color";

function App() {
  return (
    <Fragment>
      <AppContextProviders>
        <SafeAreaView>
          <StatusBar barStyle={"dark-content"} translucent={false} />
        </SafeAreaView>
        <StackNavigator />
        <Toast />
      </AppContextProviders>
    </Fragment>
  );
}

export default App;
