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
        <View style={{ paddingTop: 56 }}>
          <Text style={{ ...DetailTextHeader }}>Synopsis</Text>
        </View>
        <View style={{ borderRadius: 16 }}>
          <Text style={{ ...OverviewDetailsText, color: color.ACTIVE }}>
            {showMore ? overviewDetails?.split(" ").slice(0, 20).join(" ") : overviewDetails}
          </Text>
          <Text
            style={{ fontFamily: Font.BOLD, textAlign: "right", color: color.ACTIVE, fontWeight: "800", fontSize: 12 }}
            onPress={() => setShowMore(!showMore)}>
            {showMore ? "Show more" : "Show less"}
          </Text>
        </View>
      </View>
    </>
  );
};
