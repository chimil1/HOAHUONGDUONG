const initialState = {
    relatedProducts: [],
    loading: false,
    error: null,
  };
  
  const relatedProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_RELATED_PRODUCTS_REQUEST":
        return { ...state, loading: true };
      case "FETCH_RELATED_PRODUCTS_SUCCESS":
        return { ...state, loading: false, relatedProducts: action.payload };
      case "FETCH_RELATED_PRODUCTS_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default relatedProductReducer;