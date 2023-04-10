import { USER_SUCCESS } from "../constants/userConstant";
import { IInitialState } from "../Context/GlobalState";
import { ADD_MOVIE_WATCHLIST,
         LOAD_GENRE,
         LOAD_MOVIE,
         REMOVE_MOVIE_WATCH_LIST,
         REMOVE_STORED_RATING,
         STORE_RATING,
         SUCCESS_LOAD_MOVIE } from "../constants/MovieConstant";

export default (state:IInitialState,action) => {
    switch(action.type){
        case LOAD_MOVIE: 
        return {
            ...state,
            Movie: [action.payload
        }
        case LOAD_GENRE:
            return{
                ...state,
                Genre: action.payload
            }
        case ADD_MOVIE_WATCHLIST:
            return {
                ...state,
                WatchList:[action.payload, ...state.WatchList] //action.payload refers to movies
            }
        case REMOVE_MOVIE_WATCH_LIST:
            return{
                ...state,
                WatchList: action.payload
            }
            case USER_SUCCESS:
            return{
                ...state,
                User: {...action.payload}
            }
            case STORE_RATING:
                 return {
                    ...state,
                    Rating: [action.payload,...state.Rating]
                 }
            case REMOVE_STORED_RATING: {
                return {
                    ...state,
                    Rating: action.payload
                 }
            }
        default:
            return state;
    }
}


