import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Đảm bảo bạn import Link
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function QlDanhMuc() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/category")
      .then((response) => {
        setCategories(response.data);
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

        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-header">
                      <div className="overview-wrap">
                        <h2 className="title-5 m-b-35">Bảng danh mục</h2>
                        <Link
                          className="au-btn au-btn-icon au-btn--green bg-dark"
                          to="/AddCategory"
                        >
                          <i className="zmdi zmdi-plus"></i>Thêm danh mục
                        </Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-data2">
                        <thead>
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Tên danh mục</th>
                            <th>Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((item) => (
                            <tr className="tr-shadow">
                              {/* <td><img src={`${image}`} alt="" /></td> */}
                              <td>{item.name}</td>
                              <td>{item.status}</td>
                              <td>
                              <div className="table-data-feature">
                                <button
                                  className="item"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Sửa"
                                >
                                  <i className="zmdi zmdi-edit"></i>
                                </button>
                                <button
                                  className="item"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Xóa"
                                >
                                  <i className="zmdi zmdi-delete"></i>
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

export default QlDanhMuc;
