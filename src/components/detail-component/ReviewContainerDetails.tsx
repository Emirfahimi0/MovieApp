import { IResultReview } from "../../services";
import { container, setWidth } from "../../constants/style-component/viewComponent";
import { OverviewDetailsText, normalText, subHeader } from "../../constants/style-component/textComponent";
import { ScrollView, Text, View } from "react-native";
import color from "../../constants/Color";
import React, { Fragment, useState } from "react";

const ReviewContainerDetails = ({ reviewDetails, overViewStyle }) => {
  const [active, setActive] = useState<number>(0);

  return (
    <View>
      <Text style={{ ...subHeader, fontSize: 16, marginLeft: 32, color: color.ACTIVE, paddingVertical: 16 }}>Reviews</Text>
      {reviewDetails.length > 0 ? (
        <Fragment>
          {reviewDetails.map((item: IResultReview, index) => {
            let [showMore, setShowmore] = useState<Boolean>(true);

            const handleShowMore = () => {
              setActive(index);
              setShowmore(!showMore);
              // test
            };
            const showText = showMore ? item.content.split(" ").slice(0, 15).join(" ") : item.content;
            return (
              <View style={{ padding: 10, width: setWidth(100) }} key={`${item.author}-${index}`}>
                <ScrollView contentContainerStyle={{ ...overViewStyle, backgroundColor: color.PRIMARY_COLOR }}>
                  <Text style={{ ...subHeader, color: color.GREEN }}>{item.author}</Text>
                  <Text style={{ ...OverviewDetailsText, color: color.SECONDARY_COLOR }}>{showText}</Text>
                  <Text
                    style={{ ...normalText, textAlign: "right", color: color.SECONDARY_COLOR, fontWeight: "800" }}
                    onPress={handleShowMore}>
                    {showMore ? "Show more" : "Show less"}
                  </Text>
                </ScrollView>
              </View>
            );
          })}
        </Fragment>
      ) : (
        <View style={{ ...container, marginHorizontal: 20, backgroundColor: color.TRANSPARENT }}>
          <Text style={{ ...normalText, marginLeft: 16, paddingVertical: 16, fontSize: 16 }}>no review...</Text>
        </View>
      )}
    </View>
  );
};

export default ReviewContainerDetails;
