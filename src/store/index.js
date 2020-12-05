import { createStore, combineReducers } from "redux";
import user from "../redux/users";

//import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';

//const persistConfig = {
//  key: 'root',
//  storage,
//}

//const persistedReducer = persistReducer(persistConfig, rootReducer)
const rootReducer = combineReducers({
  userReducer: user.userReducer,
});

export const store = createStore(
  rootReducer,

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
