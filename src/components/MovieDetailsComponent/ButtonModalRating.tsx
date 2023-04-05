import { ButtonContainerRating, CardContainer } from "../../constants/Styling/ContainerStyling";
import { RatingText, genreText, subDetail } from "../../constants/Styling/TextStyleComponent";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import Color from "../../constants/Color";
import Icon from "react-native-vector-icons/Ionicons";
import { GlobalContext } from "../../Context/GlobalState";

export const ButtonModalRating = ({ movie }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [postRatingDisable, setPostRatingDisable] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(1);
  const review: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { storeRating, User, deleteStoreRating } = useContext(GlobalContext);
  const OpenModal = () => {
    console.log("Modal Opened");
    setVisible(true);
  };
  const HandlePostRating = () => {
    console.log("Submit Rating");
    console.log(rating);
    storeRating(rating, User, movie);
    setPostRatingDisable(true);
    setVisible(!visible);

    console.log("Visibility", visible);

    //To do --> Open modal and submit rating
  };

  const HandleSetRating = (value: number) => {
    setRating(value);
    console.log("rating is equal to -->", value);

    //To do
  };

  const HandleDeleteRating = () => {
    console.log("Delete Rating");
    setVisible(false);
    setRating(0);
    console.log(User);
    deleteStoreRating(User);
    setPostRatingDisable(false);
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
                  <TouchableOpacity disabled={postRatingDisable === true ? true : false} key={index} onPress={() => HandleSetRating(item)}>
                    {rating < item ? (
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
          <Text style={[genreText, { color: Color.WHITE }]}>{!postRatingDisable ? "Post Rating" : "Review Rating"}</Text>
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
