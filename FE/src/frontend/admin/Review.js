import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchReview } from "../actions/unitActions"; 
import { Link } from "react-router-dom";

function Review() {
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
    <div className="page-wrapper">
      <Menu></Menu>

      <div className="page-container">
        <Header></Header>

        <div className="main-content m-t-100">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-header">
                      <div className="overview-wrap">
                        <h2 className="title-5 m-b-35">Đánh giá</h2>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-data2">
                        <thead>
                          <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            {/* <th>Hình</th> */}
                            <th>Số Lượng</th>
                          </tr>
                        </thead>
                        <tbody>
                        {unitState.units.map((item, index) => (
                            <tr key={index} classNameName="tr-shadow">

                              <td>{item.id || 'Không có thông tin'}</td>
                              <td>{item.name || 'Không có thông tin'}</td>
                              {/* <td>
                                {item.img ? (
                                    <img src={item.img}
                                         style={{width: '50px', height: '50px', objectFit: 'cover'}}/>
                                ) : (
                                    'Không có thông tin'
                                )}
                              </td> */}
                              <td>{item.review_count || 'Không có thông tin'}</td>

                              <td>
                                <div className="table-data-feature justify-content-center">
                                  <Link to={`/reviewdetail/${item.id}`}>
                                    <button
                                        className="item"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Chi tiết"
                                    >
                                      <i className="zmdi zmdi-mail-send"></i>
                                    </button>
                                  </Link>
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

export default Review;
