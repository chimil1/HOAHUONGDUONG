import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Loading from "./layout/Loading";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  fetchOrderManagementcline,
  updateOrderStatus,
  fetchProductFind,
  fetchReviewFind,
  createReview
} from "../actions/unitActions";

function OrderClient() {
  const unitState = useSelector((state) => state.unit);
  const productState = useSelector((state) => state.products);
  const reviewState = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const cancelReasons = [
    "Đổi ý, không muốn mua nữa",
    "Đặt nhầm sản phẩm",
    "Thời gian giao hàng lâu",
    "Phí vận chuyển cao",
    "Lý do khác",
  ];

  useEffect(() => {
    dispatch(fetchProductFind());
    dispatch(fetchReviewFind());
  }, [dispatch]);

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
      case 3: return "Đã nhận hàng";
      case 4: return "Đã hủy";
      case 5: return "Hoàn thành";
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

    ? unitState.units.length
    : 0;

  const calculateTotalAmount = (order) => {
    if (Array.isArray(order.order_details)) {
      return order.order_details.reduce(
        (total, item) => total + item.price * item.quantity,
        0
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
    await dispatch(updateOrderStatus(orderId, newStatus));
    dispatch(fetchOrderManagementcline(id));
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
  const currentDate = new Date();
  const filteredOrders = Array.isArray(unitState.units)
  ? [...unitState.units]
      .filter(
        (order) =>
          selectedStatus === "all" ||
          (isValidOrder(order) &&
            getStatusText(order.status) === selectedStatus)
      )
      .sort((a, b) => {
        const aDate = new Date(a.created_at);
        const bDate = new Date(b.created_at);
      return Math.abs(currentDate - aDate) - Math.abs(currentDate - bDate);
      })
  : [];


  const handleShowCancelModal = (orderId) => {
    setCurrentOrderId(orderId);
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setSelectedReason("");
  };

  const handleConfirmCancel = () => {
    if (!selectedReason) {
      alert("Vui lòng chọn lý do hủy!");
      return;
    }
    handleUpdateStatus(currentOrderId, 4);
    handleCloseCancelModal();
  };
    ? selectedStatus === "all"
      ? unitState.units
      : unitState.units.filter(
        (order) =>
          isValidOrder(order) &&
          getStatusText(order.status) === selectedStatus
      )
    : [];

  const handleNavigateProduct = (nameProduct, idOrder) => {
    const findProduct = productState.products;
    const findReview = reviewState.units;

    const product = findProduct?.find(
      (product) => product.product_name === nameProduct
    );
    const reviews = findReview?.find(
      (review) => review.product_id === product.id && review.order_id === idOrder
    );

    if (reviews) {
      Swal.fire({
        text: "Sản phẩm này đã được bạn đánh giá rồi!",
        icon: "info",
        confirmButtonText: "OK",
      });
    } else if (product) {
      navigate(`/product/${product.id}`, { state: { orderId: idOrder } });
      dispatch(createReview({ order_id: idOrder, product_id: product.id }));
      dispatch(updateOrderStatus(idOrder, 5)); 
    } else {
      Swal.fire({
        text: "Sản phẩm không tồn tại!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="App">
      <Header />
      <section className="pt-3 m-t-100" style={{ backgroundColor: "#eee" }}>
        <div className="container">
          <button className="btn btn-outline-dark mb-3" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i> Quay lại
          </button>
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
                            onClick={() => handleShowCancelModal(order.id)}
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
        <Footer />
      </section>
      <Modal show={showCancelModal} onHide={handleCloseCancelModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Vui Lòng Chọn Lí Do Hủy Đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cancelReasons.map((reason, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input-dark"
                type="radio"
                name="cancelReason"
                id={`reason-${index}`}
                value={reason}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <label className="form-check-label" htmlFor={`reason-${index}`}>
                {reason}
              </label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancelModal}>
            Đóng
          </Button>
          <Button variant="dark" onClick={handleConfirmCancel}>
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderClient;
