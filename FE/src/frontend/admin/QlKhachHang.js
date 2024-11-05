import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function QlKhachHang() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
        .get("http://localhost:8000/api/user")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
  }, []);

  return (
    <div className="page-wrapper">
      <Menu />
      <div className="page-container">
        <Header />
        <header className="header-desktop2 bg-dark">
          {/* Nội dung header */}
        </header>

        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-header">
                      <div className="overview-wrap">
                        <h2 className="title-5 m-b-35">Bảng khách hàng</h2>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-data2">
                        <thead>
                          <tr>
                            <th>Tên khách hàng</th>
                            <th>Email</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((item) => (
                            <tr className="tr-shadow">
                              <td>{item.name}</td>
                              <td>
                                <span className="block-email">{item.email}</span>
                              </td>
                              <td>
                                <div className="table-data-feature">
                                  <button
                                    className="item"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Chi tiết"
                                  >
                                    <i className="zmdi zmdi-mail-send"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="card-footer">
                      <Footer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QlKhachHang;
