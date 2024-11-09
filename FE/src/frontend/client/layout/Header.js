import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Header() {
  return (
    <div>
      <header>
        <div className="container-menu-desktop">
          {/* Topbar */}
          <div className="menu-desktop">
            <nav className="limiter-menu-desktop container">
              {/* Logo desktop */}
              <Link to="/" className="logo">
                <img
                  src="../../asset/images/icons/logo2.png"
                  alt="IMG-LOGO"
                />
              </Link>

              {/* Menu desktop */}
              <div className="menu-desktop">
                <ul className="main-menu">
                  <li className="">
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
                    <Link to="/contact">Góp ý</Link>
                  </li>
                </ul>
              </div>

              {/* Icon header */}
              <div className="wrap-icon-header flex-w flex-r-m">
                <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                  <i className="zmdi zmdi-search"></i>
                </div>

                <div
                  className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart">
                  <Link to="/shoppingCart">
                    <i className="zmdi zmdi-shopping-cart" style={{ color: 'black' }}></i>
                  </Link>
                </div>

                <div
                  className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart">
                  <Link to="/login">
                    <i className="fa-solid fa-user" style={{ color: 'black' }}></i>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Modal Search */}
        <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
          <div className="container-search-header">
            <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
              <img src="../../asset/images/icons/icon-close2.png" alt="CLOSE" />
            </button>

            <form className="wrap-search-header flex-w p-l-15">
              <button className="flex-c-m trans-04">
                <i className="zmdi zmdi-search"></i>
              </button>
              <input
                className="plh3"
                type="text"
                name="search"
                placeholder="Search..."
              />
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
