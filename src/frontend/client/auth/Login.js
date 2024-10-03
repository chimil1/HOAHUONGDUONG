import { Link } from "react-router-dom";
import React, { useState } from "react";
import { gapi } from 'gapi-script';

const CLIENT_ID = '352611474056-l4ld31sg14qqeodps0fqe5828ka6dhu4.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBqI--zahC1aMdEzHXzr6ualtXtMfiGoJU';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Xử lý đăng nhập ở đây
      console.log("Form hợp lệ. Xử lý đăng nhập...");
    }
  };

  const handleLogin = () => {
    try {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signIn().then(googleUser => {
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Email: ' + profile.getEmail());
      });
    } catch (error) {
      console.error("Error with Google sign-in", error);
    }
  };

  return (
    <div>
      <section
        className="vh-100"
        style={{ backgroundImage: "url(../../asset/images/slide-03.jpg)" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Đăng nhập</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Đăng nhập
                    </button>
                  </form>
                  <hr className="my-4" />

                  <button
                    className="btn btn-lg btn-block btn-primary"
                    style={{ backgroundColor: "#dd4b39" }}
                    type="button"
                    onClick={handleLogin}
                  >
                    <i className="fab fa-google me-2"></i> Đăng nhập với Google
                  </button>
                  <p>
                    Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
