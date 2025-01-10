import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const userRole = localStorage.getItem("roleAdmin");
  if (
      tokenAdmin ||
      userRole === 0
  ) {
    navigate("/thongke");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          "http://127.0.0.1:8000/api/loginadmin",
          {
            login,
            password,
          }
      );

      console.log(response.data); // Kiểm tra phản hồi API

      const { user, token } = response.data;

      if (!user || !token) {
        setError("Đăng nhập thất bại. Hãy thử lại.");
        return;
      }

      if (user.role === 2) {
        setError("Tài khoản này đã bị khóa");
      } else if (user.role === 1) {
        setError("Bạn không có quyền đăng nhập");
      } else {
        localStorage.setItem("tokenAdmin", token);
        localStorage.setItem("admin", JSON.stringify(user.id));
        localStorage.setItem("roleAdmin", JSON.stringify(user.role));

        setError("");
        navigate("/thongke");
      }
    } catch (error) {
      console.error("Đăng nhập lỗi:", error);
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
      <div>
        <section
            className="vh-100 d-flex justify-content-center align-items-center"
            style={{
              backgroundImage:
                  "url('https://admin.bogomazing.com/resources/img/placeholders/backgrounds/image7.png')",
            }}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <div className="text-center mb-4">
                      <img
                          src="https://i.pinimg.com/originals/bc/43/98/bc439871417621836a0eeea768d60944.jpg"
                          alt="Admin Avatar"
                          className="rounded-circle"
                          style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                    <h2 className="text-uppercase text-center mb-5">
                      Đăng nhập Admin
                    </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
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
                      <div className="d-flex justify-content-center mb-3">
                        <Button
                            className="btn btn-outline-dark btn-lg me-2 w-100"
                            type="submit"
                        >
                          Đăng nhập
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

export default LoginForm;
