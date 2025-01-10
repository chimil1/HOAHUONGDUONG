import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Loading from "./layout/Loading";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrderManagementcline,
  updateOrderStatus,
} from "../actions/unitActions";

function OrderClient() {
  const unitState = useSelector((state) => state.unit);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    dispatch(fetchOrderManagementcline(id));
  }, [dispatch, id]);

  if (unitState.loading) {
    return <Loading></Loading>;
  }

  if (unitState.error) {
    return <p>Lỗi: {unitState.error}</p>;
  }

  // Hàm trả về trạng thái của đơn hàng theo mã số trạng thái
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
    await dispatch(updateOrderStatus(orderId, newStatus));
    dispatch(fetchOrderManagementcline(id)); 
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
  const currentDate = new Date(); 
  const currentOrders = [...filteredOrders].sort((a, b) => {
    const aDate = new Date(a.created_at);
    const bDate = new Date(b.created_at);

    return Math.abs(currentDate - aDate) - Math.abs(currentDate - bDate);
  });

  return (
    <div className="App">
      <Header />
      <section className="pt-3" style={{ backgroundColor: "#eee" }}>
        <div className="container">
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
          {currentOrders.length === 0 ? (
            <div className="card mx-auto my-4" style={{ height: "500px" }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <i className="fas fa-pencil-alt fa-3x text-dark mb-3"></i>
                <p>Không có đơn hàng nào.</p>
              </div>
            </div>
          ) : (
            currentOrders.map((order) => (
              <div className="card mx-auto my-4" key={order.id}>
                <div className="card-body p-2">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      Hoa Hướng Dương Store
                      <Link to="/product" className="btn btn-outline-dark btn-sm ml-2">
                        <i className="fas fa-store"></i> Xem shop
                      </Link>
                    </h5>
                    <p className="text-warning mb-0">
                      {getStatusText(order.status)}
                    </p>
                  </div>

                  <div className="mb-2">
                    <div className="row no-gutters">
                      <div className="col-md-2 my-4">
                        <img
                          src="https://bonita.vn/wp-content/uploads/2019/10/185867626_2870972756565864_3951010329652874109_n.jpg"
                          alt="Product"
                          className="img-mb-5"
                          style={{ width: "100px", height: "100px" ,marginRight: "10px" }}
                        />
                      </div>
                      <div className="col-md-6">
                        {Array.isArray(order.order_details) && order.order_details.length > 0 ? (
                          (expandedOrders[order.id] ? order.order_details : order.order_details.slice(0, 1)).map(
                            (item, index) => (
                              <div className="card-body" key={index}>
                                <Link to={`/orderdetailclient/${item.order_id}`}>
                                  <h5 className="card-title">{item.product_name || "Không có thông tin"}</h5>
                                </Link>
                                <p className="card-text d-flex justify-content-between">
                                  <span>Phân loại hàng: {item.size}, {item.color}</span>
                                  <span className="ml-3">Giá: {formatCurrency(item.price)}</span>
                                </p>
                                <p className="card-text">x{item.quantity}</p>
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
                            onClick={() => handleUpdateStatus(order.id, 4)}
                            aria-label="Hủy đơn hàng"
                          >
                            Hủy
                          </button>
                        )}
                        {order.status === 2 && (
                          <button
                            className="btn btn-success btn-sm ml-2"
                            onClick={() => handleUpdateStatus(order.id, 3)}
                            aria-label="Đã nhận hàng"
                          >
                            Hoàn tất
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
    </div>
  );
}

export default OrderClient;
