import Header from "./layout/Header";
import Footer from "./layout/Footer";
import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import { fetchOrderDetails, updateOrderStatus } from "../actions/unitActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
function OrderDetailClient() {
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
                return "Hoàn thành";
            case 4:
                return "Đã hủy";
            default:
                return "Không rõ";
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const handleUpdateStatus = (id, newStatus) => {
        dispatch(updateOrderStatus(id, newStatus));
    };
    return (
        <div className="App ">
            <Header />
            <section className="pt-3" style={{ backgroundColor: "#eee" }}>
            <div className="card mx-auto my-4" style={{ maxWidth: '1000px'}}>
                <div className="card-body p-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Hoa Hướng Dương Store
                            <Link to="/product" className="btn btn-outline-dark btn-sm">
                                <i className="fas fa-store"></i> Xem shop
                            </Link>
                        </h5>
                        <p className=" text-warning mb-0">
                            {getStatusText(order.status)}
                        </p>
                    </div>
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Thông tin giao hàng</h5>
                            <p className="card-text">
                                <strong>Địa chỉ:</strong> {order.shipping_address || "Không có thông tin"}
                            </p>
                            <p className="card-text">
                                <strong>Số điện thoại:</strong> {order.shipping_phone || "Không có thông tin"}
                            </p>
                            <p className="card-text">
                                <strong>Tên người nhận:</strong> {order.username || "Không rõ"}
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className="mb-2">
                        <div className="row no-gutters">
                            <div className="col-md-2 my-4">
                                <img
                                    src="https://bonita.vn/wp-content/uploads/2019/10/185867626_2870972756565864_3951010329652874109_n.jpg"
                                    alt="Product"
                                    className="img-fluid"
                                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                                />
                            </div>
                            <div className="col-md-8">
                                {order.order_details && order.order_details.length > 0 ? (
                                    order.order_details.map((item, index) => (
                                        <div className="card-body" key={index}>
                                            <h5 className="card-title">{item.product_name || "Không có thông tin"}</h5>
                                            <p className="card-text d-flex justify-content-between">
                                                <span>Phân loại hàng: {item.size}, {item.color}</span>
                                                <span className="ml-3">Giá: {formatCurrency(item.price)}</span>
                                            </p>
                                            <p className="card-text">x{item.quantity}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Không có chi tiết đơn hàng.</p>
                                )}
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-end mt-3">
                            <h5>
                                Thành tiền:{" "}
                                <span className="text-primary">{formatCurrency(calculateTotalAmount(order))}</span>
                            </h5>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                        {order.status === 1 && (
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
                        Đã nhận hàng
                      </button>
                    )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-footer mt-5">
                <Footer />
            </div>
            </section>
        </div>
    
    );
}
export default OrderDetailClient