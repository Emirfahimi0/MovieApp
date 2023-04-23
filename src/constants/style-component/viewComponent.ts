const { height, width } = Dimensions.get("screen");
const h = 40
const w = 145
export const setHeight = (h:number) => (height/100) *h
export const setWidth = (w:number) => (width / 100) * w;
import { Dimensions, ImageStyle, ViewStyle } from "react-native";
import color from "../Color";

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
  alignContent:"center",
  flexDirection:"row",
  backgroundColor: "#DFE0E0",
  borderRadius: 5,
  elevation: 3,
  paddingEnd:9,
  justifyContent: "center",
  marginVertical: 2,
  paddingVertical: 8,
  width: setWidth(25),
};



  // --> Home/Movie Screen Styling

export const movieContainer:ViewStyle= {
    backgroundColor: color.BUTTON,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 4,
    flexDirection: "row",
    height: 200,
    justifyContent: "space-between",
    marginVertical: 12,
    width: 150,
  }

  export const homeCardContainer:ViewStyle={
    backgroundColor: color.SECONDARY_COLOR,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 3,
    flex:1,
    marginTop: 54,
    paddingTop: 8,
    shadowColor: color.LIGHT_GRAY,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1.0,
    shadowRadius: 16,
  }

 export const  SearchBar:ViewStyle= {
    alignItems: "center",
    backgroundColor: color.SECONDARY_COLOR,
    borderRadius: 12,
    flexDirection: "row",
    padding: 10,
    width: "80%",
    
  }

  

 export const ListPreviewMovie:ViewStyle = {
    flexDirection: "column",
    margin: 4,
    paddingHorizontal:24,
    paddingTop: 8,
  }

  export const ImagePoster :ImageStyle={

    borderBottomLeftRadius: movieContainer.borderBottomLeftRadius,
    borderTopRightRadius: movieContainer.borderTopRightRadius,
    height: movieContainer.height,
    width:150,
  }

  // --> Detail Movie Screen Styling

  export const container :ViewStyle = {

    backgroundColor:color.BASIC_BACKGROUND,
    flex:1,
  }
export const  ImagePosterDetail:ViewStyle = {

  alignItems:"center",
  backgroundColor:color.SEMI_BLACK,
  borderRadius:60,
  justifyContent:"center",
  elevation: 3,
  width:setWidth(w-250),
}
export const posterImage:ImageStyle = {

  height:ImagePosterDetail.height,
  padding:"50%",
  borderRadius:ImagePosterDetail.borderRadius,
  resizeMode:"cover",
width:ImagePosterDetail.width}

export const HeaderDetail:ViewStyle = {

  alignItems:"center",
  elevation:16,
  flexDirection:"row",
  justifyContent:"space-around",
  left:0,
  paddingHorizontal:24,
  position:"absolute",
  right:0,
  top:32,
}
export const noDataStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: setWidth(4),
};

export const smallDetail : ViewStyle ={
  paddingHorizontal: 24,
  paddingTop: 16,
  flexDirection:"row"
}
export const MovieDetailContainer:ViewStyle = {

  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: smallDetail.paddingHorizontal,
}

export const ContainerRow :ViewStyle ={
  
    justifyContent:"center",
    flexDirection: "row",
    alignContent:"space-between",
    width:"15%",
    paddingLeft:20

    
}

export const OverviewContainer:ViewStyle = {

  marginTop:30,
  backgroundColor:color.ACTIVE,
  flexDirection: "column",
  flex:1.4,
  borderTopRightRadius:homeCardContainer.borderTopRightRadius,
  borderTopLeftRadius:homeCardContainer.borderTopLeftRadius,
  justifyContent: "space-between",
}

export const ButtonContainerRating:ViewStyle ={
    alignItems: "center",
    justifyContent: "center",
    marginLeft:52,
    position: "relative",
  
}