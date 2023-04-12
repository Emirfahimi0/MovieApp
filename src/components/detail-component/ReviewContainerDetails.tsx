import { ScrollView, Text, View } from "react-native";
import React, { Fragment, useState } from "react";
import { OverviewContainer, container } from "../../constants/style-component/ContainerStyling";
import { OverviewDetailsText, genreText, subHeader } from "../../constants/style-component/TextStyleComponent";
import Color from "../../constants/color";
import { IResult } from "../../services";

const ReviewContainerDetails = ({ review, overViewStyle }) => {
  const [active, setActive] = useState<number>(0);

  return (
    <View style={[OverviewContainer, { padding: 20 }]}>
      <Text style={{ ...subHeader, marginLeft: 15, color: Color.ACTIVE, paddingBottom: 15 }}>REVIEWS</Text>
      {review.length > 1 ? (
        <Fragment>
          <ScrollView>
            {review.map((review: IResult, index: number) => {
              const [showMore, setShowmore] = useState<Boolean>(true);

              const handleShowMore = () => {
                setActive(index);
                setShowmore(!showMore);
                // test
              };

              const showText = showMore ? review.content.split(" ").slice(0, 15).join(" ") : review.content;

              return (
                <View style={{ padding: 10 }} key={`${review.author}-${index}`}>
                  <View style={{ ...overViewStyle, backgroundColor: Color.BLUE }}>
                    <Text style={{ ...subHeader, color: Color.PURPLE }}>{review.author}</Text>
                    <Text style={{ ...OverviewDetailsText, color: Color.WHITE }}>{showText}</Text>
                    <Text style={{ ...genreText, textAlign: "right", color: Color.WHITE, fontWeight: "800" }} onPress={handleShowMore}>
                      {showMore ? "Show more" : "Show less"}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </Fragment>
      ) : (
        <View style={{ ...container, marginLeft: 15, backgroundColor: Color.BLACK }}>
          <Text style={{ ...subHeader, color: Color.WHITE }}>no review...</Text>
        </View>
      )}
    </View>
  );
};

export default ReviewContainerDetails;
