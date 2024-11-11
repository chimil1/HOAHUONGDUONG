import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory, fetchCategoryDelete, fetchRelatedProducts } from "../actions/unitActions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function QlDanhMuc() {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số mục mỗi trang

  const handleDelete = (id) => {
    // Lấy sản phẩm liên quan đến danh mục
    dispatch(fetchRelatedProducts(id)).then((relatedProducts) => {
      if (relatedProducts.length > 0) {
        Swal.fire({
          text: "Danh mục này có sản phẩm liên quan. Không thể xóa!",
          icon: "error",
        }).then(() => {
          dispatch(fetchCategory());
        });
      } else {
        Swal.fire({
          text: "Bạn có muốn xóa danh mục này?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Tiếp tục",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(fetchCategoryDelete(id));
            Swal.fire({
              text: "Xóa danh mục thành công!",
              icon: "success",
            });
          }
        });
      }
    }).catch((error) => {
      // Xử lý lỗi nếu có
      Swal.fire({
        text: "Đã xảy ra lỗi khi lấy sản phẩm liên quan.",
        icon: "error",
      });
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
      <p>Lỗi: Định dạng dữ liệu không chính xác hoặc không có danh mục nào.</p>
    );
  }

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categoryState.units.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categoryState.units.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                            <th>Tr ạng thái</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((item) => (
                            <tr key={item.id} className="tr-shadow">
                              <td>{item.name}</td>
                              <td>{item.description}</td>
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
                      <nav>
                        <ul className="pagination justify-content-center">
                          {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </nav>
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