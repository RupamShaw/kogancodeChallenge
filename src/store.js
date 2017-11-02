import { createStore } from 'redux'
import App from './reducers'
import { applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from "redux-thunk";


const errorHandler = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (e) {
    console.log("ERROR!", e)
  }
}

const middleware = applyMiddleware(
  thunk,
  logger,
  errorHandler
)

const store = createStore(
  App, middleware)

export default store;

