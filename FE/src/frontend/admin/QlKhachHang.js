import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchKhachHangs, lockUser } from "../actions/unitActions";
import {Link, useNavigate} from "react-router-dom";
import Loading from "../client/layout/Loading";
function QlKhachHang() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unitState = useSelector((state) => state.unit);
  const unitsArray = Array.isArray(unitState.units) ? unitState.units : [];
  const [showLockedAccounts, setShowLockedAccounts] = useState(false);

  useEffect(() => {
    dispatch(fetchKhachHangs());
  }, [dispatch]);


  const handleLockToggle = (id, isLocked) => {
    const lockStatus = !isLocked;
    dispatch(lockUser(id, lockStatus)).then(() => {
      dispatch(fetchKhachHangs());
    });
  };

  if (unitState.loading) {
    return <Loading/>;
  }

  if (unitState.error) {
    return <p>Lỗi: {unitState.error}</p>;
  }

  const filteredAccounts = showLockedAccounts
      ? unitsArray.filter((item) => item.role === 2)
      : unitsArray.filter((item) => item.role !== 2);

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
                          <h2 className="title-5 m-b-35">Khách Hàng</h2>
                          <button
                              className="btn btn-info"
                              onClick={() => setShowLockedAccounts(!showLockedAccounts)}
                          >
                            {showLockedAccounts ? "Danh sách tất cả tài khoản" : "Danh sách tài khoản đã khóa"}
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        {filteredAccounts.length > 0 ? (
                            <table className="table table-data2">
                              <thead>
                              <tr>
                                <th>Tên Khách Hàng</th>
                                <th>Email</th>
                                <th>Số Điện Thoại</th>
                                <th>Trạng Thái</th>
                                <th>Hành động</th>
                              </tr>
                              </thead>
                              <tbody>
                              {filteredAccounts.map((item) => (
                                  <tr key={item.id} className="tr-shadow">
                                    <td>{item.name || "Không có thông tin"}</td>
                                    <td>{item.email || "Không có thông tin"}</td>
                                    <td>{item.phone || "Không có thông tin"}</td>
                                    <td>
                                      {item.role === 2 ? (
                                          <span className="badge badge-danger">Đã khóa</span>
                                      ) : (
                                          <span className="badge badge-success">Mở khóa</span>
                                      )}
                                    </td>
                                    <td>
                                      <button
                                          className="item"
                                          onClick={() => handleLockToggle(item.id, item.role === 2)}
                                      >
                                        {item.role === 2 ? "Mở khóa" : "Khóa"}
                                      </button>
                                    </td>
                                    <td>

                                        <Link to={`/details/${item.id}`}>
                                          <button className="item" title="Chi tiết">
                                           Chi Tiết
                                          </button>
                                        </Link>

                                    </td>
                                  </tr>
                              ))}
                              </tbody>
                            </table>
                        ) : (
                            <p>Không có khách hàng nào để hiển thị.</p>
                        )}
                      </div>
                      <div className="card-footer">
                        <Footer/>
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