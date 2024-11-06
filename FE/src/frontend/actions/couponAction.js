import axios from "axios";

export const FETCH_UNITS_REQUEST = "FETCH_UNITS_REQUEST";
export const FETCH_UNITS_SUCCESS = "FETCH_UNITS_SUCCESS";
export const FETCH_UNITS_FAILURE = "FETCH_UNITS_FAILURE";

export const fetchUnitsRequest = () => {
  return {
    type: FETCH_UNITS_REQUEST,
  };
};

export const fetchUnitsSuccess = (coupons) => {
  return {
    type: FETCH_UNITS_SUCCESS,
    payload: coupons,
  };
};

export const fetchUnitsFailure = (error) => {
  return {
    type: FETCH_UNITS_FAILURE,
    payload: error,
  };
};

export const fetchCoupons = () => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios
        .get("http://localhost:8000/api/coupon")
        .then((response) => {
          const units = response.data;
          dispatch(fetchUnitsSuccess(units));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchUnitsFailure(errorMsg));
        });
    };
  };

  export const fetchDelete = (id) => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios
        .delete(`http://localhost:8000/api/coupon/${id}`)
        .then((response) => {
          const units = response.data;
          dispatch(fetchUnitsSuccess(units));
          dispatch(fetchCoupons());
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchUnitsFailure(errorMsg));
        });
    };
  };

  export const fetchAddCoupon = (unit) => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios.post("http://localhost:8000/api/coupon", unit)
        .then(response => {
          dispatch(fetchUnitsSuccess(response.data));
        })
        .catch(error => {
          const errorMsg = error.message;
          dispatch(fetchUnitsFailure(errorMsg));
        });
    };
  };

  export const fetchCouponDetails = (id) => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios
        .get(`http://localhost:8000/api/coupon/${id}`)
        .then((response) => {
          const unit = response.data;
          dispatch(fetchUnitsSuccess(unit));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchUnitsFailure(errorMsg));
        });
    };
  };
  

  export const updateCoupon = (id, data) => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios
        .put(`http://localhost:8000/api/coupon/${id}`, data)
        .then((response) => {
          const unit = response.data;
          dispatch(fetchUnitsSuccess(unit));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchUnitsFailure(errorMsg));
        });
    };
  };
  