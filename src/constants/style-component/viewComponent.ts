import { Dimensions, ImageStyle, ViewStyle } from "react-native";
import color from "../Color";
const { height, width } = Dimensions.get("screen");

export const setHeight = (h:number) => (height/100) *h
export const setWidth = (w:number) => (width / 100) * w;

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
  paddingEnd:8,
  justifyContent: "center",
  marginVertical: 2,
  paddingVertical: 8,
  width: setWidth(25),
};



// --> Home/Movie Screen Styling

export const shadowStyle:ViewStyle = {
  shadowColor: color.ACTIVE,
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 1.0,
  shadowRadius: 16,
}
export const movieContainer:ViewStyle= {
    backgroundColor: color.BUTTON,
    elevation: 4,
    flexDirection: "row",
    height: 200,
    justifyContent: "space-between",
    marginVertical: 12,
    width: 152,
   borderRadius:20,
  }

  export const homeCardContainer:ViewStyle={
    ...shadowStyle,
    backgroundColor: color.SECONDARY_COLOR,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 3,
    flex:1,
    marginTop: 54,
    paddingTop: 8,
  }

 export const  SearchBar:ViewStyle= {
    alignItems: "center",
    backgroundColor: color.SECONDARY_COLOR,
    borderRadius: 50,
    flexDirection: "row",
    padding: 10,
    width: "90%",
    
  }

  

 export const ListPreviewMovie:ViewStyle = {
    flexDirection: "column",
    justifyContent:"center",
    margin: "auto",
    paddingHorizontal:16,
    paddingTop: 8,
  }

  export const ImagePoster :ImageStyle={

    borderRadius:movieContainer.borderRadius,
    height: movieContainer.height,
    width:150
  }

  // --> Detail Movie Screen Styling

  export const container :ViewStyle = {

    backgroundColor:color.BASIC_BACKGROUND,
    flex:1,
    paddingBottom:30
  }

  export const headerContainerStyle: ViewStyle = {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: "12%",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: color.SECONDARY_COLOR,
    shadowOpacity: 1.0,
    shadowOffset: {
      height: 0,
      width: -3,
    },
  };
export const  ImagePosterDetail:ViewStyle = {

  alignItems:"center",
  backgroundColor:color.SEMI_BLACK,
  borderRadius:20,
  justifyContent:"center",
  elevation: 8,
  height:setHeight(50),
  width:setWidth(80),
}

// youtube webview style
export const youtubePlayerView: ViewStyle = {
  width:"100%",
  height:"100%",
  padding:10,
  alignContent:"center",
  justifyContent:"center",
};
export const posterImage:ImageStyle = {

  height:ImagePosterDetail.height,
  padding:"50%",
  borderRadius:ImagePosterDetail.borderRadius,
  resizeMode:"stretch",
width:ImagePosterDetail.width
};

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
  flexDirection:"row",
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