import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory, fetchCategoryDelete } from "../actions/unitActions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function QlDanhMuc() {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      text: "Bạn có muốn xóa sản phẩm này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Tiếp tục",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Xóa sản phẩm thành công!",
          icon: "success",
        });
        dispatch(fetchCategoryDelete(id));
      }
    });
  };

  if (categoryState.loading) {
    return <p>Đang tải...</p>;
  }

  if (categoryState.error) {
    return <p>Lỗi: {categoryState.error}</p>;
  }

  if (!Array.isArray(categoryState.units) || categoryState.units.length === 0) {
    return (
      <p>Lỗi: Định dạng dữ liệu không chính xác hoặc không có đơn hàng nào.</p>
    );
  }

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
                            <th>Tên danh mục</th>
                            <th>Mô tả</th>
                            <th>Hình ảnh</th>
                            <th>Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categoryState.units.map((item) => (
                            <tr key={item.id} className="tr-shadow">
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                              <td>
                                <img
                                  src={item.img}
                                  alt={item.name}
                                  style={{ width: "50px" }}
                                />
                              </td>
                              <td>
                                {item.status === 0 ? (
                                  <span className="badge badge-success">
                                    Đang hoạt động
                                  </span>
                                ) : (
                                  <span className="badge badge-danger">
                                    Ngừng hoạt động
                                  </span>
                                )}
                              </td>
                              <td className="d-flex justify-content-center">
                                <div className="table-data-feature">
                                  <button
                                    className="item"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Sửa"
                                  >
                                    <Link to={`/editcategory/${item.id}`}>
                                      <i className="zmdi zmdi-edit"></i>
                                    </Link>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    className="item"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Delete"
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
