import React, { useEffect, useState } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { Link, useParams ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShippingAddresses, fetchShippingDelete } from "../actions/unitActions";
import Swal from "sweetalert2";  // Thêm hành động xóa vào đây

function ListAddress() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { userId } = useParams();
    const userState = useSelector((state) => state.unit);
    const addressesState = userState;
    const navigate = useNavigate();

    const itemsPerPage = 4;
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
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
            dispatch(fetchShippingDelete(id));
            Swal.fire({
                text: "Xóa địa chỉ thành công!",
                icon: "success",
            }).then(() => {
                navigate(`/home`);
            });
        }
    };
    return (
        <div>
            <Header />
            <section className="pt-5" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="text-center mb-4">
                        <h2 className="text-muted">Danh sách địa chỉ giao hàng</h2>
                        <div className="d-flex justify-content-end mb-4">
                            <Link className="btn btn-outline-dark me-2" to={`/addshipping/${id}`}>
                                Thêm Địa Chỉ
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        {currentAddresses.length > 0 ? (
                            currentAddresses.map((item) => (
                                <div key={item.id} className="col-lg-6 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.shipping_name}</h5>
                                            <p className="text-muted mb-1">Địa chỉ: {item.shipping_address}</p>
                                            <p className="text-muted mb-1">Số điện thoại: {item.shipping_phone}</p>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="text-danger"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Không có địa chỉ nào</p>
                        )}
                    </div>
                    <div className="flex-c-m flex-w w-full p-t-45">
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
                            className="btn btn-outline-dark mr-2"
                        >
                            Sau
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default ListAddress;
