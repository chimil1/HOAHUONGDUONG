import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoupons, fetchDeleteCoupon } from "../actions/unitActions";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../client/layout/Loading";

function Coupons() {
  const dispatch = useDispatch();
  const unitState = useSelector((state) => state.unit);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 5;

  // Format giá sản phẩm
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      text: "Bạn có muốn xóa mã giảm giá này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Tiếp tục",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(fetchDeleteCoupon(id));
        Swal.fire({
          text: "Xóa mã giảm giá thành công!",
          icon: "success",
        }).then(() => {
         dispatch(fetchCoupons());
        });
      }
    });
  };

  // Kiểm tra xem voucher đã hết hạn chưa
const isExpired = (end_date) => {
  const currentDate = new Date();
  return new Date(end_date) < currentDate;
};

  if (unitState.loading) {
    return (
      <p>
        <Loading />
      </p>
    );
  }

  if (unitState.error) {
    return <p>Lỗi: {unitState.error}</p>;
  }

  if (!Array.isArray(unitState.units)) {
    return <p>Error: Dữ liệu không phải là một mảng.</p>;
  }

  const indexOfLastItem = currentPage * productPerPage;
  const indexOfFirstItem = indexOfLastItem - productPerPage;
  const currentItems = [...unitState.units]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(unitState.units.length / productPerPage);

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
                        <h2 className="title-5 m-b-35">Bảng mã giảm giá</h2>
                        <Link
                          className="au-btn au-btn-icon au-btn--green bg-dark"
                          to="/Addcoupon"
                        >
                          <i className="zmdi zmdi-plus"></i>Thêm mã giảm giá
                        </Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-data2">
                        <thead>
                          <tr>
                            <th>Mã giảm giá</th>
                            <th>Giá giảm </th>
                            <th>Giá trị chiết khấu</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Hạn sử dụng </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((item, index) => (
                            <tr key={index} className="tr-shadow">
                              <td>{item.code_name || "Không có thông tin"}</td>
                              <td>{formatCurrency(item.minium_order_value)}</td>
                              <td>{item.discount_value}%</td>
                              <td>{item.start_date}</td>
                              <td>{item.end_date}</td>
                              <td>
                              {isExpired(item.end_date) ? (
                                <span className="text-danger">Hết hạn</span>
                              ) : (
                                <span className="text-success">Còn hiệu lực</span>
                              )}
                            </td>
                              <td className="d-flex justify-content-center">
                                <div className="table-data-feature">
                                  <Link to={`/editcoupon/${item.id}`}>
                                    <button
                                      className="item"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Sửa"
                                    >
                                      <i className="zmdi zmdi-edit"></i>
                                    </button>
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(item.id)}
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

export default Coupons;
