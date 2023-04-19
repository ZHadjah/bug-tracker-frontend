import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers/rootReducer';

const middleWares = [];

const store = createStore(
  rootReducer, applyMiddleware(...middleWares)
);
export default store