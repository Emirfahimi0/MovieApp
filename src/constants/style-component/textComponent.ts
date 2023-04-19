import { TextStyle } from "react-native/types";
import Color from "../color";
import Font from "../font";


// --> Genre Card Text

export const genreText: TextStyle = {
    fontSize: 12,
    fontFamily: Font.BOLD,
    color: Color.BLACK,
  }

  //Login text style

export const loginText: TextStyle = {
  ...genreText,
  color: "white",
  fontSize: 16,
};

export const InputLogin: TextStyle = {
  fontSize: 16,
  color:Color.AMBER,
  width: "100%",
  fontFamily: Font.BOLD,
};



export const InputTextStyle: TextStyle = {
  fontSize: 16,
  color:Color.AMBER,
  width: "100%",
  fontFamily: Font.BOLD,
};
  export const InputSearcbBar: TextStyle= {
    color:Color.BLACK,
    fontFamily:Font.SEMI_BOLD,
    fontSize:16
    }
export const subTitle: TextStyle = {
    fontFamily: Font.EXTRA_BOLD,
    fontSize: 12,
    color: Color.GRAY,
  };

export const subHeader :TextStyle = {
    color:Color.GRAY,
    fontFamily: Font.REGULAR,
    fontSize: 12,
}

export const subDetail : TextStyle = {
    fontFamily: Font.BOLD,
    fontSize: 12,
    color:Color.BLACK

}

export const MovieDetailTitle:TextStyle ={
    fontFamily: Font.BOLD,
    fontSize:16,
    color:Color.SECONDARY_COLOR
}
export const additionalDetailText:TextStyle ={
    color: Color.SECONDARY_COLOR,
    fontFamily: Font.BOLD,
    fontWeight: "600",
    fontSize: 12,
}
export const OverviewDetailsText:TextStyle ={
  fontFamily:Font.SEMI_BOLD,
  fontWeight:"500",
  fontSize: 16,
  textAlign:"justify",
}

//-> add Rating Text

export const RatingText :TextStyle ={
  color:Color.SECONDARY_COLOR,
  fontFamily:Font.BOLD,
  fontSize:12,
  fontWeight:"600"

}