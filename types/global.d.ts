import { TMovieType } from "src/screens";
import { IMovieDetail, IResponseAccount, IResultReview } from "src/services";

declare type RootStackParamList = {
   DetailScreen: {item:IMovieDetail,review:IResultReview[]},
   HomeScreen:undefined
   LoginScreen:undefined
   SplashScreen:undefined,
   WatchlistScreen:{accountDetails:IResponseAccount | undefined,navGoBack:boolean,}

  };
  
 declare type RootNavigationProp = import("@react-navigation/native-stack").NativeStackNavigationProp<RootStackParamList>;
