import axios from "axios"
import  {  ENDPOINTS, TMDB_API_KEY }  from "../constants/utilities";
import {  Genre, IRating, IMovieDetail, IReview, TResponseToken, IAccountState,
        Session, IWatchListResponse } from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MovieType } from "../screens";




/* METHODS GET/POST/DELETE FROM TMDB API */

// get Method for Trending movie
export const  getTrendingmovie = async():Promise<MovieType[]> => {
    let data = await axios.get(ENDPOINTS.GET_TRENDING,{responseType:'json'}).then(function(response){
        let responseData = response.data.results
        return responseData
    })
    return data
}



/* Request token function */
export const createRequestToken = async  (): Promise<TResponseToken> => {
   const data:TResponseToken =  (await Promise.resolve(axios.get<TResponseToken>(ENDPOINTS.CREATE_REQUEST_TOKEN,{responseType:"json"}))).data
   console.log("Success creating token -->", data)
   return data;
    
} 
/* create new session */
export const createNewSession = async(token:string): Promise<Session> => {
    //let requestToken = createRequestToken()
    let current_Session:Session  = {
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
    .then(function (response) {
        current_Session = response.data
    })
    .catch(function (error) {
        console.error("error",error);
    });

    return current_Session
     
 }

 export const getAccountState = async (id:number):Promise<IAccountState> => {

    let current_Session:Session = {
        success: false,
        session_id: ""
    }
   
     await AsyncStorage.getItem('session_id').then((value) => {

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

/* Session with log In  */
export const sessionWithLogIn = async (username:string,password:string):Promise<boolean> => {
    
    let requestToken: TResponseToken  = await createRequestToken ()
    let isAuthenticated = false;
    
    if( requestToken.success===true){
      let   token = requestToken.request_token
        
        let requestBody = {
            "username":username.toLowerCase(),
            "password":password,
            "request_token":requestToken.request_token 
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
        .then(function (response) {

            isAuthenticated =response.data.success

            

        })
        .catch(function (error) {
            console.error("error",error);
            isAuthenticated = false

        });
        // create session right away
        let session = await createNewSession(token)
        await AsyncStorage.setItem("session_id", JSON.stringify(session));
        console.log(session)
    }
    return isAuthenticated;
    
 }

// POST method for adding watchlist
export const toWatchList =async (movie:IMovieDetail | MovieType,setWatchlist:boolean):Promise<IWatchListResponse> => {
    //need body request
    let response:IWatchListResponse = {
        status_code :0,
        status_message:"",
        success: true


    }
    let current_Session:Session = {
        success: false,
        session_id: ""
    }
     await AsyncStorage.getItem('session_id').then((value) => {

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
        .then(function (response) {
            response = response.data
           
        })
        .catch(function (error) {
            console.error("error",error);
    
        });
       
        return response
   
}
// Get movie watchlist
export const GetMovieWatchlist = async ():Promise<MovieType[]> => {
    let current_Session:Session = {
        success: false,
        session_id: ""
    }
   

     await AsyncStorage.getItem('session_id').then((value) => {

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
    let current_Session:Session = {
        success: false,
        session_id: ""
    }
   

     await AsyncStorage.getItem('session_id').then((value) => {

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
    .then(function (response) {
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
    let current_Session:Session = {
        success: false,
        session_id: ""
    }
     await AsyncStorage.getItem('session_id').then((value) => {

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
    .then(function (response) {
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
    let data:IReview[] = await axios.get(url,{responseType:"json"}).then(function(res){
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