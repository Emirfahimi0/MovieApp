
declare type RootStackParamList = {
   DetailScreen: {item:IMovieDetail,review:IResultReview[]},
   HomeScreen:undefined
   LoginScreen:undefined
   SplashScreen:undefined,
   WatchlistScreen:{navGoBack:boolean,}

  };
  
 declare type RootNavigationProp = import("@react-navigation/native-stack").NativeStackNavigationProp<RootStackParamList>;
