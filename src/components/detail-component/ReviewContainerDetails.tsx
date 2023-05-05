import { container, setHeight, setWidth, shadowStyle } from "../../constants/style-component/viewComponent";
import { OverviewDetailsText, normalText, subHeader } from "../../constants/style-component/textComponent";
import { ScrollView, Text, View } from "react-native";
import color from "../../constants/Color";
import React, { Fragment, useState } from "react";

// interface IReviewContainerDetail {
// reviewDetails:
// }

const ReviewContainerDetails = ({ reviewDetails, overViewStyle }) => {
  const [active, setActive] = useState<number>(0);

  return (
    <Fragment>
      <Text style={{ ...subHeader, fontSize: 16, marginLeft: 32, color: color.ACTIVE }}>Reviews</Text>
      {reviewDetails.length > 0 ? (
        <View
          style={{ ...shadowStyle, backgroundColor: color.BLACK, borderRadius: 16, height: setHeight(16), margin: 12, marginBottom: 20 }}>
          <ScrollView nestedScrollEnabled={true} bounces={true}>
            {reviewDetails.map((item: IResultReview, index: number) => {
              let [showMore, setShowmore] = useState<Boolean>(true);

              const handleShowMore = () => {
                setActive(index);
                setShowmore(!showMore);
                // test
              };
              const showText = showMore ? item.content.split(" ").slice(0, 15).join(" ") : item.content;
              return (
                <View
                  style={{
                    alignSelf: "center",
                    width: setWidth(80),
                    minHeight: "auto",
                  }}
                  key={`${item.author}-${index}`}>
                  <View style={{ ...overViewStyle, backgroundColor: color.SECONDARY_COLOR, marginVertical: 12 }}>
                    <Text style={{ ...subHeader, color: color.GREEN }}>{item.author}</Text>
                    <Text style={{ ...OverviewDetailsText, color: color.SEMI_BLACK }}>{showText}</Text>
                    <Text style={{ ...normalText, textAlign: "right", color: color.BLACK, fontWeight: "800" }} onPress={handleShowMore}>
                      {showMore ? "Show more" : "Show less"}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View style={{ ...container, marginHorizontal: 20, backgroundColor: color.TRANSPARENT }}>
          <Text style={{ ...normalText, marginLeft: 16, paddingVertical: 16, fontSize: 16 }}>no review...</Text>
        </View>
      )}
    </Fragment>
  );
};

export default ReviewContainerDetails;
