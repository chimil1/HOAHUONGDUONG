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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (categoryState.loading) {
    return <p>Loading...</p>;
  }

  if (categoryState.error) {
    return <p>Error: {categoryState.error}</p>;
  }

  const submit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("status", data.status);

    dispatch(fetchAddCategory(data));
    
    console.log(data);
    Swal.fire({
      text: "Thêm sản phẩm thành công!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/qldanhmuc");
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
                    <div className="form-group">
                      <label htmlFor="name">Tên danh mục</label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Nhập tên danh mục"
                      />
                      {errors.name && (
                        <span className="text-danger">
                          Tên danh mục không được bỏ trống!
                        </span>
                      )}
                    </div>
                      <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea
                          {...register("description", { required: true })}
                          id="description"
                          rows="9"
                          placeholder="Nhập mô tả..."
                          className="form-control"
                        ></textarea>
                        {errors.description && (
                          <span className="text-danger">
                            Mô tả sản phẩm không được bỏ trống!
                          </span>
                        )}
                      </div>
                    <div className="form-group">
                      <label>Trạng thái</label>
                      <select
                        {...register("status", { required: true })}
                        className="form-control"
                        id="status"
                        name="status"
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="0">Đang Hoạt Động</option>
                        <option value="1">Ngừng Hoạt Động</option>
                      </select>
                      {errors.status && (
                        <span className="text-danger">
                          Trạng thái danh mục không được bỏ trống!
                        </span>
                      )}
                    </div>
                    <button type="submit" className="btn btn-dark">
                      <i className="zmdi zmdi-plus"></i> Thêm danh mục
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