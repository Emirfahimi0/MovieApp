import { TextStyle } from "react-native/types";
import Color from "../Color";
import Font from "../Font";


// --> Genre Card Text

export const genreText: TextStyle = {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: Font.BOLD,
    color: Color.BLACK,
  }

  //Login text style

export const loginText: TextStyle = {
  ...genreText,
  color: "white",
  fontSize: 15,
};

export const InputLogin: TextStyle = {
  fontSize: 15,
  width: "100%",
  fontFamily: Font.BOLD,
};



export const InputTextStyle: TextStyle = {
  fontSize: 15,
  width: "100%",
  fontFamily: Font.BOLD,
};
  export const InputSearcbBar: TextStyle= {
    color:Color.BLACK
  }
export const subTitle: TextStyle = {
    fontFamily: Font.SEMI_BOLD,
    fontSize: 14,
    color: Color.GRAY,
  };

export const subHeader :TextStyle = {
    color:Color.GRAY,
    fontFamily: Font.REGULAR,
    fontSize: 16,
}

export const subDetail : TextStyle = {
    fontFamily: Font.BOLD,
    fontSize: 14,
    color:Color.BLACK

}

export const MovieDetailTitle:TextStyle ={
    fontFamily: Font.BOLD,
    fontSize:18,
    color:Color.WHITE
}
export const additionalDetailText:TextStyle ={
    color: Color.WHITE,
    fontFamily: Font.BOLD,
    fontWeight: "600",
    fontSize: 13,
}
export const OverviewDetailsText:TextStyle ={
  fontFamily:Font.SEMI_BOLD,
  fontWeight:"500",
  fontSize: 14,
  textAlign:"justify",
}

//-> add Rating Text

export const RatingText :TextStyle ={
  color:Color.WHITE,
  fontFamily:Font.BOLD,
  fontSize:13,
  fontWeight:"600"

}