import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../actions/unitActions";
import { FaCheck, FaShippingFast } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import Loading from "../client/layout/Loading";

function QLDonHang() {
  const dispatch = useDispatch();
  const unitState = useSelector((state) => state.unit);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const ordersPerPage = 5;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (unitState.loading) {
    return <Loading/> ;
  }

  if (unitState.error) {
    return <p>Lỗi: {unitState.error}</p>;
  }

  if (!Array.isArray(unitState.units) || unitState.units.length === 0) {
    return <p>Lỗi: Không có đơn hàng nào.</p>;
  }

  const handleUpdateStatus = (id, newStatus) => {
    dispatch(updateOrderStatus(id, newStatus));
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Chờ xác nhận";
      case 1:
        return "Đã xác nhận";
      case 2:
        return "Đang vận chuyển";
      case 3:
        return "Đã nhận hàng";
      case 4:
        return "Đã hủy";
      default:
        return "Không rõ";
    }
  };

  const formatOrderId = (id) => {
    return `DH${id.toString().padStart(3, "0")}`;
  };
  const filteredOrders = unitState.units.filter((order) => {
    const formattedOrderId = formatOrderId(order.id).toLowerCase();
    const search = searchTerm.trim().toLowerCase();
    return [...search].every((char) => formattedOrderId.includes(char));
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  // Lấy thời gian hiện tại
  const currentDate = new Date();

  // Sắp xếp đơn hàng dựa trên thời gian gần với thời gian hiện tại
  const currentOrders = [...filteredOrders]
    .sort((a, b) => {
      const aDate = new Date(a.created_at);
      const bDate = new Date(b.created_at);

      // Sắp xếp đơn hàng gần nhất với thời gian hiện tại lên đầu
      return Math.abs(currentDate - aDate) - Math.abs(currentDate - bDate);
    })
    .slice(indexOfFirstOrder, indexOfLastOrder); // Chọn đơn hàng theo trang

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Hàm chuyển trang trước
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Hàm chuyển trang sau
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="page-wrapper">
      <Menu />
      <div className="page-container">
        <Header />
        <div className="main-content m-t-100">
          <div className="section__content section__content--p40">
            <div className="container-fluid">
              <div className="card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <h2 className="title-5 m-b-35">Đơn hàng</h2>
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm theo mã đơn hàng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div style={{ overflowX: "auto" }}>
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="text-center text-nowrap">Mã Đơn hàng</th>
                              <th className="text-center text-nowrap">Tên người nhận</th>
                              <th className="text-center text-nowrap">Địa chỉ</th>
                              <th className="text-center text-nowrap">SDT</th>
                              <th className="text-center text-nowrap">Trạng thái đơn hàng</th>
                              <th className="text-center text-nowrap">Trạng thái thanh toán</th>
                              <th className="text-center text-nowrap">Hành động</th>
                              <th className="text-center text-nowrap">Chi tiết</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentOrders.map((item) => (
                              <tr key={item.id}>
                                <td className="text-center text-nowrap">{formatOrderId(item.id)}</td>
                                <td className="text-center text-nowrap">{item.username || "Không có thông tin"}</td>
                                <td className="text-center text-nowrap">{item.shipping_address || "Không có thông tin"}</td>
                                <td className="text-center text-nowrap">{item.shipping_phone || "Không có thông tin"}</td>
                                <td className="text-center text-nowrap">{getStatusText(item.status)}</td>
                                <td className="text-center text-nowrap">
                                  {item.payment_type === 0 ? (
                                    <span className="badge badge-success">Thanh toán tiền mặt</span>
                                  ) : (
                                    <span className="badge badge-warning">Thanh toán tài khoản</span>
                                  )}
                                </td>
                                <td className="text-center">
                                  <div className="d-flex justify-content-center">
                                    {item.status === 0 ? (
                                      <>
                                        <button
                                          className="btn btn-success btn-sm mr-2"
                                          onClick={() => handleUpdateStatus(item.id, 1)}
                                          aria-label="Xác nhận"
                                        >
                                          <FaCheck />
                                        </button>
                                      </>
                                    ) : item.status === 1 ? (
                                      <>
                                        <button
                                          className="btn btn-success btn-sm mr-2"
                                          onClick={() => handleUpdateStatus(item.id, 2)}
                                          aria-label="Vận chuyển"
                                        >
                                        <FaShippingFast />
                                        </button>
                                      </>
                                    ) : item.status === 2 ? (
                                      <>
                                        <span className="badge badge-primary">Đang vận chuyển</span>
                                      </>
                                    ) : item.status === 3 ? (
                                      
                                      <span className="badge badge-success">Đã nhận hàng</span>
                                    ) : item.status === 4 ? (
                                      
                                      <span className="badge badge-danger">Đã hủy</span>
                                    ) : null}
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div className="table-data-feature">
                                    <Link to={`/orderdetails/${item.id}`}>
                                      <button className="item">
                                        <i className="zmdi zmdi-mail-send"></i>
                                      </button>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* Chỉ hiển thị phần phân trang nếu số lượng đơn hàng lớn hơn ordersPerPage */}
                      {filteredOrders.length > ordersPerPage && (
                        <div
                          className="pagination-center d-flex justify-content-between align-items-center mt-3"
                          style={{ width: "300px", margin: "0 auto" }}
                        >
                          <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="btn btn-outline-dark mr-2"
                          >
                            Trang trước
                          </button>
                          <span>
                            Trang {currentPage} / {totalPages}
                          </span>
                          <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="btn btn-outline-dark mr-2"
                          >
                            Trang sau
                          </button>
                        </div>
                      )}
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

export default QLDonHang;
