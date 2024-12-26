import React, { useEffect, useState } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShippingAddresses, fetchShippingDelete } from "../actions/unitActions";
import Swal from "sweetalert2";

const ListAddress = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const addressesState = useSelector((state) => state.unit);
    const navigate = useNavigate();
    const itemsPerPage = 6; // Đặt số lượng địa chỉ mỗi trang
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchShippingAddresses(id));
    }, [dispatch, id]);

    if (addressesState.loading) return <p>Loading...</p>;
    if (addressesState.error) return <p>Error: {addressesState.error}</p>;

    const addresses = Array.isArray(addressesState.units) ? addressesState.units : [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentAddresses = addresses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(addresses.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleDelete = (addressId) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa địa chỉ này?',
            text: "Địa chỉ này sẽ không thể khôi phục!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(fetchShippingDelete(addressId));
                Swal.fire({
                    text: "Xóa địa chỉ thành công!",
                    icon: "success",
                }).then(() => {
                    navigate(`/profile/${id}`);
                });
            }
        });
    };

    return (
        <div>
            <Header />
            <section className="pt-5" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="d-flex justify-content-between mb-4">
                        <div className="d-flex justify-content-between mb-4">
                            <Link className="btn btn-outline-dark me-2" to={`/profile/${id}`}>
                                Quay Lại
                            </Link>
                        </div>
                        <div className="d-flex justify-content-end mb-4">
                            <Link className="btn btn-outline-dark me-2" to={`/addshipping/${id}`}>
                                Thêm Địa Chỉ
                            </Link>
                        </div>
                    </div>
                    <div className="text-center mb-5">
                        <h2 className="text-dark">Danh sách địa chỉ giao hàng</h2>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên người nhận</th>
                                <th>Địa chỉ cụ thể</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentAddresses.length > 0 ? (
                                currentAddresses.map((item, index) => {
                                    const shippingAddress = item.shipping_address?.split(',') || [];
                                    const specificAddress = shippingAddress[0]?.trim() || 'N/A';
                                    const fullAddress = shippingAddress.slice(1).join(',') || 'N/A';
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td style={{ textTransform: 'capitalize' }}>{item.shipping_name}</td>
                                            <td>{specificAddress}</td>
                                            <td>{fullAddress}</td>
                                            <td>{item.shipping_phone}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">Không có địa chỉ nào</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    {addresses.length > itemsPerPage && currentAddresses.length > 0 && (
                        <div className="d-flex justify-content-center mt-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="btn btn-outline-dark mr-2"
                            >
                                Trước
                            </button>
                            <span className="m-2">Trang {currentPage} / {totalPages}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="btn btn-outline-dark ml-2"
                            >
                                Sau
                            </button>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ListAddress;
