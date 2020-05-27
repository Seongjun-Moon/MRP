import { createStore, applyMiddleware } from "redux";
import userReducer from "./user/user.reducer";

/*
 * Reduxer Logger Middleware
 */
import { createLogger } from "redux-logger";
const logger = createLogger();

const store = createStore(userReducer, undefined, applyMiddleware(logger)); // (reducer, initial state, enhancer)

export default store;
