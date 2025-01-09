import { combineReducers } from "redux";
import unitReducer from "./unitReducers";
import cartReducer from "./cartReducer";
import addressReducer from "./addressReducer";
import RelatedProductsReducers from "./RelatedProductsReducers";
import RelateReview from "./RelateReview";

const rootReducer = combineReducers({
    unit: unitReducer,
    cart: cartReducer,
    address:addressReducer,
    relatedProducts: RelatedProductsReducers,
    reviews: RelateReview
});

export default rootReducer;