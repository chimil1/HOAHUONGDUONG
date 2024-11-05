import React, { useState } from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [email, setEmail] = useState(query.get('email') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const token = query.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: confirmPassword,
          token,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Đổi mật khẩu thành công!");
        navigate('/login');
      } else {
        setMessage(data.message || "Đã có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      setMessage("Đã có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
      <div>
        <section
            className="vh-100 d-flex justify-content-center align-items-center"
            style={{
              backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card shadow-lg border-0 rounded">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-4">Đổi mật khẩu</h2>
                    {message && <div className="alert alert-info">{message}</div>}
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <label className="form-label mb-0" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                      </div>
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label mb-0 " htmlFor="password">Mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control form-control-lg"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label mb-0" htmlFor="confirm-password">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="form-control form-control-lg"
                                placeholder="Xác nhận mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                          </div>
                        </div>
                      </div>
                      <button
                          className="btn btn-outline-dark btn-lg btn-block"
                          type="submit"
                      >
                        Đổi mật khẩu
                      </button>
                      <p className="text-center text-muted mt-2 mb-0">
                        Bạn có muốn? <Link to="/Login" className="fw-bold text-body"><u>Quay lại đăng nhập</u></Link>
                      </p>
                      <hr className="my-4"/>
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

export default ResetPassword;
