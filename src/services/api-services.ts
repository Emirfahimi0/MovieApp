import axios from "axios"
import  {  ENDPOINTS, TMDB_API_KEY }  from "../constants/utilities";
import {  Genre, IRating, IMovieDetail, TResponseToken, IAccountState,
        TSession, IWatchListResponse, IResult, IResponseAccount, IResponseTokenMerge } from ".";
import { TMovieType } from "../screens";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";




/* METHODS GET/POST/DELETE FROM TMDB API */

// Get method for trending movie
export const  getTrendingmovie = async():Promise<TMovieType[]> => {
    let data = await axios.get(ENDPOINTS.GET_TRENDING,{responseType:'json'}).then(function(response){
        let responseData = response.data.results
        return responseData
    })
    return data
}



/* Get request token*/
export const createRequestToken = async  (): Promise<TResponseToken> => {
   const data:TResponseToken =  (await Promise.resolve(axios.get<TResponseToken>(ENDPOINTS.CREATE_REQUEST_TOKEN,{responseType:"json"}))).data
        return data;
    
    
    
} 
/* create new session */
export const createNewSession = async(token:string): Promise<TSession> => {
    //let requestToken = createRequestToken()
    let current_Session:TSession  = {
        success: false,
        session_id: ""
    }

    let requestBody = {
         
        "request_token": token
    }
 
    const options = {
        method: 'POST',
        url: ENDPOINTS.CREATE_SESSION,
        headers: {
            'content-type': 'application/json',
        },
        data: requestBody       
        
    };
   
   await axios.request(options)
    .then( function(response) {
        current_Session = response.data
    })
    .catch(function (error) {
        console.error("error",error);
    });

    return current_Session
     
 }
 /* Session with log In  */
export const sessionWithLogIn = async (username:string,password:string):Promise<boolean> => {
    let isAuthenticated = false;
    try {
        const response:IResponseTokenMerge =await AsyncStorage.getItem("responseToken")
        if(response){
            
            if(JSON.parse(response.session_id)){
                console.log(response)
                  isAuthenticated = true  
            }
            else{
                console.log("session id might be wrong or expired")
                isAuthenticated = false
            }
   
        }
        else{
            const requestToken: TResponseToken  = await createRequestToken()
            if( requestToken.success===true){
              const token = requestToken.request_token
                
                let requestBody = {
                    "username":username.toLowerCase(),
                    "password":password,
                    "request_token":token 
                }
                const options = {
                    method: 'POST',
                    url: ENDPOINTS.CREATE_SESSION_WITH_LOGIN,
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: requestBody       
                    
                };
               
               await axios.request(options)
                .then( async   (response)=>{
                 await AsyncStorage.multiSet([["responseToken",JSON.stringify(response.data)],
                                             ["requestBody",JSON.stringify(requestBody)]])
        
                 isAuthenticated =response.data.success
        
                })
                .catch( (error)=> {
                    console.error("error",error);
                    isAuthenticated = false
        
                });
                    
                    // create session right away
                    let session = await createNewSession(token)
                    if(session.success){
                      AsyncStorage.mergeItem("responseToken",JSON.stringify(session))  
                    }
                    else  
                    console.log("current session already exist!!")    
              }
              isAuthenticated = true
        }
    } catch (error) {
        console.log("error",error)
    }

   
    console.log("isAuthenticated",isAuthenticated)
    return isAuthenticated;
    
 }

 export const getAccountState = async (id:number):Promise<IAccountState> => {

    let current_Session:IResponseTokenMerge = {
        success: false,
        request_token:"",
        expires_at:"",
        session_id: ""
    }
   
     await AsyncStorage.getItem('responseToken').then((value) => {

        const data = JSON.parse(value as string)
        current_Session = data
    })
    const params = {
        session_id:current_Session.session_id}
      
    const data  = await axios.get(
        `${ENDPOINTS.GET_ACCOUNT_STATE}${id}/account_states?${TMDB_API_KEY}`,{
            headers: { Accept:'application/json',"Content-Type": "application/json; charset=UTF-8" }
            ,params:params}).then(function(response){
          let  responseData = response.data
       

          return responseData
            
        })
        //to do --> need to compile it as 
        
        return data;


 }


 export const getAccountDetails =async():Promise<IResponseAccount>=> {
    let current_Session:IResponseTokenMerge = {
        success: false,
        request_token:"",
        expires_at:"",
        session_id: ""
    }
    await AsyncStorage.getItem('responseToken').then((value) => {

        const data = JSON.parse(value as string)
        current_Session = data
        console.log("current session from account details",current_Session)

    })
    const params = {
        session_id:current_Session.session_id}
      
    const data  = await axios.get(ENDPOINTS.GET_ACCOUNT,{
            headers: { Accept:'application/json',"Content-Type": "application/json; charset=UTF-8" }
            ,params:params}).then(function(response){
          let  responseData = response.data
       

          return responseData
            
        })
        
        return data;

 }

 



