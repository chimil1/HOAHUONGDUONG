import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Header() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUserId(userId);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tokenAdmin");
    localStorage.removeItem("admin");
    localStorage.removeItem("roleAdmin");
    setIsLoggedIn(false);
    setUserId(null);
    navigate('/admin');
  };

  return (
    <div className="header">
      {/* Sidebar */}
      <aside className="menu-sidebar2">
        <div className="logo">
          <Link to="#">
            <img src="../../asset/images/icons/logo2.png" alt="Cool Admin" />
          </Link>
        </div>
        <div className="menu-sidebar2__content js-scrollbar1">
          <nav className="navbar-sidebar2">
            <ul className="list-unstyled navbar__list">
              <li className="has-sub">
                <Link className="js-arrow" to="/thongke">
                  <i className="fas fa-tachometer-alt"></i>Bảng thống kê
                </Link>
              </li>
              <li className="has-sub">
                <Link className="js-arrow" to="/coupon">
                  <i className="fa fa-ticket"></i>Mã giảm giá
                </Link>
              </li>
              <li className="has-sub">
                <Link className="js-arrow" to="/review">
                  <i className="fas fa-comment-alt"></i>Đánh giá
                  {/* <span className="inbox-num">3</span> */}
                </Link>
              </li>
              <li className="has-sub">
                <Link className="js-arrow" to="/QlDanhMuc">
                  <i className="fas fa-list"></i>Quản lý Danh Mục
                </Link>
              </li>
              <li className="has-sub">
                <Link className="js-arrow" to="/QlDonHang">
                  <i className="fas fa-shopping-cart"></i>Quản lý Đơn Hàng
                </Link>
              </li>
              <li className="has-sub">
                <Link className="js-arrow" to="/QlKhachhang">
                  <i className="fas fa-users"></i>Quản lý Tài Khoản
                </Link>
              </li>
              <li className="has-sub">
                <Link className="js-arrow" to="/qlsanpham">
                  <i className="fas fa-table"></i>Quản lý Sản Phẩm
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      {/* Header Content */}
      <header className="header-desktop2 bg-dark">
        <div className="section__content section__content--p30">
          <div className="container-fluid">
            <div className="header-wrap2">
              <div className="logo d-block d-lg-none">
                {/* Optional logo for mobile */}
              </div>
              <div className="header-button2">
                {IsLoggedIn && (
                  <button onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket" style={{ color: '#ffffff' }}></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
