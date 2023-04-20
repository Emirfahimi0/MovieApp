import { DetailContext } from "../context/detail-context/DetailContext";
import { fetchAccountState } from "../components/features/handleFunctions";
import { HeaderContainerDetails } from "../components/detail-component/HeaderContainerDetails";
import { IAccountState } from "../services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/global";
import { ScrollView, ViewStyle, View, FlatList, TextStyle, TouchableOpacity, Text } from "react-native";
import { SubContainerDetail } from "../components/detail-component/OverviewContainerDetail";
import Color from "../constants/color";
import Loader from "../components/features/Loader";
import React, { useContext, useEffect, useState } from "react";
import ReviewContainerDetails from "../components/detail-component/ReviewContainerDetails";
import { CardContainer, homeCardContainer, setHeight } from "../constants/style-component/viewComponent";
import { GlobalContext } from "../context/GlobalState";
import { ItemSeparator } from "../components/movie-component/ItemSeparator";
import color from "../constants/color";
import { genreText } from "../constants/style-component/textComponent";

interface IDetailsMovieScreenProps extends NativeStackScreenProps<RootStackParamList, "DetailScreen"> {}

const DetailsMovieScreen = ({ navigation }: IDetailsMovieScreenProps) => {
  const { MovieDetailsState, reviewState } = useContext(DetailContext);
  const { genreState } = useContext(GlobalContext);
  const [active, setActive] = useState<number>();
  const [checkingState, setCheckingState] = useState<IAccountState>();
  const [ratingVal, setRatingVal] = useState<number>(0);

  const handleGoBack = () => {
    navigation.goBack();
  };

  console.log(MovieDetailsState["watch/providers"].results.AT.buy);
  const getUpdatedAccState = async (): Promise<void> => {
    try {
      const resFetchState: IAccountState = await fetchAccountState(MovieDetailsState.id);
      setCheckingState(resFetchState);
      if (typeof checkingState?.rated === "object") {
        setRatingVal(checkingState.rated.value);
      } else {
        setRatingVal(0);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    getUpdatedAccState();
    //handleRenderTrailer();
  }, []);

  return (
    <View style={{ flexGrow: 2 }}>
      <ScrollView contentContainerStyle={{ minHeight: setHeight(20) }}>
        {checkingState?.watchlist !== undefined ? (
          <>
            <HeaderContainerDetails
              selectedMovie={MovieDetailsState}
              onPress={handleGoBack}
              state={checkingState}
              setRating={setRatingVal}
              ratingVal={ratingVal}
            />
            {/* <ListCardButtons data={genreState} /> */}
            <View style={{ marginLeft: 32, paddingVertical: 24, width: "85%" }}>
              <FlatList
                data={MovieDetailsState["watch/providers"].results.AT.buy}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <ItemSeparator width={20} />}
                ListFooterComponent={() => <ItemSeparator width={20} />}
                renderItem={({ item, index }) => {
                  const handleActive = () => {
                    setActive(index);

                    //filterMovieByGenre(item, index);
                  };
                  const selectedButton: ViewStyle =
                    active === index ? { backgroundColor: Color.ACTIVE } : { backgroundColor: color.BASIC_BACKGROUND };
                  const selectedText: TextStyle =
                    active === index ? { color: Color.SECONDARY_COLOR, fontWeight: "800" } : { color: color.BLACK };

                  return (
                    <TouchableOpacity onPress={handleActive} key={index}>
                      <View style={{ ...CardContainer }}>
                        <Text style={genreText}>{item.provider_name}</Text>
                      </View>
                      {/* <GenreCard genre={item} isSelected={selectedButton} selectedText={selectedText} /> */}
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View style={homeCardContainer}>
              <SubContainerDetail overviewDetails={MovieDetailsState.overview} overViewStyle={overViewTextArea} />
              <ReviewContainerDetails reviewDetails={reviewState} overViewStyle={overViewTextArea} />
            </View>
          </>
        ) : (
          <Loader />
        )}
      </ScrollView>
    </View>
  );
};

export default DetailsMovieScreen;
const overViewTextArea: ViewStyle = {
  backgroundColor: Color.AMBER,
  borderRadius: 24,
  padding: 10,
};
