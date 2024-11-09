import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "../actions/unitActions";
import { useParams } from "react-router-dom";


function OrderDetail() {
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
    return <p>Đang tải...</p>;
  }

  if (unitState.error) {
    return <p>Lỗi: {unitState.error}</p>;
  }

  return (
    <div className="page-wrapper">
      <Menu />
      <div className="page-container">
        <Header />
        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-header">
                      <div className="overview-wrap">
                        <h2 className="title-5 m-b-35">Hóa Đơn</h2>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-data2">
                        <thead>
                          <tr>
                            <th>Tên người nhận</th>
                            <th>Phương thức thanh toán</th>
                            {order.payment_type === 1 && <th>Ngân hàng</th>}
                            {order.payment_type === 1 && <th>STK</th>}
                            <th>Tổng tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={order.id} className="tr-shadow">
                            <td>{order.username || "Không có thông tin"}</td>
                            <td>
                              {order.payment_type === 0
                                ? "Thanh toán khi nhận hàng"
                                : "Thanh toán chuyển khoản"}
                            </td>
                            {order.payment_type === 1 && (
                              <td>{order.bankname}</td>
                            )}
                            {order.payment_type === 1 && (
                              <td>{order.account_number}</td>
                            )}
                            <td>{order.amount}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="table table-data2">
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Màu</th>
                            <th>Kích cỡ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.order_details &&
                          order.order_details.length > 0 ? (
                            order.order_details.map((item, index) => (
                              <tr key={index} className="tr-shadow">
                                <td>
                                  {item.product_name || "Không có thông tin"}
                                </td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.color}</td>
                                <td>{item.size}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5">
                                Không có sản phẩm nào trong đơn hàng
                              </td>
                            </tr>
                          )}
                        </tbody>  
                      </table>
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
  );
}
export default OrderDetail;
