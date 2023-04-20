import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { genreText, OverviewDetailsText, subHeader } from "../../constants/style-component/textComponent";
import Color from "../../constants/color";

export const SubContainerDetail = ({ overviewDetails, overViewStyle }) => {
  const [showMore, setShowmore] = useState<Boolean>(true);
  const handleShowMore = () => {
    setShowmore(!showMore);
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ ...subHeader, fontSize: 16, marginLeft: 12, color: Color.HEART, paddingVertical: 16 }}>Overview</Text>
      <ScrollView>
        <View style={overViewStyle}>
          <Text style={{ ...OverviewDetailsText, color: Color.SECONDARY_COLOR }}>
            {showMore ? overviewDetails.split(" ").slice(0, 20).join(" ") : overviewDetails}
          </Text>
          <Text style={{ ...genreText, textAlign: "right", color: Color.SECONDARY_COLOR, fontWeight: "600" }} onPress={handleShowMore}>
            {showMore ? "Show more" : "Show less"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
