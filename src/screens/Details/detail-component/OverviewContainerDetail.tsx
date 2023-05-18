import { Text, TextStyle, View, ViewStyle } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { OverviewDetailsText, Font, color } from "../../../constants";
interface ISubContainerDetails {
  DetailTextHeader: TextStyle;
  overviewDetails: string | undefined;
  StyleTextArea: ViewStyle;
  setShowMore: Dispatch<SetStateAction<boolean>>;
  showMore: boolean;
}
export const SubContainerDetail = ({ overviewDetails, DetailTextHeader, showMore, setShowMore }: ISubContainerDetails) => {
  return (
    <>
      <View style={{ padding: 16 }}>
        <View style={{ borderRadius: 16 }}>
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ ...DetailTextHeader }}>Overview</Text>
          </View>
          <Text style={{ ...OverviewDetailsText, color: color.SECONDARY_COLOR }}>
            {showMore ? overviewDetails?.split(" ").slice(0, 20).join(" ") : overviewDetails}
          </Text>
          <Text
            style={{ fontFamily: Font.BOLD, textAlign: "right", color: color.PRIMARY_COLOR, fontWeight: "800", fontSize: 12 }}
            onPress={() => setShowMore(!showMore)}>
            {showMore ? "Show more" : "Show less"}
          </Text>
        </View>
      </View>
    </>
  );
};
