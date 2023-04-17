import { MovieType } from "src/screens";
import { IMovieDetail, IResponseAccount, IResult } from "src/services";

declare type RootStackParamList = {
   DetailScreen: {item:IMovieDetail,review:IResult[]},
   HomeScreen:undefined
   LoginScreen:undefined
   SplashScreen:undefined,
   WatchlistScreen:{resWatchlist:MovieType[],accountDetails:IResponseAccount|undefined,navGoBack:true,}

  };
  
 declare type RootNavigationProp = import("@react-navigation/native-stack").NativeStackNavigationProp<RootStackParamList>;
