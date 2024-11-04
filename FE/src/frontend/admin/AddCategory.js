import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function AddCategory() {
  const navigate = useNavigate();
  const createCategoryApi = "http://localhost:8000/api/category";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    img: null,
    status: ""
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleFileChange = (event) => {
    setCategory({ ...category, img: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('description', category.description);
    formData.append('img', category.img);
    formData.append('status', category.status);

    try {
      setIsLoading(true);
      await axios.post(createCategoryApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully!');
      setCategory({ name: "", description: "", img: null, status: "" });
      navigate('/qldanhmuc');
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setIsLoading(false);
    }
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
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Tên danh mục</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={category.name}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mô tả</label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={category.description}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Hình ảnh</label>
                      <input
                        type="file"
                        className="form-control"
                        name="img"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Trạng thái</label>
                      <select
                        className="form-control"
                        name="status"
                        value={category.status }
                        onChange={handleInput}
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
                      onClick={() => navigate("/qldanhmuc")}
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