import { ButtonContainerRating, CardContainer } from "../../constants/Styling/ContainerStyling";
import { RatingText, genreText, subDetail } from "../../constants/Styling/TextStyleComponent";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import Color from "../../constants/Color";
import Icon from "react-native-vector-icons/Ionicons";
import { GlobalContext } from "../../Context/GlobalState";
import { deleteRatingbyId, postRatingbyId } from "../../services/APIservices";
import { InterfaceRating, MovieDetail, accountState } from "../../services";
import { MovieType, userRating } from "../../screens";

export interface IbuttonModalRating {
  movie: MovieType | MovieDetail;
  state: accountState;
}
export const ButtonModalRating = ({ movie, state }: IbuttonModalRating) => {
  const { storeRating, User, deleteStoreRating, Rating } = useContext(GlobalContext);
  let checkRating: userRating | undefined = Rating.find((rate) => rate.user.id === User.id);
  const disabledRating = checkRating ? true : false;
  const [visible, setVisible] = useState<boolean>(false);
  const [postRatingDisable, setPostRatingDisable] = useState<boolean | object>(state.rated);
  const [ratingVal, setRatingVal] = useState<number>(0);
  const review: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [active, setActive] = useState<number>(0);
  if (typeof postRatingDisable === "object") {
    setPostRatingDisable(true);
    setRatingVal(state.rated.value);
  }

  const OpenModal = () => {
    console.log("Modal Opened");
    setVisible(true);
  };

  const HandlePostRating = async () => {
    console.log("Submit Rating");
    const resRating: InterfaceRating = await postRatingbyId(movie.id, ratingVal);
    console.log(resRating);
    if (resRating.success === true) {
      Alert.alert("Rating posted succesfully.");
      storeRating(ratingVal, User, movie);
      setPostRatingDisable(false);
      setVisible(visible);
    } else Alert.alert("unknown error occured");
    setPostRatingDisable(true);
    setVisible(!visible);

    //To do --> Open modal and submit rating
  };

  const HandleSetRating = (value: number) => {
    setPostRatingDisable(false);
    setRatingVal(value);
    console.log("rating is equal to -->", value);

    //To do
  };

  const HandleDeleteRating = async () => {
    console.log("rating", ratingVal);
    const resRating: InterfaceRating = await deleteRatingbyId(movie.id, ratingVal);
    console.log(resRating);
    if (resRating.status_code === 13) {
      Alert.alert("rating deleted successfully.");
      setVisible(false);
      setRatingVal(0);
      console.log("Delete Rating");
      console.log(User);
      setPostRatingDisable(false);
      deleteStoreRating(User);
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
        <View style={styles.centeredViewRating}>
          <View style={styles.modalViewRating}>
            <Text style={subDetail}>Pls Submit your Review..</Text>
            <View style={styles.RatingStarIcon}>
              {review.map((item, index) => {
                return (
                  <TouchableOpacity disabled={postRatingDisable ? true : false} key={index} onPress={() => HandleSetRating(item)}>
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
              style={[CardContainer, { marginTop: 30, backgroundColor: postRatingDisable === false ? Color.ACTIVE : Color.HEART }]}
              onPress={() => {
                postRatingDisable === true ? HandleDeleteRating() : HandlePostRating();
              }}>
              <Text style={RatingText}>{postRatingDisable === true ? "Delete Rating" : "Post Rating"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => OpenModal()}>
        <View style={[CardContainer, { backgroundColor: Color.ACTIVE, width: 150 }]}>
          <Text style={[genreText, { color: Color.WHITE }]}>{postRatingDisable ? "Review Rating" : "Post Rating"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredViewRating: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalViewRating: {
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
  },

  RatingStarIcon: {
    paddingTop: 25,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
