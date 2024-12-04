import { combineReducers } from "redux";
import unitReducer from "./unitReducers";
import RelatedProductsReducers from "./RelatedProductsReducers";
import RelateReview from "./RelateReview";

const rootReducer = combineReducers({
    unit: unitReducer,
    relatedProducts: RelatedProductsReducers,
    reviews: RelateReview
});

export default rootReducer;