import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";

function Register() {
  const initialState = {
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateInput = () => {
    if (Object.values(formData).some((value) => !value)) {
      setError("Không được bỏ trống.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateInput()) return;

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      setSuccess(response.data.message);
      setTimeout(() => navigate("/Login"), 2000);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        setError(errorMessages.join(", "));
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };

  return (
      <div>
        <section className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Đăng ký</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <form onSubmit={handleSubmit}>
                      <div className="form-row mb-4">
                        <div className="col">
                          <label htmlFor="name">Họ tên</label>
                          <input
                              type="text"
                              className="form-control form-control-lg"
                              id="name"
                              placeholder="Họ tên"
                              value={formData.name}
                              onChange={handleChange}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="phone">Số điện thoại</label>
                          <input
                              type="number"
                              className="form-control form-control-lg"
                              id="phone"
                              placeholder="Số điện thoại"
                              value={formData.phone}
                              onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                      </div>
                      <div className="form-row mb-4">
                        <div className="col">
                          <label htmlFor="password">Mật khẩu</label>
                          <input
                              type="password"
                              className="form-control form-control-lg"
                              id="password"
                              placeholder="Mật khẩu"
                              value={formData.password}
                              onChange={handleChange}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                          <input
                              type="password"
                              className="form-control form-control-lg"
                              id="confirmPassword"
                              placeholder="Nhập lại mật khẩu"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-dark btn-block btn-lg gradient-custom-4">Đăng ký</button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Đã có tài khoản? <Link to="/Login" className="fw-bold text-body"><u>Đăng nhập ngay</u></Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}

export default Register;
