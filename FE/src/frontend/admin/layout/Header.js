import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <header className="header-desktop2 bg-dark">
        <div className="section__content section__content--p30">
          <div className="container-fluid">
            <div className="header-wrap2">
              <div className="logo d-block d-lg-none">
                <Link to="#">
                  <img
                    src="/public/assets/images/logo.png"
                    alt="Logo"
                    className="img-fluid"
                  />
                </Link>
              </div>
              <div className="header-button2">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-basic"
                    className="text-white p-0"
                  >
                    <i class="fa-solid fa-user"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/admin" onClick={handleLogout}>
                      Đăng Xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
