import React from "react";
import { Provider } from "react-redux";
import { StackNavigator } from "./src/components/features//StackNavigator";
import { GlobalProvider } from "./src/context/GlobalState";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

function App() {
  return (
    <GlobalProvider>
      <SafeAreaView>
        <StatusBar backgroundColor={"black"} />
      </SafeAreaView>
      <StackNavigator />
    </GlobalProvider>
  );
}

export default App;
