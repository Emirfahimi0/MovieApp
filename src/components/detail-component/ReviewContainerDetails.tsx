import { setHeight, setWidth, shadowStyle } from "../../constants/style-component/viewComponent";
import { Image, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";
import { OverviewDetailsText, subHeader } from "../../constants/style-component/textComponent";
import color from "../../constants/Color";
import React, { Fragment, useState } from "react";
import Font from "../../constants/Font";
import { ItemSeparator } from "../movie-component/ItemSeparator";

interface IReviewContainerDetail {
  DetailTextHeader: TextStyle;
  StyleTextArea: ViewStyle;
  reviewDetails: IResultReview[];
}

const ReviewContainerDetails = ({ reviewDetails, StyleTextArea, DetailTextHeader }: IReviewContainerDetail) => {
  const [active, setActive] = useState<number>(0);
  const fetchAvatarImage = (avatar_path: string) => {
    return RegExp("https://secure.gravatar.com/avatar").test(`${avatar_path}` as string)
      ? `${avatar_path?.replace("/", "")}?s=128`
      : `https://image.tmdb.org/t/p/w64_and_h64_face${avatar_path}`;
  };

  const parseDate = (dateString: string) => {
    let parts = dateString.split("-") as string[];
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    let mydate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const longMonthName = mydate.toLocaleString("default", { month: "long" });
    const res = mydate.toDateString().split(" ");
    const unknownDate = res.filter((ele) => {
      return ele === "Invalid" ? true : false;
    });
    if (unknownDate.length > 0) return "";
    const resString = `${longMonthName} ${res[2]}, ${res[3]}`;
    return resString;
  };
  const checkExistReview = reviewDetails.length < 1 ? false : true;

  const textShowMore: TextStyle = {
    color: color.BLACK,
    fontFamily: Font.BOLD,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "right",
    justifyContent: "space-evenly",
  };

  return (
    <Fragment>
      <View
        style={{
          marginHorizontal: 16,
          borderRadius: 8,
        }}>
        <Text style={{ ...DetailTextHeader, justifyContent: "center" }}>Reviews</Text>
      </View>

      <View
        style={{
          ...(checkExistReview ? shadowStyle : null),
          backgroundColor: !checkExistReview ? color.BLACK : color.SEMI_BLACK,
          borderRadius: 16,
          height: checkExistReview ? setHeight(24) : "auto",
          margin: 12,
          marginBottom: checkExistReview ? 0 : 8,
        }}>
        {reviewDetails.length > 0 ? (
          <ScrollView
            automaticallyAdjustContentInsets={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
            bounces={false}
            showsHorizontalScrollIndicator={true}
            decelerationRate={"normal"}
            horizontal={true}
            indicatorStyle={"white"}
            nestedScrollEnabled={true}
            disableIntervalMomentum={true}
            snapToInterval={344}>
            <ItemSeparator width={12} />
            {reviewDetails.map((item: IResultReview, index: number) => {
              let [showMore, setShowmore] = useState<Boolean>(true);

              const showText = showMore ? item.content.split(" ").slice(0, 10).join(" ") : item.content;

              showText.length <= item.content.length ? !showMore : showMore;

              return (
                <View
                  style={{
                    alignSelf: "center",
                    margin: 16,
                    width: setWidth(80),
                  }}
                  key={`${item.author}-${index}`}>
                  <ScrollView
                    contentContainerStyle={{ paddingBottom: 24 }}
                    style={{
                      ...StyleTextArea,
                      backgroundColor: color.SECONDARY_COLOR,
                      width: setWidth(80),
                      height: setHeight(16),
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "space-between",
                      }}>
                      {item.author_details ? (
                        <View
                          style={{
                            width: setWidth(9),
                            height: setHeight(4.1),
                            backgroundColor: color.AMBER,
                            borderRadius: 50,
                            zIndex: -1,
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                          {item.author_details.avatar_path ? (
                            <Image
                              source={{ uri: fetchAvatarImage(item.author_details.avatar_path as string) }}
                              style={{ width: "80%", height: "80%", borderRadius: 50, resizeMode: "cover" }}
                            />
                          ) : (
                            <Text style={{ fontSize: 16, color: color.SECONDARY_COLOR }}> {item.author_details.username[0]}</Text>
                          )}
                        </View>
                      ) : null}
                      <Text style={{ ...subHeader, color: color.GREEN }}> {item.author}</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignContent: "flex-end" }}>
                      <Text style={{ ...subHeader, color: color.GRAY }}>Posted on {parseDate(item.created_at)}</Text>
                      <Text style={{ ...OverviewDetailsText, color: color.ACTIVE }}>{showText}</Text>
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                      <Text style={{ ...textShowMore }} onPress={() => setShowmore(!showMore)}>
                        {showMore ? "Show more" : "Show less"}
                      </Text>
                    </View>
                  </ScrollView>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <Text
            style={{
              color: color.SECONDARY_COLOR,
              fontFamily: Font.BOLD,
              fontSize: 14,
              marginLeft: 16,
              paddingVertical: 16,
              textAlign: "center",
            }}>
            no review...
          </Text>
        )}
      </View>
    </Fragment>
  );
};

export default ReviewContainerDetails;
