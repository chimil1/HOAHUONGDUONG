import { combineReducers } from "redux";
import unitReducer from "./unitReducers";
const rootReducer = combineReducers({
    unit: unitReducer,
});

export default rootReducer;