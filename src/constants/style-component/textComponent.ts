import { TextStyle } from "react-native/types";
import color from "../Color";
import Font from "../Font";


// --> normal Text

export const normalText: TextStyle = {
    fontSize: 12,
    fontFamily: Font.BOLD,
    color: color.BLACK,
  }

  //Login text style

export const loginText: TextStyle = {
  ...normalText,
  color: "white",
  fontSize: 16,
};

export const InputLogin: TextStyle = {
  fontSize: 16,
  color:color.AMBER,
  width: "100%",
  fontFamily: Font.BOLD,
};



export const InputTextStyle: TextStyle = {
  fontSize: 16,
  color:color.AMBER,
  width: "100%",
  fontFamily: Font.BOLD,
};
  export const InputSearcbBar: TextStyle= {
    color:color.SECONDARY_COLOR,
    fontFamily:Font.SEMI_BOLD,
    fontSize:16
    }
export const subTitle: TextStyle = {
    fontFamily: Font.EXTRA_BOLD,
    fontSize: 12,
    color: color.SECONDARY_COLOR,
  };

export const subHeader :TextStyle = {
    color:color.SECONDARY_COLOR,
    fontFamily: Font.REGULAR,
    fontSize: 12,
}

export const subDetail : TextStyle = {
    fontFamily: Font.BOLD,
    fontSize: 12,
    color:color.SECONDARY_COLOR

}

export const primaryTitle: TextStyle = {
  fontFamily:Font.REGULAR,
  fontSize:16,
  alignItems:"center",
  color:color.BLACK
}

export const MovieDetailTitle:TextStyle ={
    fontFamily: Font.BOLD,
    fontSize:16,
    textAlign:"center",
    color:color.SECONDARY_COLOR
}
export const additionalDetailText:TextStyle ={
    fontFamily: Font.LIGHT,
    color: color.SECONDARY_COLOR,
    fontSize: 12,
    fontWeight: "800",
}
export const OverviewDetailsText:TextStyle ={
  fontFamily:Font.REGULAR,
  fontWeight:"600",
  fontSize: 14,
  color:color.LIGHT_GRAY,
  textAlign:"justify",
}

//-> add Rating Text

export const RatingText :TextStyle ={
  color:color.SEMI_BLACK,
  fontFamily:Font.BOLD,
  fontSize:12,
  fontWeight:"800"

}