import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderManagement } from "../actions/unitActions";
import {Link, useParams } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function OrderManagement() {
    const { id } = useParams(); // Lấy user ID từ URL
    const dispatch = useDispatch();
    const unitState = useSelector((state) => state.unit); // Lấy trạng thái đơn hàng từ Redux Store

    // State cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    useEffect(() => {
        if (id) dispatch(fetchOrderManagement(id)); // Dispatch action để tải dữ liệu đơn hàng
    }, [dispatch, id]);

    // Xử lý phân trang
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    const currentOrders = unitState.units
        ? [...unitState.units]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sắp xếp theo ngày tạo (mới nhất trước)
            .slice(indexOfFirstOrder, indexOfLastOrder)
        : [];

    const totalPages = unitState.units
        ? Math.ceil(unitState.units.length / ordersPerPage)
        : 0;

    // Điều hướng trang
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Hiển thị trạng thái tải, lỗi hoặc không có dữ liệu
    if (unitState.loading) return <p>Đang tải...</p>;
    if (unitState.error) return <p>Lỗi: {unitState.error}</p>;
    if (!unitState.units || unitState.units.length === 0)
        return <p>Không có dữ liệu đơn hàng.</p>;

    return (
        <div className="page-wrapper">
           <Header />
            <div className="page-container">
                <div className="main-content m-t-100">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="title-5 m-b-35">Tổng đơn hàng đã mua</h2>
                                </div>
                                <div className="card-body">
                                    <table className="table table-data2">
                                        <thead>
                                        <tr>
                                            <th>Tên người nhận</th>
                                            <th>Địa chỉ</th>
                                            <th>SDT</th>
                                            <th>Trạng thái</th>
                                            <th>Thanh toán</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {currentOrders.map((item) => (
                                            <tr key={item.id} className="tr-shadow">
                                                <td>{item.username || "Không có thông tin"}</td>
                                                <td>{item.shipping_address || "Không có thông tin"}</td>
                                                <td>{item.shipping_phone || "Không có thông tin"}</td>
                                                <td>
                                                    {item.status === 0 ? (
                                                        <span className="badge badge-success">
                                                                Đã xác nhận
                                                            </span>
                                                    ) : (
                                                        <span className="badge badge-warning">
                                                                Chờ xác nhận
                                                            </span>
                                                    )}
                                                </td>
                                                <td>
                                                    {item.payment_type === 0 ? (
                                                        <span className="badge badge-success">
                                                                Tiền mặt
                                                            </span>
                                                    ) : (
                                                        <span className="badge badge-warning">
                                                                Tài khoản
                                                            </span>
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
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <div
                                        className="pagination-center d-flex justify-content-between align-items-center mt-3"
                                        style={{width: "300px", margin: "0 auto"}}>
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
                                            className="btn btn-outline-dark mr-2c"
                                        >
                                            Trang sau
                                        </button>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <Footer/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderManagement;