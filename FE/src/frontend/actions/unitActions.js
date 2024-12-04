import axios from "axios";
export const FETCH_UNITS_REQUEST = "FETCH_UNITS_REQUEST";
export const FETCH_UNITS_SUCCESS = "FETCH_UNITS_SUCCESS";
export const FETCH_UNITS_FAILURE = "FETCH_UNITS_FAILURE";

export const LOCK_USER_REQUEST = 'LOCK_USER_REQUEST';
export const LOCK_USER_SUCCESS = 'LOCK_USER_SUCCESS';
export const LOCK_USER_FAILURE = 'LOCK_USER_FAILURE';

const url = 'http://localhost:8000/api';


const fetchUnitsRequest = () => ({
    type: FETCH_UNITS_REQUEST,
});

const fetchUnitsSuccess = (userData) => ({
    type: FETCH_UNITS_SUCCESS,
    payload: userData, // Dữ liệu người dùng
});

const fetchUnitsFailure = (errorMessage) => ({
    type: FETCH_UNITS_FAILURE,
    payload: errorMessage,
});
//User
export const fetchUser = (id) => {
    return (dispatch) => {
        dispatch(fetchUnitsRequest());
        const token = localStorage.getItem("token");
        axios
            .get(`${url}/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const user = response.data;
                dispatch(fetchUnitsSuccess(user));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchUnitsFailure(errorMsg));
            });
    };
};
export const fetchKhachHangs = () =>{
    return(dispatch) => {
        dispatch(fetchUnitsRequest());
        axios
            .get(url+'/user')
            .then((response) => {
                const units = response.data;
                dispatch(fetchUnitsSuccess(units));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchUnitsFailure(errorMsg));
            });
    }
}
export const lockUser = (id, lockStatus) => {
    return (dispatch) => {
        dispatch(fetchUnitsRequest());
        return axios
            .put(`${url}/lock/${id}`, { lock: lockStatus })
            .then((response) => {
                dispatch(fetchUnitsSuccess(response.data));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchUnitsFailure(errorMsg));
            });
    };
};

//** để ở Đây
export const updateUser = (id, data) => {
    return (dispatch) => {
        dispatch(fetchUnitsRequest());
        const token = localStorage.getItem("token");
        axios
            .put(`http://localhost:8000/api/user/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const update = response.data;
                dispatch(fetchUnitsSuccess(update));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchUnitsFailure(errorMsg));
            });
    };
};

//****Adderss
//List
export const fetchShippingAddresses = (id) => {
    return (dispatch) => {
        dispatch(fetchUnitsRequest());
        const token = localStorage.getItem("token");
        axios
            .get(`${url}/shipping-address/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
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
// delete
export const fetchShippingDelete = (id) => {
    return (dispatch) => {
        dispatch(fetchUnitsRequest());

        axios
            .delete(url + `/shipping/${id}`)
            .then((response) => {
                const successMessage = response.data.message;
                dispatch(fetchUnitsSuccess(successMessage));
                dispatch(fetchCategory());
            })
            .catch((error) => {
                const errorMsg = error.response ? error.response.data.message : error.message;

                dispatch(fetchUnitsFailure(errorMsg));
            });
    };
};

// ADD Địa Chỉ
export const fetchAddAddress = (id, jsonData) => {
    return (dispatch) => {
        dispatch(fetchUnitsRequest());
        const token = localStorage.getItem("token");
        axios
            .post(url+`/shipping-addresses/${id}`,jsonData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                dispatch(fetchUnitsSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchUnitsFailure(error.message));
            });
    };
}

//Product
export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
      .get(url+ "/product")
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

export const fetchProductDelete = (id) => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
      .delete(`http://localhost:8000/api/product/${id}`)
      .then((response) => {
        const units = response.data;
        dispatch(fetchUnitsSuccess(units));
        dispatch(fetchProducts());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUnitsFailure(errorMsg));
      });
  };
};

export const fetchProductDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((response) => {
        const product = response.data;
        dispatch(fetchUnitsSuccess(product));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUnitsFailure(errorMsg));
      });
  };
};

export const updateProduct = (id, product) => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
      .put(`http://localhost:8000/api/product/${id}`, product)
      .then((response) => {
        const product = response.data;
        dispatch(fetchUnitsSuccess(product));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUnitsFailure(errorMsg));
      });
  };
};

export const fetchAddProduct = (product) => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios.post("http://localhost:8000/api/product", product)
      .then(response => {
        dispatch(fetchUnitsSuccess(response.data));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchUnitsFailure(errorMsg));
      });
  };
};

export const fetchRelatedProducts = (category_id) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_RELATED_PRODUCTS_REQUEST" });
    return axios
      .get(`http://localhost:8000/api/product/related/${category_id}`)
      .then((response) => {
        dispatch({ type: "FETCH_RELATED_PRODUCTS_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_RELATED_PRODUCTS_FAILURE", payload: error.message });
      });
  };
};

//Order
export const fetchOrders = () => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios
        .get(`http://localhost:8000/api/order`)
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
  export const approveOrder = (id) => {
    return (dispatch) => {
      return axios
        .put(`http://localhost:8000/api/order/approve/${id}`)
        .then(() => {
          dispatch(fetchOrders());
        })
        .catch((error) => {
          console.error("Lỗi khi duyệt đơn hàng:", error);
        });
    };

  }
  export const fetchOrderDetails = (id) => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios
        .get(`http://localhost:8000/api/order/${id}`)
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

  //Category
  export const fetchCategory = () => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios(url+'/category')
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
export const fetchCategoryType = () => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
        .get(url+'/typeCate')
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

  export const fetchCategoryDelete = (id) => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios
        .delete(url+`/category/${id}`)
        .then((response) => {
          const units = response.data;
          dispatch(fetchUnitsSuccess(units));
          dispatch(fetchCategory());
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchUnitsFailure(errorMsg));
        });
    };
  };

  export const fetchCategoryDetails = (id) => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios
        .get(url+`/category/${id}`)
        .then((response) => {
          const category = response.data;
          dispatch(fetchUnitsSuccess(category));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchUnitsFailure(errorMsg));
        });
    };
  };

  export const updateCategory = (id, data) => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios
        .put(url+`/category/${id}`, data)
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


  export const fetchAddCategory = (category) => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios.post(url+'/category', category)
        .then(response => {
          dispatch(fetchUnitsSuccess(response.data));
        })
        .catch(error => {
          const errorMsg = error.message;
          dispatch(fetchUnitsFailure(errorMsg));
        });
    };
  };

  //Coupon
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

//review
export const fetchReview = () => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
      .get(url+'/review')
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

//details review
export const fetchReviewDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
      .get(`http://localhost:8000/api/review/${id}`)
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
