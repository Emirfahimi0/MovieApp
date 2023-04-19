import React from "react";
import { StackNavigator } from "./src/components/features//StackNavigator";
import { GlobalProvider } from "./src/context/GlobalState";
import { WatchlistProvider } from "./src/context/watchlist-context/WatchlistContext";
import { MovieProvider } from "./src/context/movie-context/MovieContext";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { AppContextProviders } from "./src/context/utilities/AppContextProvider";

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
