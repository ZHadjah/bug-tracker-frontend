import authReducer from '../Authentication/authSlice'

import { applyMiddleware, createStore } from 'redux'

import rootReducer from "./rootReducer";

const middleWares = [];

const store = createStore(
  rootReducer, applyMiddleware(...middleWares)
);
export default store