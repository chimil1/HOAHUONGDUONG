import { Link } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { fetchCategory } from "../actions/categoryAction";

function QlDanhMuc() {
  const dispatch = useDispatch();
  const { data = [], loading, error } = useSelector((state) => state.unitReducers || {});

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data.length) {
    return <div>No data available</div>;
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
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item) => (
                            <tr key={item.id} className="tr-shadow">
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                              <td><img src={item.img} alt={item.name} style={{ width: '50px' }} /></td>
                              <td>
                                <span className="status--process">
                                  {item.status}
                                </span>
                              </td>
                              <td>
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
                                    className="item"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Xóa"
                                    // onClick={() => handleDelete(item.id)}
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