import { Text, View } from "react-native";
import React, { useState } from "react";
import { normalText, OverviewDetailsText } from "../../constants/style-component/textComponent";
import color from "../../constants/Color";
import Font from "../../constants/Font";

export const SubContainerDetail = ({ overviewDetails, overViewStyle, DetailTextHeader }) => {
  const [showMore, setShowmore] = useState<Boolean>(true);
  const handleShowMore = () => {
    setShowmore(!showMore);
  };
  return (
    <>
      <View style={{ margin: 16, paddingVertical: 8 }}>
        <View style={{ ...overViewStyle, borderRadius: 16, backgroundColor: color.SEMI_BLACK }}>
          <View style={{ paddingVertical: 8, alignItems: "center" }}>
            <Text style={{ ...DetailTextHeader }}>Overview</Text>
          </View>
          <Text style={{ ...OverviewDetailsText, color: color.SECONDARY_COLOR }}>
            {showMore ? overviewDetails.split(" ").slice(0, 20).join(" ") : overviewDetails}
          </Text>
          <Text
            style={{ fontFamily: Font.BOLD, textAlign: "right", color: color.SECONDARY_COLOR, fontWeight: "800", fontSize: 12 }}
            onPress={handleShowMore}>
            {showMore ? "Show more" : "Show less"}
          </Text>
        </View>
      </View>
    </>
  );
};
