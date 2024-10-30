import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Đang Hoạt Động");
  const [image, setImage] = useState(null); // State để lưu trữ hình ảnh
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra xem có đủ dữ liệu hay không
    if (!categoryName || !image) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Hiển thị dữ liệu thêm danh mục
    console.log("Thêm danh mục:", { categoryName, status, image });

    // Reset form sau khi thêm thành công
    setCategoryName("");
    setDescription("");
    setStatus("Đang Hoạt Động");
    setImage(null);

    // Điều hướng về trang quản lý danh mục
    navigate("/QlDanhMuc");
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Lưu trữ file hình ảnh
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
                <div className="card-header">
                  <h3 className="title-5 m-b-35">Thêm danh mục mới</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Tên danh mục</label>
                      <input
                        type="text"
                        className="form-control"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mô tả</label>
                      <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Hình ảnh</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Trạng thái</label>
                      <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="Đang Hoạt Động">Đang Hoạt Động</option>
                        <option value="Ngừng Hoạt Động">Ngừng Hoạt Động</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-dark">
                      <i className="zmdi zmdi-plus"></i> Thêm danh mục
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ml-2"
                      onClick={() => navigate("/QlDanhMuc")}
                    >
                      Hủy
                    </button>
                  </form>
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
  );
}

export default AddCategory;
