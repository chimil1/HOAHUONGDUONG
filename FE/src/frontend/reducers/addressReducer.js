const initialState = {
    addresses: [],
    loading: false,
    error: null,
  };
  
  const addressReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_ADDRESS_REQUEST":
        return { ...state, loading: true };
      case "FETCH_ADDRESS_SUCCESS":
        return { ...state, loading: false, addresses: action.payload };
      case "FETCH_ADDRESS_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default addressReducer;
  