import { ButtonContainerRating, CardContainer } from "../../constants/style-component/ContainerStyling";
import { RatingText, genreText, subDetail } from "../../constants/style-component/TextStyleComponent";
import { Alert, Modal, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { useContext, useState } from "react";
import Color from "../../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import { GlobalContext } from "../../context/GlobalState";
import { deleteRatingbyId, postRatingbyId } from "../../services/api-services";
import { IRating, IMovieDetail, IAccountState } from "../../services";
import { MovieType, userRating } from "../../screens";

export interface IButtonModalRating {
  movie: MovieType | IMovieDetail;
  state: IAccountState;
}
export const ButtonModalRating = ({ movie, state }: IButtonModalRating) => {
  const { storeRating, userState, deleteStoreRating, ratingState } = useContext(GlobalContext);
  let checkRating: userRating | undefined = ratingState.find((rate) => rate.user.id === userState.id);
  const disabledRating = checkRating ? true : false;
  const [visible, setVisible] = useState<boolean>(false);
  // const [postRatingDisable, setPostRatingDisable] = useState<boolean | object>(state.rated);
  const [ratingVal, setRatingVal] = useState<number>(0);
  const review: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //   if (postRatingDisable === undefined) {
  //     setPostRatingDisable(false);
  //   }

  // if(postRatingDisable !=false){

  // }

  const openModal = () => {
    setVisible(true);
  };

  const HandlePostRating = async () => {
    const resRating: IRating = await postRatingbyId(movie.id, ratingVal);
    if (resRating.success === true) {
      Alert.alert("Rating posted succesfully.");
      storeRating(ratingVal, userState, movie);
      // setPostRatingDisable(false);
      setVisible(visible);
    } else Alert.alert("unknown error occured");
    // setPostRatingDisable(true);
    setVisible(!visible);

    //To do --> Open modal and submit rating
  };

  const HandleSetRating = (value: number) => {
    // setPostRatingDisable(false);
    setRatingVal(value);

    //To do
  };

  const HandleDeleteRating = async () => {
    console.log("rating", ratingVal);
    const resRating: IRating = await deleteRatingbyId(movie.id, ratingVal);
    console.log(resRating);
    if (resRating.status_code === 13) {
      Alert.alert("rating deleted successfully.");
      setVisible(false);
      setRatingVal(0);
      console.log("Delete Rating");
      // setPostRatingDisable(false);
      deleteStoreRating(userState);
    }
  };

  return (
    <View style={ButtonContainerRating}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(!visible);
        }}>
        <View style={centeredViewRating}>
          <View style={modalViewRating}>
            <Icon name="heart-sharp" size={20} color={Color.GREEN} />
            <Text style={subDetail}>Pls Submit your Review..</Text>
            <View style={RatingStarIcon}>
              {review.map((item, index) => {
                return (
                  <TouchableOpacity disabled={state.rated !== false} key={index} onPress={() => HandleSetRating(item)}>
                    {ratingVal < item ? (
                      <Icon name="heart-outline" size={20} color="black" />
                    ) : (
                      <Icon name="heart-sharp" size={25} color="red" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity
              style={{ ...CardContainer, marginTop: 30, backgroundColor: state.rated !== false ? Color.HEART : Color.ACTIVE }}
              onPress={state.rated !== false ? HandleDeleteRating : HandlePostRating}>
              <Text style={RatingText}>{state.rated !== false ? "Delete Rating" : "Post Rating"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={openModal}>
        <View style={{ ...CardContainer, backgroundColor: Color.ACTIVE, width: 150 }}>
          <Text style={{ ...genreText, color: Color.WHITE }}>{state.rated !== false ? "Review Rating" : "Post Rating"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const centeredViewRating: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
};
const modalViewRating: ViewStyle = {
  margin: 20,
  width: 300,
  height: 200,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  flexDirection: "column",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
};

const RatingStarIcon: ViewStyle = {
  paddingTop: 25,
  flexDirection: "row",
  justifyContent: "space-evenly",
};
