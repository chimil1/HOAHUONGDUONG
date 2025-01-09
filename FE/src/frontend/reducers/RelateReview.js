  const initialState = {
    reviews: [],
    loading: false,
    error: null,
    
  };

  function RelateReview(state = initialState, action) {
    switch (action.type) {
      case "FETCH_REVIEW_REQUEST":
        return { ...state, loading: true };
      case "FETCH_REVIEW_SUCCESS":
        return { ...state, loading: false, units: action.payload };
      case "FETCH_REVIEW_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;     
    } 
  }
  export default RelateReview;
