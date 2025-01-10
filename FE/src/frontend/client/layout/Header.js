import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

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
  };

  return (
      <div>
        <header className="header_area sticky-header">
          <div className="container-menu-desktop">
            <div className="menu-desktop">
              <nav className="limiter-menu-desktop container">
                <Link to="/" className="logo">
                  <img src="../../asset/images/icons/logo2.png" alt="IMG-LOGO"/>
                </Link>

                <div className="menu-desktop fw-bold">
                  <ul className="main-menu">
                    <li>
                      <Link to="/home">TRANG CHỦ</Link>
                    </li>
                    <li>
                      <Link to="/product">SẢN PHẨM</Link>
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
                  </div>
                  {isLoggedIn ? (
                      <>
                        <Link to="/cart" className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
                          <i className="fas fa-shopping-cart"></i>
                        </Link>

                        <div>
                          <Link className="icon-header-item cl2 hov-cl1 trans-04 p-l-10 p-r-11"
                                to={`/profile/${userId}`}>
                            <i className="fas fa-user fs-4"></i>
                          </Link>
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
