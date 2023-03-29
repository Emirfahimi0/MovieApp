import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducer/userReducer";


const appReducers = combineReducers({
    user:userReducer
  
});
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = (state, action) => appReducers(state, action);

//const logger = createLogger();

export type State = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch


export const store = createStore(rootReducer, applyMiddleware(thunk));