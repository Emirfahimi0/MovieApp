import { MovieType } from "src/screens";
import { IMovieDetail, IResult } from "src/services";

declare type RootStackParamList = {
   DetailScreen: {item:IMovieDetail,review:IResult[]},
   HomeScreen:undefined
   LoginScreen:undefined
   SplashScreen:undefined,
   WatchlistScreen:{resWatchlist:MovieType[]}

  };
  
 declare type RootNavigationProp = import("@react-navigation/native-stack").NativeStackNavigationProp<RootStackParamList>;
