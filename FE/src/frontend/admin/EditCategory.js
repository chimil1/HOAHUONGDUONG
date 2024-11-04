import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function EditCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Đang Hoạt Động");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/category/${id}`);
        console.log(response.data);
        const { name, description, status, img } = response.data;
        setCategoryName(name);
        setDescription(description);
        setStatus(status);
        setImage(img);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", description);
    formData.append("status", status);
    if (typeof image === "object") {
      formData.append("img", image);
    }

    try {
      await axios.put(`http://localhost:8000/api/category/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/QlDanhMuc");
    } catch (error) {
      console.error("Error updating category:", error);
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
                  <h3 className="title-5 m-b-35">Sửa danh mục</h3>
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
                      <i className="zmdi zmdi-edit"></i> Cập nhật danh mục
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

export default EditCategory;
