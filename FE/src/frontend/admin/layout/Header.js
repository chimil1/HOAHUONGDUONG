import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
                  <button onClick={handleLogout}>
                    <i class="fa-solid fa-right-from-bracket" style={{ color: '#ffffff' }}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
  );
}

export default Header;