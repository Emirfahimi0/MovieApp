import { Genre, IDetailsMovie, MovieType } from "../../screens";
import { IMovieDetail, IReview, IAccountState, IResult } from "src/services";
import { GetMovieWatchlist, getAccountState, getGenreMovie, getMovieDetailsAPI, getReviewById, sessionWithLogIn } from "../../services/api-services";
import { Alert } from "react-native";
import TouchID from "react-native-touch-id";

export const fetchMovieDetails = async (id: number) => {
    const data: IMovieDetail = await getMovieDetailsAPI(id);
    return data;
  };

  export const fetchReviewMovieDetails = async (id: number) => {
    const data: IResult[] = await getReviewById(id);
    return data;
  };
  export const fetchAccountState = async (id: number) => {
    const data: IAccountState = await getAccountState(id);
    return data;
  };
  export const fetchWatchlist = async () => {
    const data: MovieType[] = await GetMovieWatchlist();
    return data;
  };
  export const fetchGenreItem = async () => {
    const responseGenre: Genre[] = await getGenreMovie();

    // set state for in context provider for Genre []
    return responseGenre;
  };

  // Functions use in HomeScreen and WatchlistScreen
 export const  handleMovieDetail = async (id: number ):Promise<IDetailsMovie> => {
    const resDetail: IMovieDetail = await fetchMovieDetails(id);
    const resReview: IResult[] = await fetchReviewMovieDetails(id);
    //const navigation:RootNavigationProp = useNavigation()
    let resAllDetails:IDetailsMovie ={
      detail:resDetail,
      review:resReview
    }

    if (resDetail !== undefined && resReview !== undefined) {
      resAllDetails = {...{detail:resDetail},...{review:resReview}}
      //From api service
     
    } else {
      // alert {you dont have data }
      Alert.alert("getDetails and getReview undefined. ");
     
    }
    return resAllDetails;
  };

 export  const submitByFaceId = async (): Promise<boolean> => {
    let isSuccess = await sessionWithLogIn("emirfahimi", "adidas");
    console.log("isSuccess",isSuccess);
    return new Promise((resolve, reject) => {
      TouchID.authenticate("Authenticate with Face ID")
        .then(() => {
          if (isSuccess === true) {
            resolve(true);
            //navigation.navigate("HomeScreen");
            console.log("success authenticated");
          }
        })
        .catch((error: string) => {
          reject(error);
        });
    });
  };