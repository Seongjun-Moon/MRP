import { createStore, applyMiddleware, combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import medicineReducer from "./medicine/medicine.reducer";

/*
 * Reduxer Logger Middleware
 */
import { createLogger } from "redux-logger";
const logger = createLogger();

const rootReducer = combineReducers({
  user: userReducer,
  medicine: medicineReducer,
});

const store = createStore(rootReducer, undefined, applyMiddleware(logger)); // (reducer, initial state, enhancer)

export default store;
