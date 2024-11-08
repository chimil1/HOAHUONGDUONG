import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchAddCategory } from "../actions/unitActions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function AddCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryState = useSelector((state) => state.unit);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Loading or error states
  if (categoryState.loading) {
    return <p>Loading...</p>;
  }

  if (categoryState.error) {
    return <p>Error: {categoryState.error}</p>;
  }

  // Form submit handler
  const submit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("status", data.status);

    // Check if an image was uploaded
    if (data.img?.length > 0) {
      const file = data.img[0];
      formData.append("img", file);
    }

    // Dispatch action to add category
    dispatch(fetchAddCategory(formData));

    // Show success message
    Swal.fire({
      text: "Thêm danh mục thành công!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/qldanhmuc"); // Redirect to category list
      }
    });
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
                  <form onSubmit={handleSubmit(submit)}>
                    {/* Category Name */}
                    <div className="form-group">
                      <label htmlFor="name">Tên danh mục</label>
                      <input
                        {...register("name", { required: "Tên danh mục không được bỏ trống!" })}
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Nhập tên danh mục"
                      />
                      {errors.name && <span className="text-danger">{errors.name.message}</span>}
                    </div>

                    {/* Description */}
                    <div className="form-group">
                      <label htmlFor="description">Mô tả</label>
                      <input
                        {...register("description")}
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Nhập mô tả"
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="form-group">
                      <label htmlFor="file-input">Hình ảnh</label>
                      <input
                        {...register("img")}
                        type="file"
                        className="form-control"
                        id="file-input"
                        name="img"
                      />
                    </div>

                    {/* Status */}
                    <div className="form-group">
                      <label htmlFor="status">Trạng thái</label>
                      <select
                        {...register("status", { required: "Trạng thái danh mục không được bỏ trống!" })}
                        className="form-control"
                        id="status"
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="0">Đang Hoạt Động</option>
                        <option value="1">Ngừng Hoạt Động</option>
                      </select>
                      {errors.status && <span className="text-danger">{errors.status.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-dark">
                      <i className="zmdi zmdi-plus"></i> Thêm danh mục
                    </button>
                  </form>
                </div>

                {/* Footer */}
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
