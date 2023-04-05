import { TouchableWithoutFeedback, View } from "react-native";
import React, { useContext, useState, Fragment } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { MovieCard } from "../components/PreviewMovieComponents/MovieCard";
import { SearchBarComponent } from "../components/PreviewMovieComponents/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Entypo";

const WatchListScreen = ({ navigation }) => {
  //Access watchlist movie with context
  const { WatchList } = useContext(GlobalContext);
  console.log("List of added watchlist ", WatchList);
  const storage = AsyncStorage.getItem("watchlist");
  console.log("Storage as follows", storage);

  const [input, setInput] = useState<string>("");
  // To do
  return (
    <Fragment>
      <View style={{ padding: 10 }}>
        <SearchBarComponent searchText={input} setSearchText={setInput} />
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={20} color={"black"} />
        </TouchableWithoutFeedback>

        {/* {WatchList ? ():()} */}
        <MovieCard MovieData={WatchList} keyword={input} navigation={navigation} />
      </View>
    </Fragment>
  );
};

export default WatchListScreen;
