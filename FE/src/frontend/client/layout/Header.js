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
                      <Link to="/home">Trang chủ</Link>
                    </li>
                    <li>
                      <Link to="/product">Sản phẩm</Link>
                    </li>
                    <li>
                      <Link to="/blog">Bài viết</Link>
                    </li>
                    <li>
                      <Link to="/about">Giới thiệu</Link>
                    </li>
                    <li>
                      <Link to="/contact">Liên hệ</Link>
                    </li>
                  </ul>
                </div>

                <div className="wrap-icon-header flex-w flex-r-m">
                  <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                    <i className="zmdi zmdi-search"></i>
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

          <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
            <div className="container-search-header">
              <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
                <img src="../../asset/images/icons/icon-close2.png" alt="CLOSE" />
              </button>

              <form className="wrap-search-header flex-w p-l-15">
                <button className="flex-c-m trans-04">
                  <i className="zmdi zmdi-search"></i>
                </button>
                <input className="plh3" type="text" name="search" placeholder="Search..." />
              </form>
            </div>
          </div>
        </header>
      </div>
  );
}

export default Header;
