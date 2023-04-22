import { createRequestToken } from "../../services/api-services";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/";
export const TMDB_API_KEY = "api_key=c8dd41ae609200a4c9aef25e9654494a";
export const API_KEY = "c8dd41ae609200a4c9aef25e9654494a";
export const account_id = "18555891";
export const AUTHENTICATION = "https://api.themoviedb.org/3/movie/76341";
export const default_Url = `${TMDB_BASE_URL}/movie/`

export const ENDPOINTS = {
    ADD_WATCHLIST: `${TMDB_BASE_URL}/account/${account_id}/watchlist?${TMDB_API_KEY}`, // POST [ADD TO WATCHLIST]
    CREATE_REQUEST_TOKEN: `${TMDB_BASE_URL}/authentication/token/new?${TMDB_API_KEY}`,  // GET --> [https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}]
    CREATE_SESSION_WITH_LOGIN: `${TMDB_BASE_URL}/authentication/token/validate_with_login?${TMDB_API_KEY}`,
    CREATE_SESSION: `${TMDB_BASE_URL}/authentication/session/new?${TMDB_API_KEY}`, // POST --> Return Session ID
    DELETE_RATING: "/movie/{movie_id}/rating", // DELETE --> "https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=c8dd41ae609200a4c9aef25e9654494a"
    GET_ACCOUNT_STATE: default_Url,
    GET_ACCOUNT: `${TMDB_BASE_URL}/account?${TMDB_API_KEY}`, //GET
    GET_DETAILS: default_Url, // GET https://api.themoviedb.org/3/movie/{movie_id}?api_key=c8dd41ae609200a4c9aef25e9654494a&language=en-US
    GET_GENRES: `${TMDB_BASE_URL}/genre/movie/list?${TMDB_API_KEY}`, //GET
    GET_MOVIETYPE: default_Url,
    GET_REVIEWS_BY_ID: default_Url,
    GET_TRENDING: `${TMDB_BASE_URL}/trending/movie/day?${TMDB_API_KEY}`, // GET [https://api.themoviedb.org/3/trending/all/day?api_key=c8dd41ae609200a4c9aef25e9654494a]
    GET_WATCHLIST: `${TMDB_BASE_URL}/account/${account_id}/watchlist/movies?${TMDB_API_KEY}`,
    RATE_MOVIES: default_Url, // --> POST [https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=c8dd41ae609200a4c9aef25e9654494a]
}

