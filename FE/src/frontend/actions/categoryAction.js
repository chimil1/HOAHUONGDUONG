import axios from "axios";

export const FETCH_UNITS_REQUEST = "FETCH_UNITS_REQUEST";
export const FETCH_UNITS_SUCCESS = "FETCH_UNITS_SUCCESS";
export const FETCH_UNITS_FAILURE = "FETCH_UNITS_FAILURE";

export const fetchCategorysRequest = () => {
  return {
    type: FETCH_UNITS_REQUEST,
  };
};

export const fetchCategorysSuccess = (category) => {
  return {
    type: FETCH_UNITS_SUCCESS,
    payload: category,
  };
};

export const fetchCategorysFailure = (error) => {
  return {
    type: FETCH_UNITS_FAILURE,
    payload: error,
  };
};

export const fetchCategory = () => {
    return (dispatch) => {
      dispatch(fetchCategorysRequest());
      axios
        .get("http://localhost:8000/api/category")
        .then((response) => {
          const units = response.data;
          dispatch(fetchCategorysSuccess(units));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchCategorysFailure(errorMsg));
        });
    };
  };
  
  export const fetchDelete = (id) => {
    return (dispatch) => {
      dispatch(fetchCategorysRequest());
      axios
        .delete(`http://localhost:8000/api/category/${id}`)
        .then((response) => {
          const units = response.data;
          dispatch(fetchCategorysSuccess(units));
          dispatch(fetchCategory());
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchCategorysFailure(errorMsg));
        });
    };
  };
  
  export const fetchCategoryDetails = (id) => {
    return (dispatch) => {
      dispatch(fetchCategorysRequest());
      axios
        .get(`http://localhost:8000/api/category/${id}`)
        .then((response) => {
          const category = response.data;
          dispatch(fetchCategorysSuccess(category));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchCategorysFailure(errorMsg));
        });
    };
  };
  
  export const updateCategory = (id, data) => {
    return (dispatch) => {
      dispatch(fetchCategorysRequest());
      axios
        .put(`http://localhost:8000/api/category/${id}`, data)
        .then((response) => {
          const category = response.data;
          dispatch(fetchCategorysSuccess(category));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchCategorysFailure(errorMsg));
        });
    };
  };
  
  export const fetchAddCategory = (category) => {
    return (dispatch) => {
      dispatch(fetchCategorysRequest());
      axios.post("http://localhost:8000/api/category", category)
        .then(response => {
          dispatch(fetchCategorysSuccess(response.data));
        })
        .catch(error => {
          const errorMsg = error.message;
          dispatch(fetchCategorysFailure(errorMsg));
        });
    };
  };