import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoupons ,fetchDeleteCoupon} from "../actions/unitActions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Coupons() {
    const dispatch = useDispatch();
    const unitState = useSelector((state) => state.unit);
    //format giá sản phẩm
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    useEffect(() => {
        dispatch(fetchCoupons());
    }, [dispatch]);


    const handleDelete = (id) => {
        Swal.fire({
            text: "Bạn có muốn xóa sản phẩm này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tiếp tục",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text: "Xóa sản phẩm thành công!",
                    icon: "success",
                });
                dispatch(fetchDeleteCoupon(id));
            }
        });
    };

    if (unitState.loading) {
        return <p>Đang tải...</p>;
    }

    if (unitState.error) {
        return <p>Lỗi: {unitState.error}</p>;
    }

    if (!Array.isArray(unitState.units)) {
        return <p>Error: dữ liệu là  một mảng.</p>;
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
                                                <h2 className="title-5 m-b-35">Bảng mã giảm giá</h2>
                                                <Link
                                                    className="au-btn au-btn-icon au-btn--green bg-dark"
                                                    to="/Addcoupon"
                                                >
                                                    <i className="zmdi zmdi-plus"></i>Thêm mã giảm giá
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-data2">
                                                <thead>
                                                <tr>
                                                    <th>Mã giảm giá</th>
                                                    <th>Giá giảm </th>
                                                    <th>Loại giảm giá</th>
                                                    <th>Giá trị chiết khấu</th>
                                                    <th>Ngày bắt đầu</th>
                                                    <th>Ngày kết thúc</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {unitState.units.map((item, index) => (
                                                    <tr key={index} className="tr-shadow">
                                                        <td>{item.code_name|| "Không có thông tin"}</td>
                                                        <td>
                                                            {formatCurrency(item.minium_order_value)}
                                                        </td>
                                                        <td>
                                                            {item.discount_type ===0 ? (
                                                                <span className="badge badge-success">Thanh toán tiền mặt</span>
                                                            ) : (
                                                                <span className="badge badge-warning">Thanh toán tài khoản</span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {item.discount_value || "Không có thông tin"}
                                                        </td>
                                                        <td>{item.start_date}</td>
                                                        <td>{item.end_date}</td>
                                                        <td className="d-flex justify-content-center">
                                                            <div className="table-data-feature">
                                                                <Link to={`/editcoupon/${item.id}`}>
                                                                    <button
                                                                        className="item"
                                                                        data-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title="Sửa"
                                                                    >

                                                                        <i className="zmdi zmdi-edit"></i>

                                                                    </button>
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDelete(item.id)}
                                                                    className="item"
                                                                    data-toggle="tooltip"
                                                                    data-placement="top"
                                                                    title="Delete"
                                                                >
                                                                    <i className="zmdi zmdi-delete"></i>
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

export default Coupons;
