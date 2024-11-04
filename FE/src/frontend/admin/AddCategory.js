import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchAddCategory } from "../actions/categoryAction";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function AddCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const categoryState = useSelector((state) => state.unit);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 

  const submit = (data) => {
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
                      <input
                        {...register("description")}
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                      />
                    </div>
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
                    <div className="form-group">
                      <label>Trạng thái</label>
                      <select
                        {...register("status", { required: true })}
                        className="form-control"
                        id="status"
                        name="status"
                      >
                        <option value="">Chọn danh mục</option>
                        <option value="Đang Hoạt Động">Đang Hoạt Động</option>
                        <option value="Ngừng Hoạt Động">Ngừng Hoạt Động</option>
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
