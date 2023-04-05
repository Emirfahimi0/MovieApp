import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { StackNavigator } from "./src/components/appRender/StackNavigator";
import { GlobalProvider } from "./src/Context/GlobalState";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

function App() {
  return (
    <GlobalProvider>
      <Provider store={store}>
        <SafeAreaView>
          <StatusBar backgroundColor={"black"} />
        </SafeAreaView>
        <StackNavigator />
      </Provider>
    </GlobalProvider>
  );
}

export default App;
