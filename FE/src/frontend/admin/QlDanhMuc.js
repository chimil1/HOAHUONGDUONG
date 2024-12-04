import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategory,
  fetchCategoryDelete,
  fetchRelatedProducts,
} from "../actions/unitActions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function QlDanhMuc() {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.unit);
  const relatedProductsState = useSelector((state) => state.relatedProducts);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 5;

  const handleDelete = (id) => {
    dispatch(fetchRelatedProducts(id))
      .then(() => {
        const { relatedProducts } = relatedProductsState;
  
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
              }).then(() => {
                dispatch(fetchCategory());
              });
            }
          });
        }
      })
      .catch(() => {
        Swal.fire({
          text: "Đã xảy ra lỗi khi kiểm tra sản phẩm liên quan.",
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
    return <p>Không có danh mục nào.</p>;
  }

  const indexOfLastOrder = currentPage * productPerPage;
  const indexOfFirstOrder = indexOfLastOrder - productPerPage;

  const currentItems = [...categoryState.units]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(categoryState.units.length / productPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
                            <th>Trạng thái</th>
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
                                  <Link
                                    to={`/editcategory/${item.id}`}
                                    className="item"
                                    title="Sửa"
                                  >
                                    <i className="zmdi zmdi-edit"></i>
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    className="item"
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
                      <div
                        className="pagination-center d-flex justify-content-between align-items-center mt-3"
                        style={{ width: "300px", margin: "0 auto" }}
                      >
                        <button
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                          className="btn btn-outline-dark mr-2"
                        >
                          Trang trước
                        </button>
                        <span>
                          Trang {currentPage} / {totalPages}
                        </span>
                        <button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          className="btn btn-outline-dark"
                        >
                          Trang sau
                        </button>
                      </div>
                    </div>
                    <Footer />
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
