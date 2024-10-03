import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header>
        <div className="container-menu-desktop">
          {/* Topbar */}
          <div className="menu-desktop">
            <nav className="limiter-menu-desktop container">
              {/* Logo desktop */}
              <Link to="/Home" className="logo">
                <img
                  src="../../asset/images/icons/logo-01.png"
                  alt="IMG-LOGO"
                />
              </Link>

              {/* Menu desktop */}
              <div className="menu-desktop">
                <ul className="main-menu">
                  <li className="">
                    <Link to="/Home">Trang chủ</Link>
                  </li>

                  <li>
                    <Link to="/Product">Sản phẩm</Link>
                  </li>
                  <li>
                    <Link to="/Blog">Bài viết</Link>
                  </li>

                  <li>
                    <Link to="/About">Giới thiệu</Link>
                  </li>

                  <li>
                    <Link to="/Contact">Liên hệ</Link>
                  </li>
                </ul>
              </div>

              {/* Icon header */}
              <div className="wrap-icon-header flex-w flex-r-m">
               <li>
                    <Link to="/login" className="register-btn">
                      Đăng Nhập
                    </Link>
                  </li> 
                  <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                  <i className="zmdi zmdi-search"></i>
                </div>
                

                <div
                  className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                  data-notify="2"
                >
                  <i className="zmdi zmdi-shopping-cart"></i>
                </div>

                <Link
                  to="#"
                  className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                  data-notify="0"
                >
                  <i className="zmdi zmdi-favorite-outline"></i>
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Header Mobile */}
        <div className="wrap-header-mobile">
          {/* Logo mobile */}
          <div className="logo-mobile">
            <Link to="index.html">
              <img src="images/icons/logo-01.png" alt="IMG-LOGO" />
            </Link>
          </div>

          {/* Icon header */}
          <div className="wrap-icon-header flex-w flex-r-m m-r-15">
            <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
              <i className="zmdi zmdi-search"></i>
            </div>

            <div
              className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
              data-notify="2"
            >
              <i className="zmdi zmdi-shopping-cart"></i>
            </div>

            <Link
              to="#"
              className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
              data-notify="0"
            >
              <i className="zmdi zmdi-favorite-outline"></i>
            </Link>
          </div>

          {/* Button show menu */}
          <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className="menu-mobile">
          <ul className="topbar-mobile">
            <li>
              <div className="left-top-bar">
                Free shipping for standard order over $100
              </div>
            </li>

            <li>
              <div className="right-top-bar flex-w h-full">
                <Link to="#" className="flex-c-m p-lr-10 trans-04">
                  Help & FAQs
                </Link>

                <Link to="#" className="flex-c-m p-lr-10 trans-04">
                  My Account
                </Link>

                <Link href="#" className="flex-c-m p-lr-10 trans-04">
                  EN
                </Link>

                <Link to="#" className="flex-c-m p-lr-10 trans-04">
                  USD
                </Link>
              </div>
            </li>
          </ul>

          <ul className="main-menu-m">
            <li>
              <a href="index.html">Home</a>
              <span className="arrow-main-menu-m">
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </span>
            </li>

            <li>
              <a href="product.html">Shop</a>
            </li>
            <li>
              <a href="blog.html">Blog</a>
            </li>

            <li>
              <a href="about.html">About</a>
            </li>

            <li>
              <a href="contact.html">Contact</a>
            </li>
          </ul>
        </div>

        {/* Modal Search */}
        <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
          <div className="container-search-header">
            <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
              <img src="images/icons/icon-close2.png" alt="CLOSE" />
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
