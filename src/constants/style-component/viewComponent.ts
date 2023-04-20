const { height, width } = Dimensions.get("screen");
const h = 40
const w = 145
export const setHeight = (h:number) => (height/100) *h
export const setWidth = (w:number) => (width / 100) * w;
import { Dimensions, ImageStyle, ViewStyle } from "react-native";
import Color from "../color";

//Login
export const Logincontainer: ViewStyle = {
  backgroundColor: Color.AMBER,
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
  backgroundColor: Color.SECONDARY_COLOR,
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
    backgroundColor: Color.BUTTON,
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
    flex: 1,
    paddingTop: 24,
    backgroundColor: Color.SECONDARY_COLOR,
    shadowColor: Color.LIGHT_GRAY,
    shadowRadius: 16,
    marginTop: 54,
    elevation: 3,
    shadowOpacity: 1.0,
    shadowOffset: { width: 0, height: -4 },
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  }

 export const  SearchBar:ViewStyle= {
    alignItems: "center",
    backgroundColor: Color.SECONDARY_COLOR,
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

    backgroundColor:Color.BASIC_BACKGROUND,
    flex:1,
  }
export const  ImagePosterDetail:ViewStyle = {

  alignItems:"center",
  justifyContent:"center",
  elevation: 8,
  height:setHeight(h),
  top:0,
  width:setWidth(w),
}
export const posterImage:ImageStyle = {

  height:setHeight(50),
  padding:"50%",
  resizeMode:"contain",
  width: setWidth(20),
}

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
  paddingHorizontal:12,
  width: "500%",
};
export const MovieDetailContainer:ViewStyle = {

  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 32,
}

export const ContainerRow :ViewStyle ={
  
    alignItems: "center",
    alignContent:"center",
    flexDirection: "row",
    width:64,
    padding:16

    
}

export const smallDetail : ViewStyle ={
    paddingHorizontal: 32,
    paddingTop: 16,
    flexDirection:"row"
}
export const OverviewContainer:ViewStyle = {

  marginTop:30,
  backgroundColor:Color.ACTIVE,
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