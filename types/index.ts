import { MovieType } from "src/screens";
import { MovieDetail, Review, accountState } from "src/services";

export type RootStackParamList = {
   DetailScreen: {item:MovieDetail,review:Review[],state:accountState}
   HomeScreen:undefined
   LoginScreen:undefined
   SplashScreen:undefined,
   WatchListScreen:{resWatchlist:MovieType[]}

  };
  
export declare type RootNavigationProp = import("@react-navigation/native-stack").NativeStackNavigationProp<RootStackParamList>;
