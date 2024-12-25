
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { fetchAddCoupon } from "../actions/unitActions";
import axios from "axios";
import Loading from "../client/layout/Loading";
function AddCoupon() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const unitState = useSelector((state) => state.unit);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm();

    if (unitState.loading) {
        return <p><Loading></Loading></p>;
    }

    if (unitState.error) {
        return <p>Error: {unitState.error}</p>;
    }
    const checkCouponCode = async (code) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/checkCode/${code}`
            );
            if (response.data.message === "Mã giảm giá đã tồn tại") {
                return false; // Mã giảm giá đã tồn tại
            }
            return true; // Mã giảm giá hợp lệ
        } catch (error) {
            console.error("Error checking code:", error);
            return false;
        }
    };

    const submit = async (data) => {
        // Kiểm tra mã giảm giá trước khi thêm
        const isCodeValid = await checkCouponCode(data.code_name);
        if (!isCodeValid) {
            // Hiển thị thông báo lỗi nếu mã đã tồn tại
            Swal.fire({
                text: "Mã giảm giá đã tồn tại!",
                icon: "error",
            });
            setError("code_name", {
                type: "manual",
                message: "Mã giảm giá đã tồn tại",
            });
            return; // Ngừng thực hiện nếu mã đã tồn tại
        }

        const formData = new FormData();
        formData.append("name_coupon", data.name_coupon);
        formData.append("code_name", data.code_name);
        formData.append("discount_value", data.discount_value);
        formData.append("minium_order_value", data.minium_order_value);
        formData.append("start_date", data.start_date);
        formData.append("end_date", data.end_date);

        dispatch(fetchAddCoupon(formData));
        Swal.fire({
            text: "Thêm mã giảm giá thành công!",
            icon: "success",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/coupon");
            }
        });
    };

    return (
        <div className="page-wrapper">
            <Menu />
            <div className="page-container">
                <Header />
                <div className="main-content">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="title-5 m-b-35">Thêm mã giảm giá</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(submit)}>
                                        <div className="form-group">
                                            <label htmlFor="name_coupon">Tên mã giảm giá</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name_coupon"
                                                placeholder="Nhập mã giảm giá"
                                                {...register("name_coupon", {
                                                    required: "Vui lòng nhập tên mã giảm giá",
                                                })}
                                            />
                                            {errors.name_coupon && (
                                                <p className="text-danger">
                                                    {errors.name_coupon.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="code_name">Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="code_name"
                                                placeholder="Nhập code"
                                                {...register("code_name", {
                                                    required: "Vui lòng nhập code",
                                                })}
                                            />
                                            {errors.code_name && (
                                                <p className="text-danger">
                                                    {errors.code_name.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="discount_value">Giá trị giảm giá(%)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="discount_value"
                                                placeholder="Nhập giá trị giảm giá"
                                                {...register("discount_value", {
                                                    required: "Vui lòng nhập giá trị giảm giá",
                                                    min: {
                                                        value: 1,
                                                        message: "Giá trị giảm giá phải lớn hơn 0",
                                                    },
                                                    max: {
                                                        value: 100,
                                                        message: "Giá trị giảm giá không được lớn hơn 100",
                                                    }, // Thêm kiểm tra giá trị tối đa
                                                })}
                                            />
                                            {errors.discount_value && (
                                                <p className="text-danger">
                                                    {errors.discount_value.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="minium_order_value">Giá tối thiểu</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="minium_order_value"
                                                placeholder="Nhập giá tối thiểu"
                                                {...register("minium_order_value", {
                                                    required: "Vui lòng nhập giá tối thiểu",
                                                    min: {
                                                        value: 0,
                                                        message: "Giá tối thiểu phải lớn hơn hoặc bằng 0",
                                                    }, // Không cho phép giá trị âm
                                                })}
                                            />
                                            {errors.minium_order_value && (
                                                <p className="text-danger">
                                                    {errors.minium_order_value.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="start_date">Ngày bắt đầu</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                id="start_date"
                                                {...register("start_date", {
                                                    required: "Vui lòng chọn ngày bắt đầu",
                                                })}
                                            />
                                            {errors.start_date && (
                                                <p className="text-danger">
                                                    {errors.start_date.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="end_date">Ngày kết thúc</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                id="end_date"
                                                {...register("end_date", {
                                                    required: "Vui lòng chọn ngày kết thúc",
                                                })}
                                            />
                                            {errors.end_date && (
                                                <p className="text-danger">{errors.end_date.message}</p>
                                            )}
                                        </div>

                                        <button type="submit" className="btn btn-dark">
                                            <i className="zmdi zmdi-plus"></i> Thêm mã giảm giá
                                        </button>
                                    </form>
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
    );
}

export default AddCoupon;
