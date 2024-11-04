import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function QlDanhMuc() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/category")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/category/${id}`);
        // Cập nhật danh sách sau khi xóa
        setCategories(categories.filter((category) => category.id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
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
                          {categories.map((item) => (
                            <tr className="tr-shadow">
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                              <td>{item.img}</td>
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
                                    onClick={() => handleDelete(item.id)}
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
