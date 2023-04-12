import { MovieType } from "src/screens";
import { IMovieDetail, IReview, IAccountState } from "src/services";

declare type RootStackParamList = {
   DetailScreen: undefined,
   HomeScreen:undefined
   LoginScreen:undefined
   SplashScreen:undefined,
   WatchlistScreen:{resWatchlist:MovieType[]}

  };
  
 declare type RootNavigationProp = import("@react-navigation/native-stack").NativeStackNavigationProp<RootStackParamList>;
