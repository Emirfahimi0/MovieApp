import {  getAccountState, getGenreMovie, getMovieDetails, getMovieWatchlist, getReviewById, sessionWithLogIn } from "../../services/api-services";
import { Alert } from "react-native";
import { Genre, IDetailsMovie, TMovieType } from "../../screens";
import { IMovieDetail, IAccountState, IResult, IResponseTokenMerge, IRequestBody } from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TouchID from "react-native-touch-id";

export const fetchMovieDetails = async (id: number) => {
    const data: IMovieDetail = await getMovieDetails(id);
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


 export  const handleIsLogin = async (): Promise<boolean> => {

    let isSuccess:boolean = false
    
      const resAsyncToken = await AsyncStorage?.getItem ("responseToken").then((value) => {
        const responseToken:IResponseTokenMerge = JSON.parse(value??"null");
        console.log(responseToken);
        return responseToken
      });
    const resAsyncRequestBody = await AsyncStorage?.getItem ("requestBody").then((value) => {
        const responseToken:IRequestBody = JSON.parse(value?? "null");
        return responseToken
      });
      if(resAsyncToken === null){
        console.log("response async token is null")
         isSuccess = false
      }

      if(resAsyncRequestBody === null){
        console.log("response request body is null")
        isSuccess = false
      }
      else if(resAsyncToken.request_token === resAsyncRequestBody.request_token){
          console.log("session ID is exist",resAsyncToken.session_id)
      isSuccess =true 
      }
      console.log("isSuccess??",isSuccess)
    return isSuccess
}

    
export const handleLoginWithFaceId = async():Promise<boolean> =>{
  const isLogin = await  handleIsLogin()
  let isSuccess:boolean = false
  if(isLogin === true){
    const resAsyncRequestBody = await AsyncStorage?.getItem ("requestBody").then((value) => {
      const responseToken:IRequestBody = JSON.parse(value?? "null");
      return responseToken
    });
    if(resAsyncRequestBody.request_token){
      console.log("request token",resAsyncRequestBody.request_token)
    }
  isSuccess = true
  }

  else {
   
    return new Promise(async (resolve, reject) => {
      isSuccess = await sessionWithLogIn("emirfahimi","adidas")
      TouchID.authenticate("Authenticate with Face ID")
        .then(() => {         
          if (isSuccess === true) {
            resolve(true);
            //navigation.navigate("HomeScreen");
            isSuccess = true
          }
        })
        .catch((error: string) => {
          reject(error);
        });
    });
  }
  console.log("is the authentication success?",isSuccess)
  return isSuccess

};