import { IResult } from "../../services";
import { OverviewContainer, container } from "../../constants/style-component/ContainerStyling";
import { OverviewDetailsText, genreText, subHeader } from "../../constants/style-component/TextStyleComponent";
import { ScrollView, Text, View } from "react-native";
import Color from "../../constants/color";
import React, { Fragment, useState } from "react";

const ReviewContainerDetails = ({ reviewDetails, overViewStyle }) => {
  const [active, setActive] = useState<number>(0);
  return (
    <View style={[OverviewContainer, { padding: 20 }]}>
      <Text style={{ ...subHeader, marginLeft: 15, color: Color.ACTIVE, paddingBottom: 15 }}>REVIEWS</Text>
      {reviewDetails.length > 1 ? (
        <Fragment>
          <ScrollView>
            {reviewDetails.map((item: IResult, index: number) => {
              const [showMore, setShowmore] = useState<Boolean>(true);

              const handleShowMore = () => {
                setActive(index);
                setShowmore(!showMore);
                // test
              };

              const showText = showMore ? item.content.split(" ").slice(0, 15).join(" ") : item.content;

              return (
                <View style={{ padding: 10 }} key={`${item.author}-${index}`}>
                  <View style={{ ...overViewStyle, backgroundColor: Color.BLUE }}>
                    <Text style={{ ...subHeader, color: Color.PURPLE }}>{item.author}</Text>
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
