import {
  FETCH_UNITS_REQUEST,
  FETCH_UNITS_SUCCESS,
  FETCH_UNITS_FAILURE,
} from "../actions/unitActions";

const initialState = {
  units: [],
  loading: false,
  error: null,
};

const relatedProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNITS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_UNITS_SUCCESS:
      return {
        ...state,
        loading: false,
        // relatedProducts: action.payload,
        units: action.payload,
      };
    case "FETCH_UNITS_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case FETCH_UNITS_FAILURE:
      return {
        ...state,
        loading: false,
        relatedProducts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default relatedProductsReducer;
