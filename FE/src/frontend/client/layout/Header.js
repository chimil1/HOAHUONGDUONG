import React, { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserId(null);
    navigate("/login");
  };

  return (
      <div>
        <header>
          <div className="container-menu-desktop">
            <div className="menu-desktop">
              <nav className="limiter-menu-desktop container">
                <Link to="/" className="logo">
                  <img src="../../asset/images/icons/logo2.png" alt="IMG-LOGO" />
                </Link>

                <div className="menu-desktop">
                  <ul className="main-menu">
                    <li>
                      <Link to="/home">TRANG CHỦ</Link>
                    </li>
                    <li>
                      <Link to="/Product">SẢN PHẨM</Link>
                    </li>
                    <li>
                      <Link to="/blog">BÀI VIẾT</Link>
                    </li>
                    <li>
                      <Link to="/about">GIỚI THIỆU</Link>
                    </li>
                    <li>
                      <Link to="/contact">GÓP Ý</Link>
                    </li>
                  </ul>
                </div>

                <div className="wrap-icon-header flex-w flex-r-m">
                <div className="container-search-header m-3"> 
                <Link to='/search' className="input-group w-100">
                <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                  <i className="zmdi zmdi-search"></i>
                </div>
                </Link>
                </div>
                  {isLoggedIn ? (
                      <>
                        <Link to="/cart" className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
                          <i className="fas fa-shopping-cart"></i>
                        </Link>
                        <div className="dropdown">
                          <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                          >
                            <i className="fas fa-user"></i>
                          </button>
                          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <Link className="dropdown-item" to={`/profile/${userId}`}>
                              Tài khoản
                            </Link>
                            <Link className="dropdown-item" to="/profile">
                              Lịch sử giao dịch
                            </Link>
                            <button className="dropdown-item" onClick={handleLogout}>
                              Đăng Xuất
                            </button>
                          </div>
                        </div>
                      </>
                  ) : (
                      <>
                        <Link to="/login" className="btn btn-outline-dark mr-2">
                          Đăng nhập
                        </Link>
                        <Link to="/register" className="btn btn-outline-dark">
                          Đăng ký
                        </Link>
                      </>
                  )}
                </div>
              </nav>
            </div>
          </div>

         
        </header>
      </div>
  );
}

export default Header;
