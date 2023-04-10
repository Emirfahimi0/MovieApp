import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { OverviewContainer } from "../../constants/Styling/ContainerStyling";
import { OverviewDetailsText, genreText, subHeader } from "../../constants/Styling/TextStyleComponent";
import Color from "../../constants/Color";
import { Result } from "../../services";

const ReviewContainerDetails = ({ review, overViewStyle }) => {
  const [active, setActive] = useState<number>(0);

  return (
    <View style={[OverviewContainer, { padding: 20 }]}>
      <Text style={[subHeader, { marginLeft: 15, color: Color.ACTIVE, paddingBottom: 15 }]}>REVIEWS</Text>
      <ScrollView>
        {review.map((review: Result, index: number) => {
          const [showMore, setShowmore] = useState<Boolean>(true);
          // const { isShown = false } = review;
          // updatedIsShown = isShown;
          const handleShowMore = () => {
            setActive(index);
            setShowmore(!showMore);
            // updatedIsShown = !updatedIsShown;
            // setShowmore(!showMore);
          };

          const showText = showMore ? review.content.split(" ").slice(0, 15).join(" ") : review.content;

          return (
            <View style={{ padding: 10 }} key={`${review.author}-${index}`}>
              <View style={[overViewStyle, { backgroundColor: Color.BLUE }]}>
                <Text style={[subHeader, { color: Color.PURPLE }]}>{review.author}</Text>
                <Text style={[OverviewDetailsText, { color: Color.WHITE }]}>{showText}</Text>
                <Text style={[genreText, { textAlign: "right", color: Color.WHITE, fontWeight: "800" }]} onPress={handleShowMore}>
                  {showMore ? "Show more" : "Show less"}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ReviewContainerDetails;
