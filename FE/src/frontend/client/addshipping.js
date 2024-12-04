import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { fetchUser, fetchAddAddress } from "../actions/unitActions";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

function AddShipping() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const userState = useSelector((state) => state.unit);
    const shippingState = useSelector((state) => state.unit);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch, id]);

    if (userState.loading) {
        return <p>Loading...</p>;
    }

    if (userState.error) {
        return <p>Error: {userState.error}</p>;
    }

    const user = userState.user;

    if (!user) {
        return <p>No user data available.</p>;
    }

    if (shippingState.loading) {
        return <p>Loading...</p>;
    }

    if (shippingState.error) {
        return <p>Error: {shippingState.error}</p>;
    }
    const submit = async (data) => {
        const jsonData = {
            shipping_name: data.shipping_name,
            shipping_phone: data.shipping_phone,
            shipping_address: data.shipping_address,
        };

        try {
            await dispatch(fetchAddAddress(id, jsonData));
            Swal.fire({
                text: "Thêm địa chỉ thành công!",
                icon: "success",
            }).then(() => {
                navigate("/home");
            });
        } catch (error) {
            Swal.fire({
                text: "Có lỗi xảy ra khi thêm địa chỉ!",
                icon: "error",
            });
        }
    };

    return (
        <div>
            <Header />
            <section className="pt-5 m-t-60" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img
                                        src="../../asset/images/avatar.jpg"
                                        alt="avatar"
                                        className="rounded-circle img-fluid"
                                        style={{ width: "150px" }}
                                    />
                                    <div>
                                        {userState.user && (
                                            <div>
                                                <h5 className="my-3">{userState.user.name}</h5>
                                                <p className="text-success mb-1">{userState.user.email}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="text-center my-3">
                                        <h5 className="text-muted">Thêm địa chỉ</h5>
                                    </div>
                                    <form onSubmit={handleSubmit(submit)}>
                                        <div className="mb-3">
                                            <label className="form-label text-muted">Họ tên</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập tên người nhận"
                                                {...register("shipping_name", { required: "Họ tên là bắt buộc" })}
                                            />
                                            {errors.shipping_name && (
                                                <p className="text-danger">{errors.shipping_name.message}</p>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label text-muted">Số điện thoại</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Nhập số điện thoại"
                                                {...register("shipping_phone", { required: "Số điện thoại là bắt buộc" })}
                                            />
                                            {errors.shipping_phone && (
                                                <p className="text-danger">{errors.shipping_phone.message}</p>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label text-muted">Địa chỉ</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập địa chỉ người nhận"
                                                {...register("shipping_address", { required: "Địa chỉ là bắt buộc" })}
                                            />
                                            {errors.shipping_address && (
                                                <p className="text-danger">{errors.shipping_address.message}</p>
                                            )}
                                        </div>
                                        <button type="submit" className="btn btn-outline-dark">
                                            Đồng ý
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default AddShipping;
