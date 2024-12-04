import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchUser, updateUserShipping } from "../actions/unitActions";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

function EditShipping() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const userState = useSelector((state) => state.unit);
    const navigate = useNavigate();

    const [receiverName, setReceiverName] = useState("");
    const [receiverAddress, setReceiverAddress] = useState("");
    const [receiverPhone, setReceiverPhone] = useState("");

    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (userState.user) {
            const { shippingName, shippingAddress, shippingPhone } = userState.user;
            setReceiverName(shippingName || "");
            setReceiverAddress(shippingAddress || "");
            setReceiverPhone(shippingPhone || "");
        }
    }, [userState.user]);

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

    const handleSubmit = () => {
        const updatedData = {
            shippingName: receiverName,
            shippingAddress: receiverAddress,
            shippingPhone: receiverPhone,
        };

        // dispatch(updateUserShipping(id, updatedData)).then(() => {
        //     navigate(`/profile/${id}`);
        // }).catch(error => {
        //     console.error("Update failed", error);
        // });
    };

    return (
        <div>
            <Header />
            <section className="pt-5 m-t-80" style={{ backgroundColor: "#eee" }}>
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
                                    <h5 className="my-3">{user.name}</h5>
                                    <p className="text-success mb-1">{user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="text-center my-3">
                                        <h5 className="text-muted">Sửa địa chỉ</h5>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted">
                                            Tên người nhận:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập tên người nhận"
                                            value={receiverName}
                                            onChange={(e) => setReceiverName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted">
                                            Địa chỉ người nhận:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập địa chỉ người nhận"
                                            value={receiverAddress}
                                            onChange={(e) => setReceiverAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted">
                                            Số điện thoại người nhận:
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Nhập số điện thoại"
                                            value={receiverPhone}
                                            onChange={(e) => setReceiverPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="mt-3 text-end">
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark me-2"
                                            onClick={handleSubmit}
                                        >
                                            Đồng ý
                                        </button>
                                    </div>
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

export default EditShipping;
