const { height, width } = Dimensions.get("screen");
const h = 40
const w = 145
export const setHeight = (h) => (height/100) *h
export const setWidth = (w) => (width / 100) * w;
import { Dimensions, ImageStyle, ViewStyle } from "react-native";
import Color from "../Color";

//Login
export const Logincontainer: ViewStyle = {
  backgroundColor: Color.AMBER,
  borderRadius: 20,
  alignContent: "space-between",
  flexDirection: "column",
  margin: 20,
  padding: 10,
  paddingTop: 50,
  height: "60%",
};
export const InputContainer: ViewStyle = {
  alignItems: "center",
  backgroundColor: Color.WHITE,
  borderRadius: 10,
  flexDirection: "row",
  margin: 10,
  padding: 10,
};

// -> use in Genre Card and Watch list
export const CardContainer: ViewStyle = {
  alignItems: "center",
  alignContent:"center",
  flexDirection:"row",
  backgroundColor: "#DFE0E0",
  borderRadius: 5,
  elevation: 3,
  paddingEnd:7,
  justifyContent: "center",
  marginVertical: 2,
  paddingVertical: 8,
  width: setWidth(25),
};



  // --> Home/Movie Screen Styling

export const movieContainer:ViewStyle= {
    backgroundColor: Color.BLUE,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
    flexDirection: "row",
    height: 350,
    justifyContent: "space-between",
    marginVertical: 10,
    width: 250,
  }

 export const  SearchBar:ViewStyle= {
    alignItems: "center",
    backgroundColor: Color.EXTRA_LIGHT_GRAY,
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    width: "100%",
  }

  

 export const ListPreviewMovie:ViewStyle = {
    flexDirection: "column",
    margin: 6,
    marginLeft: 10,
    paddingVertical: 10,
  }

  export const ImagePoster :ImageStyle={

    borderBottomLeftRadius: movieContainer.borderBottomLeftRadius,
    borderTopRightRadius: movieContainer.borderTopRightRadius,
    height: movieContainer.height,
    width:movieContainer.width,
  }

  // --> Detail Movie Screen Styling

  export const container :ViewStyle = {

    backgroundColor:Color.BASIC_BACKGROUND,
    flex:1,
  }
export const  ImagePosterDetail:ViewStyle = {

  alignItems:"center",
  borderBottomLeftRadius:500,
  borderBottomRightRadius:500,
  elevation: 8,
  height:setHeight(h),
  left: setWidth((100-145)/2),
  position:"absolute",
  top:0,
  width:setWidth(w),
}
export const posterImage:ImageStyle = {

  height:setHeight(120),
  resizeMode:"cover",
  width:setWidth(w),
}

export const HeaderDetail:ViewStyle = {

  alignItems:"center",
  elevation:20,
  flexDirection:"row",
  justifyContent:"space-around",
  left:0,
  paddingHorizontal:20,
  position:"absolute",
  right:0,
  top:50,
}

export const MovieDetailContainer:ViewStyle = {

  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 20,
}

export const ContainerRow :ViewStyle ={
  
    alignItems: "center",
    alignContent:"center",
    flexDirection: "row",
    width:50,
    padding:10

    
}

export const smallDetail : ViewStyle ={
    paddingHorizontal: 20,
    paddingTop: 15,
    flexDirection:"row"
}
export const OverviewContainer:ViewStyle = {

  alignItems: "flex-start",
  backgroundColor:Color.BLACK,
  flexDirection: "column",
  justifyContent: "space-between",
}

export const ButtonContainerRating:ViewStyle ={
    alignItems: "center",
    justifyContent: "center",
    marginLeft:30,
    position: "relative",
  
}