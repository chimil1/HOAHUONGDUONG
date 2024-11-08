import React, { useEffect } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchProductDelete } from "../actions/unitActions";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function QlSanPham() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(fetchProducts());
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
        dispatch(fetchProductDelete(id));
      }
    });
  };

  if (productState.loading) {
    return <p>Loading...</p>;
  }

  if (productState.error) {
    return <p>Err: {productState.error}</p>;
  }

  if (!Array.isArray(productState.units)) {
    return <p>Error: Data format is incorrect, expected an array.</p>;
  }
  return (
    <div className="page-wrapper">
      <Menu></Menu>
      <div className="page-container">
        <Header></Header>

        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-header">
                      <div className="overview-wrap">
                        <h2 className="title-5 m-b-35">Bảng sản phẩm</h2>
                        <Link
                          className="au-btn au-btn-icon au-btn--green bg-dark"
                          to="/addproduct"
                        >
                          <i className="zmdi zmdi-plus"></i>Thêm sản phẩm
                        </Link>
                      </div>
                    </div>

                    <div className="card-body">
                      <table className="table table-data2">
                        <thead>
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Mô tả</th>
                            <th>Trạng thái</th>
                            <th>Danh mục</th>
                            <th>tác vụ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productState.units.map((product) => (
                            <tr className="tr-shadow" key={product.id}>
                              <td>{product.product_img}</td>
                              <td>{product.product_name}</td>
                              <td>{product.price}</td>
                              <td>{product.description}</td>
                              <td>{product.status}</td>
                              <td>{product.category_id}</td>
                              <td>
                                <div className="table-data-feature">
                                  <Link to={`/productdetail/${product.id}`}>
                                  <button
                                    className="item"
                                    // onClick={() => handleDetailClick(product)}
                                    title="Chi tiết"
                                  >
                                    <i className="zmdi zmdi-mail-send"></i>
                                  </button>
                                  </Link>
                                  <button
                                    className="item"
                                    // onClick={() => handleEditClick(product)}
                                    title="Sửa"
                                  >
                                    <i className="zmdi zmdi-edit"></i>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(product.id)}
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
                      <Footer></Footer>
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

export default QlSanPham;
