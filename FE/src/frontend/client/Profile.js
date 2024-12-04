import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../actions/unitActions";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";

function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const userState = useSelector((state) => state.unit);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
      setUserId(userId);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const submit = (data, event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        text: "Mật khẩu mới và xác nhận mật khẩu không khớp!",
        icon: "error",
      });
      return;
    }

    const jsonData = {
      password: data.newPassword,
      oldPw: data.oldPassword,
    };

    try {
      dispatch(updateUser(id, jsonData));
      Swal.fire({
        text: "Đổi mật khẩu thành công!",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        text: "Có lỗi xảy ra khi đổi mật khẩu!",
        icon: "error",
      });
    }
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
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0 text-muted">Họ Và Tên</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-success mb-0">{user.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0 text-muted">Email:</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-success mb-0">{user.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0 text-muted">Phone:</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-success mb-0">{user.phone}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="mt-5">
                      <form action="" method="post">
                        <Link to="">
                          <button
                              type="button"
                              className="btn btn-outline-dark me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#examppass"
                          >
                            Đổi mật khẩu
                          </button>
                        </Link>
                        <Link
                            name=""
                            className="btn btn-outline-dark me-2"
                            to={`/listaddress/${userId}`}
                        >
                          Địa Chỉ Giao Hàng
                        </Link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal đổi mật khẩu */}
        <form onSubmit={(e) => handleSubmit((data) => submit(data, e))(e)}>
          <div
              className="modal fade"
              id="examppass"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Đổi Mật Khẩu
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Mật khẩu cũ</label>
                    <input
                        {...register("oldPassword", { required: "Mật khẩu cũ là bắt buộc" })}
                        type="password"
                        className="form-control"
                    />
                    {errors.oldPassword && <p className="text-danger">{errors.oldPassword.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mật khẩu mới</label>
                    <input
                        {...register("newPassword", { required: "Mật khẩu mới là bắt buộc" })}
                        type="password"
                        className="form-control"
                    />
                    {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nhập lại mật khẩu mới</label>
                    <input
                        {...register("confirmPassword", { required: "Xác nhận mật khẩu là bắt buộc" })}
                        type="password"
                        className="form-control"
                    />
                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Đóng
                  </button>
                  <button type="submit" className="btn btn-success">
                    Đồng ý
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Footer />
      </div>
  );
}

export default Profile;
