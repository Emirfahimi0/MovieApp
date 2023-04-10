import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { OverviewContainer } from "../../constants/Styling/ContainerStyling";
import { genreText, OverviewDetailsText, subHeader } from "../../constants/Styling/TextStyleComponent";
import Color from "../../constants/Color";

export const SubContainerDetail = ({ overview, overViewStyle }) => {
  const [showMore, setShowmore] = useState<Boolean>(true);
  const handleShowMore = () => {
    setShowmore(!showMore);
  };
  return (
    <View style={[OverviewContainer, { padding: 20 }]}>
      <Text style={[subHeader, { marginLeft: 15, color: Color.HEART, paddingBottom: 15 }]}>Overview</Text>
      <ScrollView>
        <View style={overViewStyle}>
          <Text style={[OverviewDetailsText, { color: Color.WHITE }]}>
            {showMore ? overview.split(" ").slice(0, 20).join(" ") : overview}
          </Text>
          <Text style={[genreText, { textAlign: "right", color: Color.WHITE, fontWeight: "600" }]} onPress={handleShowMore}>
            {showMore ? "Show more" : "Show less"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
