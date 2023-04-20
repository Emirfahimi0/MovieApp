import { IResult } from "../../services";
import { OverviewContainer, container, setHeight, setWidth } from "../../constants/style-component/viewComponent";
import { OverviewDetailsText, genreText, subHeader } from "../../constants/style-component/textComponent";
import { FlatList, ScrollView, Text, View } from "react-native";
import Color from "../../constants/color";
import React, { Fragment, useState } from "react";
import { CardButtons } from "../movie-component/CardButton";
import { ItemSeparator } from "../movie-component/ItemSeparator";

const ReviewContainerDetails = ({ reviewDetails, overViewStyle }) => {
  const [active, setActive] = useState<number>(0);
  let [showMore, setShowmore] = useState<Boolean>(true);

  return (
    <View style={showMore ? { width: 500 } : { width: setWidth(100) }}>
      <Text style={{ ...subHeader, fontSize: 16, marginLeft: 15, color: Color.ACTIVE, paddingVertical: 15 }}>REVIEWS</Text>
      {reviewDetails.length > 0 ? (
        <Fragment>
          <FlatList
            data={reviewDetails}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item, index }) => {
              const handleShowMore = () => {
                setActive(index);
                setShowmore(!showMore);
                // test
              };

              const showText = showMore ? item.content.split(" ").slice(0, 15).join(" ") : item.content;

              return (
                <View
                  style={{ padding: 50, backgroundColor: "red", width: showMore ? setWidth(120) : setWidth(150) }}
                  key={`${item.author}-${index}`}>
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
            }}
          />
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
