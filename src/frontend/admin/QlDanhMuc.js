import React from "react";
import { Link } from "react-router-dom"; // Đảm bảo bạn import Link
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function QlDanhMuc() {
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
                          <tr className="tr-shadow">
                            <td></td>
                            <td>Lori Lynch</td>
                            <td>
                              <span className="status--process">
                                Đang Hoạt Động
                              </span>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