// POST method for adding watchlist
export const toWatchList =async (movie:IMovieDetail | TMovieType,setWatchlist:boolean):Promise<IWatchListResponse> => {
    //need body request
    let response:IWatchListResponse = {
        status_code :0,
        status_message:"",
        success: true


    }
    let current_Session:IResponseTokenMerge = {
        success: false,
        request_token:"",
        expires_at:"",
        session_id: ""
    }
     await AsyncStorage.getItem('responseToken').then((value) => {

        const data = JSON.parse(value as string)
        current_Session = data
    })
    
        let requestBody = {
            "media_type":"movie",
            "media_id":movie.id,
            "watchlist":setWatchlist 
        }
        const options = {
            method: 'POST',
            url: ENDPOINTS.ADD_WATCHLIST,
            params:{'session_id':current_Session.session_id },
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            data: requestBody       
            
        };
      
       await axios.request(options)
        .then(function (response){
            response = response.data
           
        })
        .catch(function (error) {
            console.error("error",error);
    
        });
       
        return response
   
}
// Get movie watchlist
export const getMovieWatchlist = async ():Promise<TMovieType[]> => {
    let current_Session:IResponseTokenMerge = {
        success: false,
        request_token:"",
        expires_at:"",
        session_id: ""
    }
   

     await AsyncStorage.getItem('responseToken').then((value) => {

        const data = JSON.parse(value as string)
        current_Session = data
    })
    const params = {
        session_id:current_Session.session_id}
      
    const data  = await axios.get(
        ENDPOINTS.GET_WATCHLIST,{
            headers: { Accept:'application/json',"Content-Type": "application/json; charset=UTF-8" }
            ,params:params}).then(function(response){
          let  responseData = response.data.results
       
          return responseData
            
        })
        //to do --> need to compile it as 
        
        return data;
}
// POST method for rate movie by Id
export const postRatingbyId = async (id:number,value:number):Promise<IRating> =>{
    let responseRating:IRating ={
        success:false,
        status_code:0,
        status_message:"success",
    }
    let current_Session:IResponseTokenMerge = {
        success: false,
        request_token:"",
        expires_at:"",
        session_id: ""
    }
   

     await AsyncStorage.getItem('responseToken').then((value) => {

        const data = JSON.parse(value as string)
        current_Session = data
    })
    const params = {
        session_id:current_Session.session_id}
    let requestBody = {
      value:value
    }
    const options = {
        method: 'POST',
        url: `${ENDPOINTS.RATE_MOVIES}${id}/rating?${TMDB_API_KEY}`,
        params:params,
        headers: {
            'content-type': 'application/json',
        },
        data: requestBody       
        
    };
    console.log(requestBody)

   
   await axios.request(options)
    .then( function(response) {
        responseRating =response.data
         

    })
    .catch(function (error) {
        console.error("error",error);

    });
    console.log('response Rating',responseRating)
    return responseRating
}

// DELETE method for rate movie by Id
export const deleteRatingbyId = async (id:number,value:number):Promise<IRating> =>{
    let responseRating:IRating ={
        success:false,
        status_code:1,
        status_message:"success",
    }
    let current_Session:IResponseTokenMerge = {
        success: false,
        request_token:"",
        expires_at:"",
        session_id: ""
    }
     await AsyncStorage.getItem('responseToken').then((value) => {

        const data = JSON.parse(value as string)
        current_Session = data
    })
    const params = {
        session_id:current_Session.session_id}
    let requestBody = {
      value:value
    }
    const options = {
        method: 'DELETE',
        url: `${ENDPOINTS.RATE_MOVIES}${id}/rating?${TMDB_API_KEY}`,
        params:params,
        headers: {
            'content-type': 'application/json',
        },
        data: requestBody       
        
    };
   await axios.request(options)
    .then( (response)=> {
        console.log("response from session login",response.data.success);
        responseRating =response.data
        

    })
    .catch(function (error) {
        console.error("error",error);

    });
    return responseRating
}

//Get method to retrieve movie review by its ID

export const getReviewById = async (id:number) => {

    const url = `${ENDPOINTS.GET_REVIEWS_BY_ID}${id}/reviews?${TMDB_API_KEY}`
    let data:IResult[] = await axios.get(url,{responseType:"json"}).then(function(res){
        let responseFromAPI = res.data.results
        return responseFromAPI
    })
    return data

}


// Get method that fetch details of the movie
export const getMovieDetailsAPI = async (id:number):Promise<IMovieDetail> => {
    const url = `${ENDPOINTS.GET_DETAILS}${id}?${TMDB_API_KEY}`
    let data = await axios.get(url,{responseType:"json"}).then(function(res){
        let responseFromAPI = res.data
        return responseFromAPI
    })
    return data

}

// GET method to fetch genre of all movies
export const getGenreMovie = async ():Promise<Genre[]> => {
    let resGenre = await axios.get(ENDPOINTS.GET_GENRES, {
            responseType: "json",
          })
          .then(function(response) {
            let data = response.data.genres;
            return data;
          });
 
    return resGenre;
}