import axios from "axios";

export const FETCH_UNITS_REQUEST = "FETCH_UNITS_REQUEST";
export const FETCH_UNITS_SUCCESS = "FETCH_UNITS_SUCCESS";
export const FETCH_UNITS_FAILURE = "FETCH_UNITS_FAILURE";

export const fetchProductRequest = () => {
  return {
    type: FETCH_UNITS_REQUEST,
  };
};

export const fetchProductSuccess = (product) => {
  return {
    type: FETCH_UNITS_SUCCESS,
    payload: product,
  };
};

export const fetchProductFailure = (error) => {
  return {
    type: FETCH_UNITS_FAILURE,
    payload: error,
  };
};

export const fetchProducts = () => {
    return (dispatch) => {
      dispatch(fetchProductRequest());
      axios
        .get("http://localhost:8000/api/product")
        .then((response) => {
          const units = response.data;
          dispatch(fetchProductSuccess(units));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchProductFailure(errorMsg));
        });
    };
  };
  
  export const fetchDelete = (id) => {
    return (dispatch) => {
      dispatch(fetchProductRequest());
      axios
        .delete(`http://localhost:8000/api/product/${id}`)
        .then((response) => {
          const units = response.data;
          dispatch(fetchProductSuccess(units));
          dispatch(fetchProducts());
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchProductFailure(errorMsg));
        });
    };
  };
  
  export const fetchProductDetails = (id) => {
    return (dispatch) => {
      dispatch(fetchProductRequest());
      axios
        .get(`http://localhost:8000/api/product/${id}`)
        .then((response) => {
          const product = response.data;
          dispatch(fetchProductSuccess(product));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchProductFailure(errorMsg));
        });
    };
  };
  
  export const updateProduct = (id, product) => {
    return (dispatch) => {
      dispatch(fetchProductRequest());
      axios
        .put(`http://localhost:8000/api/product/${id}`, product)
        .then((response) => {
          const product = response.data;
          dispatch(fetchProductSuccess(product));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchProductFailure(errorMsg));
        });
    };
  };
  
  export const fetchAddProduct = (product) => {
    return (dispatch) => {
      dispatch(fetchProductRequest());
      axios.post("http://localhost:8000/api/product", product)
        .then(response => {
          dispatch(fetchProductSuccess(response.data));
        })
        .catch(error => {
          const errorMsg = error.message;
          dispatch(fetchProductFailure(errorMsg));
        });
    };
  };