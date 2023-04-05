import { HeaderContainerDetails } from "../components/MovieDetailsComponent/HeaderContainerDetails";
import { ScrollView } from "react-native";
import { SubContainerDetail } from "../components/MovieDetailsComponent/SubContainerDetail";

import React from "react";

const DetailsMovieScreen = ({ route, navigation }) => {
  const { item } = route.params;
  console.log("Movie from params to detail screen --- ", item);
  const overview = item.overview;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <HeaderContainerDetails movie={item} onPress={handleGoBack} />
      <SubContainerDetail overview={overview} />
    </ScrollView>
  );
};

export default DetailsMovieScreen;
