import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchReview } from "../actions/unitActions"; 

function DanhGia() {
  const dispatch = useDispatch();
  const unitState = useSelector(state => state.unit);

  useEffect(() => {
    dispatch(fetchReview());
  }, [dispatch]);

  if (unitState.loading) {
    return <p>Đang tải...</p>;
  }

  if (unitState.error) {
    return <p>Lỗi: {unitState.error}</p>;
  }

  // Kiểm tra nếu unitState.units là một mảng trước khi dùng map
  if (!Array.isArray(unitState.units) || unitState.units.length === 0) {
    return <p>Lỗi: Định dạng dữ liệu không chính xác hoặc không có đơn hàng nào.</p>;
  }
  return (
    <div class="page-wrapper">
      <Menu></Menu>

      <div class="page-container">
        <Header></Header>

        <div class="main-content">
          <div class="section__content section__content--p30">
            <div class="container-fluid">
              <div class="card">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card-header">
                      <div class="overview-wrap">
                        <h2 class="title-5 m-b-35">Đánh giá</h2>
                      </div>
                    </div>
                    <div class="card-body">
                      <table class="table table-data2">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Hình</th>
                            <th>Tổng Review</th> 
                            <th>Tác vụ</th>                          
                          </tr>
                        </thead>
                        <tbody>
                        {unitState.units.map((item, index) => (
                            <tr key={index} className="tr-shadow">

                              <td>{item.id || 'Không có thông tin'}</td>
                              <td>{item.name || 'Không có thông tin'}</td>
                              <td>{item.img || 'Không có thông tin'}</td>
                              <td>{item.review_count || 'Không có thông tin'}</td>

                              <td>
                              <div class="table-data-feature">
                                <button
                                  class="item"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Chi tiết"
                                >
                                  <i class="zmdi zmdi-mail-send"></i>
                                </button>
                              </div>
                            </td>
                            </tr>
                          ))}
                          
                        </tbody>
                      </table>
                    </div>
                    <div class="card-footer">
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

export default DanhGia;
