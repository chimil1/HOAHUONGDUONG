import React, { useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Loading from "./layout/Loading";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "../actions/unitActions";

function OrderDetailClient() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const unitState = useSelector((state) => state.unit);

    useEffect(() => {
        dispatch(fetchOrderDetails(id));
    }, [dispatch, id]);

    const order = unitState.units;

    if (!order) {
        return <p>Không có dữ liệu đơn hàng.</p>;
    }

    if (unitState.loading) {
        return <Loading />;
    }

    if (unitState.error) {
        return <p>Lỗi: {unitState.error}</p>;
    }

    const calculateTotalAmount = () => {
        if (Array.isArray(order.order_details)) {
            return order.order_details.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
        return 0;
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
            case 5:
                return "Hoàn thành";    
            default:
                return "Không rõ";
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };
    const handleBack = () => {
        navigate(-1); 
    };
    return (
        <div className="App">
            <Header />
            <section className="pt-3 m-t-80" style={{ backgroundColor: "#eee" }}>
                <div className="container">
                    <div className="">
                        <button className="btn btn-outline-dark" onClick={handleBack}>
                            <i className="fas fa-arrow-left"></i> Quay lại
                        </button>
                    </div>
                    <div className="card mx-auto my-4" style={{ maxWidth: '1000px' }}>
                        <div className="card-body p-3">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Hoa Hướng Dương Store
                                    <Link to="/product" className="btn btn-outline-dark btn-sm ml-2">
                                        <i className="fas fa-store"></i> Xem shop
                                    </Link>
                                </h5>
                                <p className="text-warning mb-0">
                                    {getStatusText(order.status)}
                                </p>
                            </div>
                            <div className="card mt-4">
                                <div className="card-body">
                                    <h5 className="card-title">Thông tin đơn hàng</h5>
                                    <p className="card-text">
                                        <strong>Địa chỉ:</strong> {order.shipping_address || "Không có thông tin"}
                                    </p>
                                    <p className="card-text">
                                        <strong>Số điện thoại:</strong> {order.shipping_phone || "Không có thông tin"}
                                    </p>
                                    <p className="card-text">
                                        <strong>Tên người nhận:</strong> {order.username || "Không có thông tin"}
                                    </p>
                                    <p className="card-text">
                                        <strong>Mã đơn hàng:</strong> {order.id ? `DH${order.id.toString().padStart(3, '0')}` : "Không có thông tin"}
                                    </p>
                                    <p className="card-text">
                                        <strong>Ngày mua:</strong> {order.created_at
                                            ? new Date(order.created_at).toLocaleString("vi-VN", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "Không có thông tin"}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="mb-2">
                                <div className="row no-gutters">
                                    {order.order_details && order.order_details.length > 0 ? (
                                        order.order_details.map((item, index) => (
                                            <div className="row no-gutters mb-3" key={index}>
                                                <div className="col-md-2 my-4">
                                                    <img
                                                        src={item.image || "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/01/24/075baabaeb4ac4fc1747919a769e1abc.JPG"} // URL hình ảnh động
                                                        alt={item.product_name || "Không có thông tin"}
                                                        className="img-fluid"
                                                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.product_name || "Không có thông tin"}</h5>
                                                        <p className="card-text d-flex justify-content-between">
                                                            <span>Phân loại hàng: {item.size}, {item.color}</span>
                                                            <span className="ml-3">Giá: {formatCurrency(item.price)}</span>
                                                        </p>
                                                        <p className="card-text">x{item.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Không có chi tiết đơn hàng.</p>
                                    )}
                                </div>
                                <hr />
                                <div className="d-flex justify-content-end mt-3">
                                    <h5>
                                        Thành tiền:{" "}
                                        <span className="text-dark">{formatCurrency(calculateTotalAmount(order))}</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </section>
        </div>
    );
}

export default OrderDetailClient;
