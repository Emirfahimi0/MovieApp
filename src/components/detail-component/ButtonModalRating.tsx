import { Modal, Pressable, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { ButtonContainerRating, CardContainer } from "../../constants/style-component/viewComponent";
import { deleteRatingbyId, postRatingbyId } from "../../services/api-services";
import { RatingText, normalText, subDetail } from "../../constants/style-component/textComponent";
import color from "../../constants/Color";
import Icon from "react-native-vector-icons/Ionicons";
import React, { Dispatch, SetStateAction, useState } from "react";

export interface IButtonModalRating {
  postRatingDisable: boolean | { value: number } | undefined;
  ratingVal: number;
  selectedMovie: TMovieType | IMovieDetail | undefined;
  setPostRatingDisable: Dispatch<SetStateAction<boolean | { value: number } | undefined>>;
  setRating: Dispatch<SetStateAction<number>>;
  ToastMessage: (type: string, title: string, message: string) => void;
}
export const ButtonModalRating = ({
  postRatingDisable,
  ratingVal,
  selectedMovie,
  setPostRatingDisable,
  setRating,
  ToastMessage,
}: IButtonModalRating) => {
  const [visible, setVisible] = useState<boolean>(false);

  const review: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let subMessage = "";
  let successMessage = "";
  let title = `${selectedMovie}`;

  const openModal = () => {
    setVisible(true);
  };

  const HandlePostRating = async () => {
    const resRating: IRating = await postRatingbyId(selectedMovie?.id, ratingVal);
    successMessage = resRating.success ? "success" : "error";
    if (resRating.success === true) {
      title = `Rating posted ${successMessage}`;
      setVisible(visible);
      setPostRatingDisable(true);
    }
    // setVisible(!visible);
    ToastMessage(successMessage, title, resRating.status_message);
  };

  const HandleSetRating = (value: number) => {
    // setPostRatingDisable(false);
    setRating(value);

    //To do
  };

  const HandleDeleteRating = async () => {
    const resRating: IRating = await deleteRatingbyId(selectedMovie?.id, ratingVal);
    subMessage = resRating.status_message;
    successMessage = resRating.success ? "success" : "error";
    if (resRating.status_code === 13) {
      title = "Rating deleted successful";
      setVisible(false);
      setRating(0);
      setPostRatingDisable(false);
    }
    //getUpdatedAccState();
    ToastMessage(successMessage, title, subMessage);
  };
  let disable = postRatingDisable ? false : true;

  const outsideViewRating: ViewStyle = {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  };
  const modalViewRating: ViewStyle = {
    margin: 20,
    width: 250,
    height: "auto",
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

  return (
    <View style={ButtonContainerRating}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          postRatingDisable;
          setVisible(!visible);
        }}>
        <View style={outsideViewRating}>
          <TouchableOpacity onPressOut={() => setVisible(false)} style={{ ...outsideViewRating }}>
            <Pressable onPress={() => setVisible(true)}>
              <View style={modalViewRating}>
                <Icon name="star-outline" size={20} color={color.GREEN} />
                <Text style={{ ...subDetail, color: color.ACTIVE }}> Submit your Review..</Text>
                <View style={RatingStarIcon}>
                  {review.map((item, index) => {
                    return (
                      <TouchableOpacity disabled={disable ? false : true} key={index} onPress={() => HandleSetRating(item)}>
                        {ratingVal < item ? (
                          <Icon name="star-outline" size={20} color="black" />
                        ) : (
                          <Icon name="star" size={25} color="#F1DB4B" />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <TouchableOpacity
                  style={{ ...CardContainer, marginTop: 30, backgroundColor: disable ? color.ACTIVE : color.PRIMARY_COLOR }}
                  onPress={disable ? HandlePostRating : HandleDeleteRating}>
                  <Text style={{ ...RatingText, color: color.SECONDARY_COLOR }}>{disable ? "Post Rating" : "Delete Rating"}</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity onPress={openModal}>
        <View style={{ ...CardContainer, backgroundColor: color.ACTIVE, width: 150 }}>
          <Text style={{ ...normalText, color: color.SECONDARY_COLOR }}>{disable ? "Post Rating" : "Review Rating"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
