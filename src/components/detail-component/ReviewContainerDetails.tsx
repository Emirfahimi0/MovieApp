import { IResult } from "../../services";
import { container, setWidth } from "../../constants/style-component/viewComponent";
import { OverviewDetailsText, genreText, subHeader } from "../../constants/style-component/textComponent";
import { ScrollView, Text, View } from "react-native";
import Color from "../../constants/color";
import React, { Fragment, useState } from "react";

const ReviewContainerDetails = ({ reviewDetails, overViewStyle }) => {
  const [active, setActive] = useState<number>(0);

  return (
    <View>
      {reviewDetails.length > 0 ? (
        <Fragment>
          <Text style={{ ...subHeader, fontSize: 16, marginLeft: 32, color: Color.ACTIVE, paddingVertical: 16 }}>Reviews</Text>
          {reviewDetails.map((item: IResult, index) => {
            let [showMore, setShowmore] = useState<Boolean>(true);

            const handleShowMore = () => {
              setActive(index);
              setShowmore(!showMore);
              // test
            };
            const showText = showMore ? item.content.split(" ").slice(0, 15).join(" ") : item.content;
            return (
              <View style={{ padding: 10, width: setWidth(100) }} key={`${item.author}-${index}`}>
                <ScrollView contentContainerStyle={{ ...overViewStyle, backgroundColor: Color.PRIMARY_COLOR }}>
                  <Text style={{ ...subHeader, color: Color.BLACK }}>{item.author}</Text>
                  <Text style={{ ...OverviewDetailsText, color: Color.SECONDARY_COLOR }}>{showText}</Text>
                  <Text
                    style={{ ...genreText, textAlign: "right", color: Color.SECONDARY_COLOR, fontWeight: "800" }}
                    onPress={handleShowMore}>
                    {showMore ? "Show more" : "Show less"}
                  </Text>
                </ScrollView>
              </View>
            );
          })}
        </Fragment>
      ) : (
        <View style={{ ...container, marginLeft: 15, backgroundColor: Color.BLACK }}>
          <Text style={{ ...subHeader, color: Color.SECONDARY_COLOR }}>no review...</Text>
        </View>
      )}
    </View>
  );
};

export default ReviewContainerDetails;
