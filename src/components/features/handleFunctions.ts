import {  getAccountState, getGenreMovie, getMovieDetailsAPI, getMovieWatchlist, getReviewById, sessionWithLogIn } from "../../services/api-services";
import { Alert } from "react-native";
import { Genre, IDetailsMovie, TMovieType } from "../../screens";
import { IMovieDetail, IAccountState, IResult } from "src/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    const data: TMovieType[] = await getMovieWatchlist();
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

  export interface IResponseTokenMerge {
    success: boolean
    expires_at: string
    session_id: string
    request_token: string
  }
  export interface IRequestBody {
    username:string,
    password:string,
    request_token:string 
  }
 export  const handleLogin = async (): Promise<boolean> => {

    let isSuccess = false
    
      const resAsyncToken = await AsyncStorage.getItem ("responseToken").then((value) => {
        const responseToken:IResponseTokenMerge = JSON.parse(value??"null");
        console.log(responseToken);
        return responseToken
      });
    const resAsyncRequestBody = await AsyncStorage.getItem ("requestBody").then((value) => {
        const responseToken:IRequestBody = JSON.parse(value?? "null");
        console.log(responseToken);
        return responseToken
      });
      if(resAsyncToken.request_token === resAsyncRequestBody.request_token){
          console.log("noice")

          if(resAsyncToken.success){
              isSuccess =await handleLoginWithFaceId(resAsyncToken,resAsyncRequestBody)
              
          }
          else 

          isSuccess =false
      }
    return isSuccess
}

    
export const handleLoginWithFaceId = async(resAsyncToken:IResponseTokenMerge,resAsyncRequestBody:IRequestBody):Promise<boolean> =>{
  let isSuccess = await sessionWithLogIn(resAsyncRequestBody.username, resAsyncRequestBody.password);
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