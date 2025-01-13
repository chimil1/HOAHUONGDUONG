import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Loading from "./layout/Loading";
import Swal from "sweetalert2";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrderManagementcline,
  updateOrderStatus,
} from "../actions/unitActions";

function OrderClient() {
  const unitState = useSelector((state) => state.unit);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelSuccessMessage, setCancelSuccessMessage] = useState(""); 
  useEffect(() => {
    dispatch(fetchOrderManagementcline(id));
  }, [dispatch, id]);

  if (unitState.loading) {
    return <Loading />;
  }
  if (unitState.error) {
    return <p>Lỗi: {unitState.error}</p>;
  }

  const getStatusText = (status) => {
    switch (status) {
      case 0: return "Chờ xác nhận";
      case 1: return "Đã xác nhận";
      case 2: return "Đang vận chuyển";
      case 3: return "Hoàn thành";
      case 4: return "Đã hủy";
      case 5: return "Đánh giá";
      default: return "Không rõ";
    }
  };

  const orderStatusCount = Array.isArray(unitState.units)
    ? unitState.units.reduce((counts, order) => {
      const statusText = getStatusText(order.status);
      counts[statusText] = (counts[statusText] || 0) + 1;
      return counts;
    }, {})

    : {};
  const totalOrdersCount = Array.isArray(unitState.units)
    ? unitState.units.length
    : 0;

  const calculateTotalAmount = (order) => {
    if (Array.isArray(order.order_details)) {
      return order.order_details.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }
    return 0;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    if (newStatus === 4 && cancelReason.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Vui lòng nhập lý do hủy đơn!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    try {
      await dispatch(updateOrderStatus(orderId, newStatus, cancelReason));
      dispatch(fetchOrderManagementcline(id));
      setShowCancelModal(false);
      setCancelReason("");
      if (newStatus === 4) {
        Swal.fire({
          icon: "success",
          title: "Đơn hàng đã được hủy thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra. Vui lòng thử lại!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  

  const handleCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  const isValidOrder = (order) => {
    return (
      order &&
      typeof order.status !== "undefined" &&
      order.status >= 0 &&
      order.status <= 5
    );
  };

  const filteredOrders = Array.isArray(unitState.units)
    ? selectedStatus === "all"
      ? unitState.units
      : unitState.units.filter(
        (order) =>
          isValidOrder(order) &&
          getStatusText(order.status) === selectedStatus
      )
    : [];

  return (
    <div className="App">
      <Header />
      <section className="pt-3" style={{ backgroundColor: "#eee" }}>
        <div className="container">
          <button className="btn btn-outline-dark mb-3 m-t-100" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i> Quay lại
          </button>
          {cancelSuccessMessage && (
            <div className="alert alert-success text-center" role="alert">
              {cancelSuccessMessage}
            </div>
          )}
          <section className="order-filter">
            <ul className="nav nav-tabs d-flex justify-content-between">
              <li className="nav-item">
                <Link
                  to="#"
                  className={`nav-link ${selectedStatus === "all" ? "active" : ""}`}
                  onClick={() => setSelectedStatus("all")}
                >
                  Tất cả {totalOrdersCount}
                </Link>
              </li>
              {["Chờ xác nhận", "Đã xác nhận", "Đang vận chuyển", "Hoàn thành", "Đã hủy"].map(
                (status) => (
                  <li className="nav-item" key={status}>
                    <Link
                      to="#"
                      className={`nav-link text-dark ${selectedStatus === status ? "active" : ""}`}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status} {orderStatusCount[status] || 0}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </section>
          {filteredOrders.length === 0 ? (
            <div className="card mx-auto my-4" style={{ height: "500px" }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <i className="fas fa-pencil-alt fa-3x text-dark mb-3"></i>
                <p>Không có đơn hàng nào.</p>
              </div>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div className="card mx-auto my-3" key={order.id}>
                <div className="card-body p-2">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Hoa Hướng Dương Store</h5>
                    <p className="text-warning mb-0">
                      {getStatusText(order.status)}
                    </p>
                  </div>

                  <div className="mb-2">
                    <div className="row no-gutters" style={{ marginLeft: "50px", marginTop: "10px", marginBottom: "10px" }}>
                      {Array.isArray(order.order_details) && order.order_details.length > 0 ? (
                        (expandedOrders[order.id] ? order.order_details : order.order_details.slice(0, 1)).map(
                          (item, index) => (
                            <div className="d-flex mb-3" key={index}>
                              <div className="col-md-2">
                                <div className="img-container" style={{ display: "flex", alignItems: "center" }}>
                                  <img
                                    src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/01/24/075baabaeb4ac4fc1747919a769e1abc.JPG"
                                    alt="Product"
                                    className="img-mb-5"
                                    style={{ width: "120px", height: "150px" }}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="card-body">
                                  <Link to={`/orderdetailclient/${item.order_id}`}>
                                    <h5 className="card-title">{item.product_name || "Không có thông tin"}</h5>
                                  </Link>
                                  <p className="card-text d-flex justify-content-between">
                                    <span>Phân loại hàng: {item.size}, {item.color}</span>
                                    <span className="ml-3">Giá: {formatCurrency(item.price)}</span>
                                  </p>
                                  <p className="card-text">x{item.quantity}</p>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <p>Không có chi tiết đơn hàng.</p>
                      )}
                      {Array.isArray(order.order_details) && order.order_details.length > 1 && (
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ cursor: "pointer", color: "black" }}
                          onClick={() => toggleExpand(order.id)}
                        >
                          {expandedOrders[order.id] ? (
                            <>
                              <span>Rút gọn</span>
                              <i className="fas fa-chevron-up ml-2"></i>
                            </>
                          ) : (
                            <>
                              <span>Xem thêm</span>
                              <i className="fas fa-chevron-down ml-2"></i>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="card-footer">
                      <div className="d-flex justify-content-end mt-3">
                        <h5>
                          Tổng tiền:{" "}
                          <span className="text-dark">
                            {formatCurrency(calculateTotalAmount(order))}
                          </span>
                        </h5>
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        {(order.status === 0 || order.status === 1) && (
                          <button
                            className="btn btn-danger btn-sm ml-2"
                            onClick={() => handleCancelOrder(order.id)}
                            aria-label="Hủy đơn hàng"
                          >
                            Hủy đơn
                          </button>
                        )}
                        {order.status === 2 && (
                          <button
                            className="btn btn-success btn-sm ml-2"
                            onClick={() => handleUpdateStatus(order.id, 3)}
                            aria-label="Đã nhận hàng"
                          >
                            Đã nhận được hàng
                          </button>
                        )}
                        {order.status === 3 && (
                          <Link
                            to={`/revieworder/${order.id}`}
                            className="btn btn-dark btn-sm ml-2"
                            aria-label="Đánh giá"
                          >
                            Đánh giá
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {showCancelModal && (
          <div
            className="modal fade show"
            style={{
              display: 'block',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1050,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            tabIndex="-1"
            aria-labelledby="cancelOrderModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog m-t-100">
              <div className="modal-content">
                <div className="modal-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h5
                    className="modal-title"
                    id="cancelOrderModalLabel"
                    style={{
                      fontFamily: 'Arial',
                      fontSize: '16px',
                      textAlign: 'center',
                      width: '100%',
                    }}
                  >
                    Chọn Lý Do Hủy
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowCancelModal(false)}
                    style={{
                      fontSize: '24px',
                      color: 'black',
                      border: 'none',
                      background: 'transparent',
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
             
                </div>
                <p
                    style={{
                      color: '#FFA500', 
                      fontSize: '14px',
                      marginTop: '8px',
                      textAlign: 'center', 
                    }}
                  >
                   * Vui lòng chon lý do hủy. Với lý do này, bạn sẽ hủy tất cả sản phẩm trong đơn hàng và không thể thay đổi sao đó
                  </p>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="cancelReason"></label>
                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input-dark"
                          type="radio"
                          name="cancelReason"
                          id="reason2"
                          value="Chất lượng sản phẩm không tốt"
                          checked={cancelReason === "Chất lượng sản phẩm không tốt"}
                          onChange={(e) => setCancelReason(e.target.value)}
                          style={{ accentColor: 'black' }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="reason2"
                          style={{ color: 'black' }}
                        >
                          Chất lượng sản phẩm không tốt
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input-dark"
                          type="radio"
                          name="cancelReason"
                          id="reason3"
                          value="Giao hàng chậm"
                          checked={cancelReason === "Giao hàng chậm"}
                          onChange={(e) => setCancelReason(e.target.value)}
                          style={{ accentColor: 'black' }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="reason3"
                          style={{ color: 'black' }}
                        >
                          Giao hàng chậm
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input-dark"
                          type="radio"
                          name="cancelReason"
                          id="reason4"
                          value="Sản phẩm hết hàng"
                          checked={cancelReason === "Sản phẩm hết hàng"}
                          onChange={(e) => setCancelReason(e.target.value)}
                          style={{ accentColor: 'black' }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="reason4"
                          style={{ color: 'black' }}
                        >
                          Không còn nhụ cầu sử dụng
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input-dark"
                          type="radio"
                          name="cancelReason"
                          id="reason5"
                          value="thay đổi voucher"
                          checked={cancelReason === "thay đổi voucher"}
                          onChange={(e) => setCancelReason(e.target.value)}
                          style={{ accentColor: 'black' }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="reason5"
                          style={{ color: 'black' }}
                        >
                          Muốn thay đổi mã giảm giá khác
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input-dark"
                          type="radio"
                          name="cancelReason"
                          id="reason3"
                          value="Lý do khác"
                          checked={cancelReason === "Lý do khác"}
                          onChange={(e) => setCancelReason(e.target.value)}
                          style={{ accentColor: 'black' }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="reason3"
                          style={{ color: 'black' }}
                        >
                          Lý do khác
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    style={{ backgroundColor: 'black', color: 'white' }}
                    onClick={() => handleUpdateStatus(selectedOrderId, 4)}
                    disabled={!cancelReason}
                  >
                    Xác nhận hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </section>

    </div>
  );
}

export default OrderClient;
