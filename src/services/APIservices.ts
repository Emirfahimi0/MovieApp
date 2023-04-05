import axios from "axios"
import  { API_KEY, AUTHENTICATION, ENDPOINTS,  TMDB_API_KEY, TMDB_BASE_URL }  from "../constants/utilities";
import { useContext } from "react";
import { GlobalContext, user } from "../Context/GlobalState";
import { TResponseToken,Ttoken,createSession } from ".";


const TMDB_REQUEST_API = axios.create({
    baseURL: TMDB_BASE_URL,
    params:{
        api_key:TMDB_API_KEY
    }
})

// METHOD
export const getTrendingmovie = async() => {
    let data = await axios.get(ENDPOINTS.GET_TRENDING,{responseType:'json'}).then(function(response){
        let responseData = response.data.results
        return responseData
    })
    console.log("Data is",data)
    return data
   
    
}

// export const getAuth = async () => {

//     let headers = {
//         "Accept":"*/*",
//         "Content-Type":"application/json;charset=utf-8",
//     }

//     let bodyParse ={
//         "username":"",
//         "password":"",
//     }
//     let Authorization = {"Authorization":`Bearer ${API_KEY}`,
// }
//     let URLAuth = {"url":AUTHENTICATION, }
//     axios.get(AUTHENTICATION, API_KEY, { headers })
//     .then(response => response.data.id);
// }

/* Request token function */
export const createRequestToken = async  () => {
   const data:TResponseToken =  (await Promise.resolve(axios.get<TResponseToken>(ENDPOINTS.CREATE_REQUEST_TOKEN,{responseType:"json"}))).data
   console.log("Success creating token -->", data)
   return data;
    
} 
/* create new session */
export const createNewSession = async(token:string) => {
    //let requestToken = createRequestToken()
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
        console.log("Response",response.data);
    })
    .catch(function (error) {
        console.error("error",error);
    });
     
 }

/* Session with logIn  */
export const sessionWithLogIn = async (username:string,password:string) => {
    
    let requestToken = createRequestToken()
    let isAuthenticated = false;
    //console.log("response from session",(await resSession).session_id)
    let api_key = "c8dd41ae609200a4c9aef25e9654494a"
    if((await requestToken).success===true){
        console.log("request token return with ",(await requestToken).request_token)
        
        let requestBody = {
            "username":username.toLowerCase(),
            "password":password,
            "request_token":(await requestToken).request_token 
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
            console.log("response from session login",response.data);
            isAuthenticated =true
            console.log("body request",requestBody)

        })
        .catch(function (error) {
            console.error("error",error);
            isAuthenticated = false

        });

       
    }
    console.log(isAuthenticated)
    return isAuthenticated;
    
 }



export const postWatchlist = (item) => {
    //need body request
    let header = {}
TMDB_REQUEST_API.post(ENDPOINTS.WATCHLIST)
}

export const getGenre = () => {
    TMDB_REQUEST_API.get(ENDPOINTS.GENRES)
}