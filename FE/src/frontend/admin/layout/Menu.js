import { Link } from "react-router-dom";


function Menu() {
  return (
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
              <Link className="js-arrow" to="/DanhGia">
                <i className="fas fa-comment-alt"></i>Đánh giá
                <span className="inbox-num">3</span>
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
                <i className="fas fa-users"></i>Quản lý Khách Hàng
              </Link>
            </li>
            <li className="has-sub">
              <Link className="js-arrow" to="/qlsanpham">
                <i className="fas fa-table"></i>Quản lý Sản Phẩm
              </Link>
            </li>
            <li className="has-sub">
              <Link className="js-arrow" to="/QlTaiKhoan">
                <i className="fas fa-map-marker-alt"></i>Quản lý Tài Khoản
              </Link>
            </li>

            {/* Thêm nút chuyển trang qua client */}
            <li className="has-sub">
              <Link className="js-arrow" to="/Home">
                <i className="fas fa-home"></i>Trang chủ Client
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
