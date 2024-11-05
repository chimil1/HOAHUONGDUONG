import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Đã gửi liên kết khôi phục mật khẩu đến email của bạn.');
        setError('');
      } else {
        setError(data.message || 'Đã xảy ra lỗi khi gửi email khôi phục mật khẩu.');
        setMessage('');
      }
    } catch (error) {
      setError('Đã xảy ra lỗi khi gửi email khôi phục mật khẩu.');
      setMessage('');
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
                    <h2 className="text-uppercase text-center mb-4">Quên mật khẩu</h2>
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
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
                      <button
                          className="btn btn-outline-dark btn-lg btn-block"
                          type="submit"
                      >
                        Gửi liên kết khôi phục mật khẩu
                      </button>
                      <p className="text-center text-muted mt-2 mb-0">
                        Bạn có muốn? <Link to="/Login" className="fw-bold text-body"><u>Quay lại đăng nhập</u></Link>
                      </p>
                      <hr className="my-4" />
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

export default ForgotPassword;
