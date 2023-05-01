import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { normalText, OverviewDetailsText, subHeader } from "../../constants/style-component/textComponent";
import color from "../../constants/Color";

export const SubContainerDetail = ({ overviewDetails, overViewStyle }) => {
  const [showMore, setShowmore] = useState<Boolean>(true);
  const handleShowMore = () => {
    setShowmore(!showMore);
  };
  return (
    <>
      <View style={{ margin: 16, paddingVertical: 8 }}>
        <View style={{ ...overViewStyle, borderRadius: 10, backgroundColor: color.LIGHT_GRAY }}>
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ ...subHeader, fontSize: 16, marginLeft: 12, color: color.SECONDARY_COLOR }}>Overview</Text>
          </View>
          <Text style={{ ...OverviewDetailsText, color: color.SECONDARY_COLOR }}>
            {showMore ? overviewDetails.split(" ").slice(0, 20).join(" ") : overviewDetails}
          </Text>
          <Text style={{ ...normalText, textAlign: "right", color: color.SECONDARY_COLOR, fontWeight: "600" }} onPress={handleShowMore}>
            {showMore ? "Show more" : "Show less"}
          </Text>
        </View>
      </View>
    </>
  );
};
