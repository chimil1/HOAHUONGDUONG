import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const FETCH_UNITS_REQUEST = "FETCH_UNITS_REQUEST";
export const FETCH_UNITS_SUCCESS = "FETCH_UNITS_SUCCESS";
export const FETCH_UNITS_FAILURE = "FETCH_UNITS_FAILURE";

const url = 'http://localhost:8000/api';


const fetchUnitsRequest = () => ({
    type: FETCH_UNITS_REQUEST,
});

const fetchUnitsSuccess = (userData) => ({
    type: FETCH_UNITS_SUCCESS,
    payload: userData,
})

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
export const fetchAddresses = () => {
    return (dispatch) => {
        dispatch({ type: "FETCH_ADDRESS_REQUEST" });
        const token = localStorage.getItem("token");
        axios
            .get(`${url}/shipping`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                dispatch({ type: "FETCH_ADDRESS_SUCCESS", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_ADDRESS_FAILURE", payload: error.message });
            });
    };
};

// delete
export const fetchShippingDelete = (id) => {
    return (dispatch) => {
        dispatch(fetchUnitsRequest());
        const token = localStorage.getItem("token");
        axios
            .delete(url + `/shipping/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
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
      .get(url+"/product")
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
            .delete(url+`/product/${id}`)
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
export const fetchProductRandom = () => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
      .get("http://localhost:8000/api/products/random")
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
      .delete(url+`/product/${id}`)
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

export const fetchProductDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
      .get(url+`/product/${id}`)
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
      .put(url+`/product/${id}`, product)
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


export const fetchAddProduct = (data) => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios.post(url+'/product', data)
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
        .get(url+`/order`)
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
  export const updateOrderStatus = (id, newStatus) => {
    return (dispatch) => {
        dispatch(fetchUnitsRequest());
        return axios
            .put(url + `/order/status/${id}`, { status: newStatus })
            .then(() => {
                dispatch(fetchOrders());
            })
            .catch((error) => {
                console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
            });
    };
};
export const fetchOrderManagementcline = (id) => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    const token = localStorage.getItem("token");

    axios
      .get(`${url}/users/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const units = Array.isArray(response.data) ? response.data : []; // Đảm bảo luôn là mảng
        dispatch(fetchUnitsSuccess(units));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUnitsFailure(errorMsg));
      });
  };
};
export const fetchOrderManagement = (id) => {
    return (dispatch) => {
        dispatch(fetchUnitsRequest());
        axios
            .get(url+`/users/orders/${id}`)
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
      axios
        .get(url+'/category')
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

  // export const updateCategory = (id, data) => {
  //   return (dispatch) => {
  //     dispatch(fetchUnitsRequest());
  //     return axios
  //       .put(`http://localhost:8000/api/category/${id}`, data)  // return the axios promise here
  //       .then((response) => {
  //         const unit = response.data;
  //         dispatch(fetchUnitsSuccess(unit));
  //       })
  //       .catch((error) => {
  //         const errorMsg = error.response?.data || error.message;
  //         dispatch(fetchUnitsFailure(errorMsg));
  //         throw error; // re-throw to be caught in component
  //       });
  //   };
  // };

  export const updateCategory = (id, data) => {
    return (dispatch) => {
      dispatch(fetchUnitsRequest());
      axios
        .put(`http://localhost:8000/api/category/${id}`, data)
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

//review
export const fetchReview = () => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
      .get(url + '/review')
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
      .get(`http://localhost:8000/api/${id}`)
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
export const fetchStatiscal = () => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
      .get(`http://localhost:8000/api/user-stats`)
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
  export const fetchAddress = () => {
    return (dispatch) => {
        dispatch(fetchUnitsRequest());
        const token = localStorage.getItem("token");
        axios
            .get(`${url}/shipping`, {
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
export const fetchDeleteCoupon = (id) => {
    return (dispatch) => {
        dispatch(fetchUnitsRequest());
        axios
            .delete(`http://localhost:8000/api/coupon/${id}`)
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

export const addToCart = (data) => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    const token = localStorage.getItem("token");
    axios
      .post(`http://localhost:8000/api/cartItem`, data,{
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((response) => {
        const units = response.data;
        dispatch(fetchProducts());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUnitsFailure(errorMsg));
      });
  };
};
export const CartItem = () => {
    return (dispatch) => {
        dispatch({ type: "FETCH_CART_REQUEST" });
        const token = localStorage.getItem("token");
        axios
            .get(`http://localhost:8000/api/cartItem`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                dispatch({ type: "FETCH_CART_SUCCESS", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_CART_FAILURE", payload: error.message });
            });
    };
};
export const removeFromCart= (id) => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/api/cartItem/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
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
export const fetchReviews = (product_id) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_REVIEW_REQUEST" });
    axios
      .get(`http://localhost:8000/api/review/${product_id}`)
      .then((response) => {
        dispatch({ type: "FETCH_REVIEW_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_REVIEW_FAILURE", payload: error.message });
      });
  };
};
export const addReview = (data) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_REVIEW_REQUEST" });
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8000/api/addReview", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const review = response.data;
        dispatch({ type: "ADD_REVIEW", payload: review });
      })
      .catch((error) => {
        const errorMsg =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: "FETCH_REVIEW_FAILURE", payload: errorMsg });
      });
  };
};
export const lockCommentAction = (idReview, id_cmt) => {
  return (dispatch) => {
    dispatch(fetchUnitsRequest());
    axios
      .put(`http://localhost:8000/api/comment/${id_cmt}`)
      .then(() => {
        dispatch(fetchReviewDetails(idReview));

      })
      .catch((error) => {
        const errorMsg = error.response ? error.response.data.message : error.message;
        dispatch(fetchUnitsFailure(errorMsg));
      });

  };
};

export const fetchAddOrder = (data, navigate) => {
  return async (dispatch) => {
    dispatch(fetchUnitsRequest());
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addOrder",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const units = response.data;
      dispatch(fetchUnitsSuccess(units));
      // Kiểm tra nếu thanh toán qua VNPay
      if (data.payment_type === 1 && response.data.url) {
        const vnpayUrl = response.data.url;
        window.location.href = vnpayUrl; // Chuyển hướng người dùng đến VNPay
      } else {
        // Nếu không phải VNPay, hiển thị thông báo và chuyển về trang chủ
        Swal.fire({
          icon: "success",
          title: "Đặt hàng thành công!",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navigate("/"); // Chuyển về trang chủ
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Lỗi khi đặt hàng:", errorMsg);
      dispatch(fetchUnitsFailure(errorMsg));

      Swal.fire({
        icon: "error",
        title: "Đặt hàng thất bại!",
        text: errorMsg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};

export const vnpayReturn = (params,navigate) => {
    return async (dispatch) => {
        dispatch(fetchUnitsRequest());
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/vnPay/return",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params,
                }
            );
            const message = response.data.Message;
            dispatch(fetchUnitsSuccess(message));
            // Hiển thị thông báo nếu cần
            Swal.fire({
                icon: "success",
                title: "Thanh toán thành công!",
                text: message,
                showConfirmButton: false,
                timer: 2000,
            })
            navigate('/');
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error("Lỗi xử lý thanh toán:", errorMsg);
            dispatch(fetchUnitsFailure(errorMsg));
            // Hiển thị thông báo lỗi
            Swal.fire({
                icon: "error",
                title: "Thanh toán thất bại!",
                text: errorMsg,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };
};