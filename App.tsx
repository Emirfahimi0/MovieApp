import React from "react";
import { StackNavigator } from "./src/components/features//StackNavigator";
import { GlobalProvider } from "./src/context/GlobalState";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

function App() {
  return (
    <GlobalProvider>
      <SafeAreaView>
        <StatusBar barStyle={"light-content"} translucent={true} backgroundColor="transparent" />
      </SafeAreaView>
      <StackNavigator />
    </GlobalProvider>
  );
}

export default App;
