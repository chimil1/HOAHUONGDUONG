import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Loading from "../client/layout/Loading";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "../actions/unitActions";
import { useParams } from "react-router-dom";

function OrderDetails() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const unitState = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  const order = unitState.units;

  if (!order) {
    return <p>Không có dữ liệu đơn hàng.</p>;
  }

  if (unitState.loading) {
    return <Loading/>;
  }

  if (unitState.error) {
    return <p>Lỗi: {unitState.error}</p>;
  }

  const calculateTotalAmount = () => {
    if (Array.isArray(order.order_details)) {
      return order.order_details.reduce((total, item) => total + item.price * item.quantity, 0);
    }
    return 0; // Trả về 0 nếu không có order_details hợp lệ
  };

  const totalAmount = calculateTotalAmount();

  // Định dạng giá trị theo VND
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="page-container">
        <div className="main-content m-t-100">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-header">
                      <div className="overview-wrap">
                        <h2 className="title-5 m-b-35">Hóa Đơn Chi Tiết</h2>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="order-info">
                        <h4 className="mb-4">
                          <strong>Thông tin khách hàng</strong>
                        </h4>
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <td>
                                <strong>Đơn hàng:</strong> {order.id ? `DH${order.id.toString().padStart(3, "0")}` : "Không có thông tin"}
                              </td>
                              <td>
                                <strong>Tên người nhận:</strong> {order.username || "Không có thông tin"}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Ngày đặt hàng:</strong>{" "}
                                {order.created_at
                                  ? new Date(order.created_at).toLocaleString("vi-VN", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "Không có thông tin"}
                              </td>
                              <td>
                                <strong>Địa chỉ:</strong> {order.shipping_address || "Không có thông tin"}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Số điện thoại:</strong> {order.shipping_phone || "Không có thông tin"}
                              </td>
                              <td>
                                <strong>Phương thức thanh toán:</strong>{" "}
                                {order.payment_type === 0 ? "Thanh toán khi nhận hàng" : "Thanh toán chuyển khoản"}
                              </td>
                            </tr>
                            {order.payment_type === 1 && (
                              <tr>
                                <td>
                                  <strong>Ngân hàng:</strong> {order.bankname}
                                </td>
                                <td>
                                  <strong>STK:</strong> {order.account_number}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        <h4 className="mt-5">
                          <strong>Thông tin sản phẩm</strong>
                        </h4>
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Sản phẩm</th>
                              <th>Số lượng</th>
                              <th>Giá</th>
                              <th>Tổng giá</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.order_details && order.order_details.length > 0 ? (
                              order.order_details.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.product_name || "Không có thông tin"}</td>
                                  <td>{item.quantity}</td>
                                  <td>{formatCurrency(item.price)}</td>
                                  <td>{formatCurrency(item.price * item.quantity)}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4">Không có sản phẩm nào trong đơn hàng.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        <div className="order-summary mt-4">
                          <div className="row">
                            <div className="col-md-6 text-right">
                              <strong>Tổng tiền hóa đơn:</strong>
                            </div>
                            <div className="col-md-6">
                              <strong>{formatCurrency(totalAmount)}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer">
                      <Footer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
