import React from "react";
import { StackNavigator } from "./src/components/features//StackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { AppContextProviders } from "./src/context/utils/AppContextProvider";

function App() {
  return (
    <React.Fragment>
      <AppContextProviders>
        <SafeAreaView>
          <StatusBar barStyle={"light-content"} translucent={true} />
        </SafeAreaView>
        <StackNavigator />
      </AppContextProviders>
    </React.Fragment>
  );
}

export default App;
