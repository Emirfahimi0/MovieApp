import { Dimensions, ViewStyle } from "react-native";
import { color } from "../Color";
export const { height, width } = Dimensions.get("screen");
export const setHeight = (h: number) => (height / 100) * h;
export const setWidth = (w: number) => (width / 100) * w;

export enum DrawerState {
  Open = height - 230,
  Peek = 230,
  Closed = 0,
}

//Login
export const Logincontainer: ViewStyle = {
  backgroundColor: color.AMBER,
  borderRadius: 24,
  alignContent: "space-between",
  flexDirection: "column",
  margin: 16,
  padding: 8,
  paddingTop: 42,
  height: "60%",
};
export const InputContainer: ViewStyle = {
  alignItems: "center",
  backgroundColor: color.SECONDARY_COLOR,
  borderRadius: 8,
  flexDirection: "row",
  margin: 8,
  padding: 8,
};

// -> use in Genre Card and Watch list
export const CardContainer: ViewStyle = {
  alignItems: "center",
  alignContent: "center",
  flexDirection: "row",
  backgroundColor: "#DFE0E0",
  borderRadius: 5,
  elevation: 3,
  paddingEnd: 8,
  justifyContent: "center",
  marginVertical: 2,
  paddingVertical: 8,
  width: setWidth(25),
};

// --> Home/Movie Screen Styling

export const shadowStyle: ViewStyle = {
  shadowColor: color.ACTIVE,
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 1.0,
  shadowRadius: 8,
};
export const movieContainer: ViewStyle = {
  backgroundColor: color.BUTTON,
  elevation: 4,
  flexDirection: "row",
  height: 200,
  justifyContent: "space-between",
  marginVertical: 12,
  width: 152,
  borderRadius: 20,
};

export const bottomCardContainer: ViewStyle = {
  ...shadowStyle,
  backgroundColor: color.ACTIVE,
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  elevation: 5,
  flex: 1,
};

export const SearchBar: ViewStyle = {
  alignItems: "center",
  backgroundColor: color.PRIMARY_COLOR,
  borderRadius: 20,
  flexDirection: "row",
  padding: 8,
  width: "90%",
};

export const ListPreviewMovie: ViewStyle = {
  flexDirection: "column",
  justifyContent: "center",
  margin: "auto",
  paddingHorizontal: 16,
  paddingTop: 8,
};

// --> Detail Movie Screen Styling

export const container: ViewStyle = {
  backgroundColor: color.BASIC_BACKGROUND,
  flex: 1,
  paddingBottom: 24,
};

export const headerContainerStyle: ViewStyle = {
  alignItems: "center",
  borderBottomRightRadius: 25,
  borderBottomLeftRadius: 25,
  backgroundColor: color.SECONDARY_COLOR,
  ...shadowStyle,
};
export const ImagePosterDetail: ViewStyle = {
  alignItems: "center",
  backgroundColor: color.SEMI_BLACK,
  borderRadius: 16,
  justifyContent: "center",
  elevation: 8,
  height: setHeight(60),
  width: setWidth(80),
};

// youtube webview style
export const youtubePlayerView: ViewStyle = {
  width: "100%",
  height: "100%",
  padding: 10,
  alignContent: "center",
  justifyContent: "center",
};
export const posterImage: FastImageStyle = {
  height: ImagePosterDetail.height,
  padding: "50%",
  borderRadius: ImagePosterDetail.borderRadius,
  width: ImagePosterDetail.width,
};

export const HeaderDetail: ViewStyle = {
  alignItems: "center",
  elevation: 16,
  flexDirection: "row",
  justifyContent: "space-around",
  left: 0,
  paddingHorizontal: 24,
  position: "absolute",
  right: 0,
  top: 32,
};
export const sectionStyle: ViewStyle = {
  alignItems: "center",
  height: setHeight(40),
  justifyContent: "center",
  width: setWidth(107),
};

export const smallDetail: ViewStyle = {
  paddingHorizontal: 24,
  paddingTop: 16,
  flexDirection: "row",
};
export const MovieDetailContainer: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 64,
};

export const ContainerRow: ViewStyle = {
  justifyContent: "center",
  flexDirection: "row",
  alignContent: "space-between",
  width: "24%",
};

export const OverviewContainer: ViewStyle = {
  marginTop: 30,
  backgroundColor: color.ACTIVE,
  flexDirection: "column",
  flex: 1.4,
  borderTopRightRadius: bottomCardContainer.borderTopRightRadius,
  borderTopLeftRadius: bottomCardContainer.borderTopLeftRadius,
  justifyContent: "space-between",
};

export const ButtonContainerRating: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 52,
  position: "relative",
};
