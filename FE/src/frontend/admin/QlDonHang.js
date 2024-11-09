import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, approveOrder } from "../actions/unitActions";
import { Link, useNavigate } from "react-router-dom";

function QlDonHang() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unitState = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleApproveOrder = (id) => {
    dispatch(approveOrder(id));
    navigate("/qldonhang"); 
  };

  if (unitState.loading) {
    return <p>Đang tải...</p>;
  }

  if (unitState.error) {
    return <p>Lỗi: {unitState.error}</p>;
  }

  if (!Array.isArray(unitState.units) || unitState.units.length === 0) {
    return <p>Lỗi: Định dạng dữ liệu không chính xác hoặc không có đơn hàng nào.</p>;
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
                        <h2 className="title-5 m-b-35">Đơn hàng</h2>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-data2">
                        <thead>
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Tên người nhận</th>
                            <th>Địa chỉ</th>
                            <th>SDT</th>
                            <th>Trạng thái</th>
                            <th>Trạng thái thanh toán</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {unitState.units.map((item) => (
                            <tr key={item.id} className="tr-shadow">
                              <td>
                                <img src="https://via.placeholder.com/50" alt="Hình ảnh" />
                              </td>
                              <td>{item.username || "Không có thông tin"}</td>
                              <td>{item.shipping_address || "Không có thông tin"}</td>
                              <td>{item.shipping_phone || "Không có thông tin"}</td>
                              <td>
                              {item.status === 0 ? (
                                <span className="badge badge-success">Đã xác nhận</span>
                              ) : (
                                <span className="badge badge-warning">Chờ xác nhận</span>
                              )}
                              </td>
                              <td>
                                {item.payment_type === 0 ? (
                                  <span className="badge badge-success">Thanh toán tiền mặt</span>
                                ) : (
                                  <span className="badge badge-warning">Thanh toán tài khoản</span>
                                )}
                              </td>
                              <td>
                                <div className="table-data-feature">
                                  <Link to={`/orderdetails/${item.id}`}>
                                    <button className="item" title="Chi tiết">
                                      <i className="zmdi zmdi-mail-send"></i>
                                    </button>
                                  </Link>
                                </div>
                              </td>
                              <td>
                                <div className="table-data-feature">
                                  <button
                                    onClick={() => handleApproveOrder(item.id)}
                                    className="item"
                                    title="Duyệt đơn hàng"
                                  >
                                    <i className="zmdi zmdi-check"></i>
                                  </button>
                                </div>  
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default QlDonHang;
