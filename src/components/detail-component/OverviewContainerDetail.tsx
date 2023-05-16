import { Text, TextStyle, View, ViewStyle } from "react-native";
import React, { useState } from "react";
import { OverviewDetailsText } from "../../constants/style-component/textComponent";
import color from "../../constants/Color";
import Font from "../../constants/Font";
interface ISubContainerDetails {
  DetailTextHeader: TextStyle;
  overviewDetails: string | undefined;
  StyleTextArea: ViewStyle;
}
export const SubContainerDetail = ({ overviewDetails, DetailTextHeader }: ISubContainerDetails) => {
  const [showMore, setShowmore] = useState<Boolean>(true);
  const handleShowMore = () => {
    setShowmore(!showMore);
  };
  return (
    <>
      <View style={{ padding: 16 }}>
        <View style={{ borderRadius: 16 }}>
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ ...DetailTextHeader }}>Overview</Text>
          </View>
          <Text style={{ ...OverviewDetailsText, color: color.ACTIVE }}>
            {showMore ? overviewDetails?.split(" ").slice(0, 20).join(" ") : overviewDetails}
          </Text>
          <Text
            style={{ fontFamily: Font.BOLD, textAlign: "right", color: color.PRIMARY_COLOR, fontWeight: "800", fontSize: 12 }}
            onPress={handleShowMore}>
            {showMore ? "Show more" : "Show less"}
          </Text>
        </View>
      </View>
    </>
  );
};
