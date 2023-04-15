import { IDetails, MovieType } from "../../screens";
import { IMovieDetail, IReview, IAccountState } from "src/services";
import { GetMovieWatchlist, getAccountState, getMovieDetailsAPI, getReviewById, sessionWithLogIn } from "../../services/api-services";
import { Alert } from "react-native";
import TouchID from "react-native-touch-id";

export const fetchMovieDetails = async (id: number) => {
    const data: IMovieDetail = await getMovieDetailsAPI(id);
    return data;
  };

  export const fetchReviewMovieDetails = async (id: number) => {
    const data: IReview[] = await getReviewById(id);
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


  // Functions use in HomeScreen and WatchlistScreen
 export const  handleMovieDetail = async (id: number ):Promise<IDetails> => {
    const resDetail: IMovieDetail = await fetchMovieDetails(id);
    const resReview: IReview[] = await fetchReviewMovieDetails(id);
    //const navigation:RootNavigationProp = useNavigation()
    let resAllDetails ={
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
    //console.log(isSuccess);
    return new Promise((resolve, reject) => {
      TouchID.authenticate("Authenticate with Face ID")
        .then(() => {
          resolve(true);
          if (isSuccess) {
            //navigation.navigate("HomeScreen");
            console.log("success authenticated");
          }
        })
        .catch((error: string) => {
          reject(error);
        });
    });
  };