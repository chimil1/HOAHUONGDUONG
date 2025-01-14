import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { fetchAddresses, fetchAddOrder, CartItem } from "../actions/unitActions";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
function Cart() {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const addressState = useSelector((state) => state.address);
  const { handleSubmit } = useForm();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const { selectedProducts } = location.state || { selectedProducts: [] };
  const { selectedTotalWithDiscount } = location.state || {selectedTotalWithDiscount: []};
  const [quantities, setQuantities] = useState({});
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    dispatch(CartItem());
    dispatch(fetchAddresses());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!cartitems.units || cartitems.units.length === 0) {
  //     dispatch(CartItem()); // Gọi lại sản phẩm nếu giỏ hàng trống
  //   }
  // }, [dispatch, cartitems.units]);
  const units = Array.isArray(cartitems.units) ? cartitems.units : [];
if(units.length < 0){
  Swal.fire({
    icon: "error",
    title: "Không thể thanh toán!",
    showConfirmButton: false,
    timer: 1500,
  });
  navigate("/home");
}
  const handleSaveAddress = () => {
    const selected = addressState.addresses.find(
      (item) => item.id === parseInt(currentAddressId)
    );
    if (selected) {
      setSelectedAddress(selected);
      setErrorMessage(""); // Clear any previous error messages
    }
  };
  const cartTotal = units.reduce(
    (total, item) =>
      total +
      (item.product && item.product.price
        ? item.product.price * quantities[item.product.id]
        : 0),
    0
  );

  const submit = () => {
    if (!selectedAddress || !selectedPaymentMethod) {
      setErrorMessage("Vui lòng chọn địa chỉ và phương thức thanh toán.");
      return;
    }
    const data = {
      status: 1,
      shipping_name: selectedAddress.shipping_name,
      shipping_phone: selectedAddress.shipping_phone,
      shipping_address: selectedAddress.shipping_address,
      amount: selectedTotalWithDiscount,
      payment_type: selectedPaymentMethod,
      orderDetailsData: units.map((item) => ({
        product_name: item.product.product_name,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };
    console.log(data);
    // console.log(orderDetailsData);

    dispatch(fetchAddOrder(data));
    Swal.fire({
      icon: "success",
      title: "Đặt hàng thành công!",
      showConfirmButton: false,
      timer: 500,
    });
    navigate("/home");
  };

  // const { addresses, loading: addressLoading, error: addressError } = addressState;
  console.log("CartItem:", cartitems);
  console.log("Address:", addressState);

  // if (cartitems.loading) {
  //   return <p>Loading...</p>;
  // }

  if (cartitems.error) {
    return <p>Error: {cartitems.error}</p>;
  }

  const handleOrder = () => {
    if (!selectedAddress && !selectedPaymentMethod) {
      setErrorMessage(
        "Vui lòng chọn địa chỉ giao hàng và phương thức thanh toán."
      );
      return;
    }
    if (!selectedAddress) {
      setErrorMessage("Vui lòng chọn địa chỉ giao hàng.");
      return;
    }
    if (!selectedPaymentMethod) {
      setErrorMessage("Vui lòng chọn phương thức thanh toán.");
      return;
    }
    // Proceed with order submission if both are selected
    setErrorMessage("");
    alert("Đặt hàng thành công!"); // Replace with actual order handling logic
  };

  return (
    <div>
      <Header />
      <hr />
      <div className="container mt-2">
        <main role="main">
          <div className="card">
            <div className="card-body">
              <div className="py-5 text-center">
                <i className="fa fa-credit-card fa-4x" aria-hidden="true"></i>
                <h2>Thanh toán</h2>
                <p className="lead mb-5">
                  Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng
                  trước khi Đặt hàng.
                </p>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 order-md-1 mb-4 mx-auto">
                  <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Giỏ hàng</span>
                  </h4>
                  <ul className="list-group mb-3">
                    {selectedProducts.map((item) => (
                      <li
                        className="list-group-item d-flex justify-content-between lh-condensed"
                        key={item.product.id}
                      >
                        <div>
                          <h6 className="my-0"> {item.product.product_name}</h6>
                          <small className="text-muted">
                            {" "}
                            {formatCurrency(item.product.price)} x{" "}
                            {item.quantity}
                          </small>
                        </div>
                        <span className="text-muted">
                          {" "}
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Tổng thành tiền</span>
                      <strong>{formatCurrency(selectedTotalWithDiscount)}</strong>
                    </li>
                  </ul>
                </div>

                <div className="col-md-8 order-md-2">
                  <h4 className="mb-3">Phương thức thanh toán</h4>
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <label htmlFor="kh_diachi">
                        <i
                          className="fa-solid fa-location-dot"
                          style={{ color: "#030811" }}
                        ></i>{" "}
                        Địa chỉ giao hàng
                      </label>
                      <div className="d-flex align-items-center">
                        <div className="form-control d-flex justify-content-between align-items-center">
                          <span>
                            {selectedAddress
                              ? `${selectedAddress.shipping_name}, ${selectedAddress.shipping_phone}, ${selectedAddress.shipping_address}`
                              : "Chưa chọn địa chỉ"}
                          </span>
                          <button
                            className="text-primary ml-2 p-0 border-0 bg-transparent"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            style={{ outline: "none", boxShadow: "none" }}
                          >
                            Thay đổi
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-block my-3">
                    <div className="custom-control custom-radio">
                      <input
                        id="httt-1"
                        name="httt_ma"
                        type="radio"
                        className="custom-control-input"
                        value="1"
                        onChange={() => setSelectedPaymentMethod("0")}
                      />
                      <label className="custom-control-label" htmlFor="httt-1">
                        Thanh toán khi nhận hàng
                      </label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input
                        id="httt-2"
                        name="httt_ma"
                        type="radio"
                        className="custom-control-input"
                        value="2"
                        onChange={() => setSelectedPaymentMethod("1")}
                      />
                      <label className="custom-control-label" htmlFor="httt-2">
                        Chuyển khoản
                      </label>
                    </div>
                  </div>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <hr className="mb-4" />
                  <button
                    className="btn btn-dark btn-lg btn-block"
                    type="button"
                    onClick={handleSubmit(submit)}
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Địa chỉ giao hàng
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h6>Chọn địa chỉ:</h6>
              {addressState.addresses.map((item) => (
                <div className="my-3" key={item.id}>
                  <div className="border rounded p-2 mb-2">
                    <div className="custom-control custom-radio">
                      <input
                        id={`address-${item.id}`}
                        name="address"
                        type="radio"
                        className="custom-control-input"
                        value={item.id}
                        onChange={(e) => setCurrentAddressId(e.target.value)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`address-${item.id}`}
                      >
                        <div className="font-weight-bold">
                          Người nhận: {item.shipping_name}
                        </div>
                        <div className="text-muted">
                          Số điện thoại: {item.shipping_phone}
                        </div>
                        <div className="text-muted">
                          Địa chỉ: {item.shipping_address}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleSaveAddress}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
