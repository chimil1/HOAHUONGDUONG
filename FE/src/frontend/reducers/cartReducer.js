const initialState = {
    units: [],
    loading: false,
    error: null,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_CART_REQUEST":
        return { ...state, loading: true };
      case "FETCH_CART_SUCCESS":
        return { ...state, loading: false, units: action.payload };
      case "FETCH_CART_FAILURE":
        return { ...state, loading: false, error: action.payload };
        case "UPDATE_CART_QUANTITY_SUCCESS":
      return {
        ...state,
        units: state.units.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "UPDATE_CART_QUANTITY_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  