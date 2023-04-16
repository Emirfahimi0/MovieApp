import React from "react";
import { StackNavigator } from "./src/components/features//StackNavigator";
import { GlobalProvider } from "./src/context/GlobalState";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

function App() {
  return (
    <GlobalProvider>
      <SafeAreaView>
        <StatusBar backgroundColor={"white"} barStyle={"light-content"} />
      </SafeAreaView>
      <StackNavigator />
    </GlobalProvider>
  );
}

export default App;
