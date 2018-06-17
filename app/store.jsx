import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import combineReducers from './reducers/index.jsx';
const middleware = applyMiddleware(promise(),thunk);
export default createStore(combineReducers, middleware);