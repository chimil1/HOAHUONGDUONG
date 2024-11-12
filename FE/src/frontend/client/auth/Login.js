import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { gapi } from "gapi-script";
import { Alert, Button, Form } from "react-bootstrap";

const CLIENT_ID = "224971609838-toujoerabdjti5pca13srpfdoph1vje1.apps.googleusercontent.com";
const API_KEY = "AIzaSyBCACqgjix585Jnzm3aQFIDkOXhtTi6pww";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const initClient = async () => {
      try {
        await gapi.load("client:auth2", async () => {
          await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: "email",
          });
        });
      } catch (error) {
        console.error("Error initializing Google API client", error);
      }
    };
    initClient();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        login,
        password,
      });

      const user = response.data.user;

      if (user.role === 2) {
        setError("Tài khoản này đã bị khóa.");
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        setError("");
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("Tài khoản này đã bị khóa.");
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance) {
        const user = await authInstance.signIn();
        const idToken = user.getAuthResponse().id_token;

        // Gửi idToken đến server để xác thực
        const response = await axios.post("http://127.0.0.1:8000/api/auth/callback", {
          id_token: idToken,
        });

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);  // Lưu token vào localStorage
          navigate("/home");  // Chuyển hướng đến trang home
        } else {
          setError("Đăng nhập không thành công.");
        }
      } else {
        console.error("Google Auth instance not initialized");
      }
    } catch (error) {
      console.error("Error during sign-in", error);
      setError("Đăng nhập không thành công.");
    }
  };

  return (
      <div>
        <section
            className="vh-100 d-flex justify-content-center align-items-center"
            style={{
              backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
            }}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Đăng nhập</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Số điện thoại hoặc email"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Control
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                      </Form.Group>
                      <div className="d-flex justify-content-between mb-4">
                        <p className="text-muted mt-2 mb-0">
                          <Link to="/Register" className="fw-bold text-dark">
                            <u>Đăng ký</u>
                          </Link>
                        </p>
                        <p className="text-muted mt-2 mb-0">
                          <Link to="/forgot-password" className="fw-bold text-dark">
                            <u>Quên mật khẩu?</u>
                          </Link>
                        </p>
                      </div>
                      <div className="d-flex justify-content-center mb-3">
                        <Button className="btn btn-outline-dark btn-lg me-2 w-100" type="submit">
                          Đăng nhập
                        </Button>
                        <Button className="btn btn-outline-dark w-100" onClick={handleGoogleLogin}>
                          <i className="fab fa-google me-2"></i> Đăng nhập với Google
                        </Button>
                      </div>
                    </Form>
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
