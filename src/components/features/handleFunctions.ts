import {  getAccountState, getGenreMovie, getMovieDetails, getMovieWatchlist, getReviewById, sessionWithLogIn } from "../../services/api-services";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TouchID from "react-native-touch-id";

export const fetchMovieDetails = async (id: number | undefined) => {
    const data: IMovieDetail = await getMovieDetails(id);
    return data;
  };

  export const fetchReviewMovieDetails = async (id: number | undefined) => {
    const data: IResultReview[] = await getReviewById(id);
    return data;
  };
  export const fetchAccountState = async (id: number|undefined) => {
    const data: IAccountState = await getAccountState(id);
    return data;
  };
  export const fetchWatchlist = async () => {
    const data: TMovieType[] = await getMovieWatchlist();
    return data;
  };
  export const fetchGenreItem = async () => {
    const responseGenre: TGenre[] = await getGenreMovie();
    // set state for in context provider for Genre []
    return responseGenre;
  };
 
  export const handleShowDetailScreen = async (id: number | undefined ,navigation,setLoading:(loading:boolean)=>void,storeAllDetailsState:(detail:IMovieDetail,review:IResultReview[])=>void): Promise<void> => {
    const getDetailsFromApi = await handleMovieDetail(id);
    if (getDetailsFromApi !== undefined) {
      setLoading(false);
      storeAllDetailsState(getDetailsFromApi.detail, getDetailsFromApi.review);
      // navigate...
      navigation.navigate("DetailScreen", { item: getDetailsFromApi.detail, review: getDetailsFromApi.review });
    } else setLoading(true);
  };
  // Functions use in HomeScreen and WatchlistScreen
 export const  handleMovieDetail = async (id: number | undefined ):Promise<IDetailsMovie> => {
    const resDetail: IMovieDetail = await fetchMovieDetails(id);
    const resReview: IResultReview[] = await fetchReviewMovieDetails(id);
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

//true if session id exist ,false if no session
 export  const handleIsLogin = async (): Promise<boolean> => {
  console.warn("handleIsLogin run")

    let isValidate:boolean = false
    
      const resAsyncToken = await AsyncStorage?.getItem ("responseToken").then((value) => {
        const responseToken:IResponseTokenMerge = JSON.parse(value??"null");
        return responseToken
      });
    const resAsyncRequestBody = await AsyncStorage?.getItem ("requestBody").then((value) => {
        const responseToken:IRequestBody = JSON.parse(value?? "null");
        return responseToken
      });

      if(resAsyncToken !==null && resAsyncRequestBody!==null){
         if(resAsyncToken.request_token ===resAsyncRequestBody.request_token){
          if(resAsyncToken.session_id){
            isValidate = true
            console.log("authenticated session received...")
          }
        }
        else{
          isValidate = false
          console.log("not authenticated token received...")
        }
      }
      else{

        isValidate = false
      }
      console.log("isValidate",isValidate)
      return isValidate  
}

   // if true returns face id  
export const handleLoginWithFaceId = async():Promise<boolean> =>{
  const isLogin = await  handleIsLogin()
  console.log("isLogin",isLogin)
  let isLoggedIn:boolean = true
   
  if(isLogin === false){
   const response =  await sessionWithLogIn("emirfahimi","adidas") 
      TouchID.authenticate("Authenticate with Face ID")
        .then(success => {   
          if(response === true){
            success(true);
            isLoggedIn = true
          }
          else 
           
          isLoggedIn = false   
        })
        .catch((error: string) => {
          console.log("error",error)
          
        });
  }
  else if(isLogin === true){
    TouchID.authenticate("Authenticate with Face ID")
    .then(success => {   
        success(true);
        isLoggedIn = true
    })
    .catch((error: string) => {
      console.log("error",error)
      
    });
  }
  else 
  isLoggedIn = false
 
  return isLoggedIn

};