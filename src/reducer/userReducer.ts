import { LOAD_USER, UPDATE_LOADER, USER_FAIL, USER_REQUEST, USER_SUCCESS } from "../constants/userConstant";

export interface user {
    id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
  }
  
  export interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
  }
  
  export interface Geo {
    lat: string
    lng: string
  }
  
  export interface Company {
    name: string
    catchPhrase: string
    bs: string
  }
  
const initialState: IReduxState = {
      userList: [],
      currentUser: undefined,
      // a new key to that object

    loading: true
}

export interface  IReduxState {
    userList: user[];
    loading: boolean;
    currentUser?:user ;
}

export const userReducer = (state:IReduxState = initialState ,action) =>{
    console.log("check",action)
    switch(action.type){
        case USER_REQUEST:
            return {
                loading:true,
                 user: []
        }
        case LOAD_USER:  
        return{
            ...state,
            currentUser :action.payload,
            loading:false
        }
        case UPDATE_LOADER: 
        return{
            ...state,
            loading :true
        }
        case USER_SUCCESS:
            return {
                ...state,
            loading:false,
            user:action.payload
        }
    
        case USER_FAIL:
            return {
                user: null,
                loading :false,
                error:action.payload
            }
        

        default:
            return {...state}
        
    }
}

