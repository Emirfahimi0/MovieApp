import { TMovieType } from "src/screens";
import { IMovieDetail, IResponseAccount, IResult } from "src/services";

declare type RootStackParamList = {
   DetailScreen: {item:IMovieDetail,review:IResult[]},
   HomeScreen:undefined
   LoginScreen:undefined
   SplashScreen:undefined,
   WatchlistScreen:{accountDetails:IResponseAccount|undefined,navGoBack:boolean,}

  };
  
 declare type RootNavigationProp = import("@react-navigation/native-stack").NativeStackNavigationProp<RootStackParamList>;
