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
    dispatch(fetchAddCategory(data));

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
              <div className="card shadow-sm">
              <div className="card-header">
                  <h3 className="title-5 m-b-35">Thêm danh mục</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit(submit)} className="p-4">
                    <div className="row">
                      <div className="form-group col-md-6 mb-3">
                        <label htmlFor="name">Tên Danh Mục</label>
                        <input
                          {...register("name", {
                            required: "Tên danh mục không được bỏ trống!",
                          })}
                          type="text"
                          className={`form-control ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          id="name"
                          placeholder="Nhập tên danh mục"
                        />
                        {errors.name && (
                          <div className="invalid-feedback">
                            {errors.name.message}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-6 mb-3 position-relative">
                        <label>Trạng Thái</label>
                        <select
                          {...register("status", {
                            required:
                              "Trạng thái danh mục không được bỏ trống!",
                          })}
                          className={`form-control custom-select ${
                            errors.status ? "is-invalid" : ""
                          }`}
                          id="status"
                          onFocus={(e) => e.target.classList.add("focused")}
                          onBlur={(e) => e.target.classList.remove("focused")}
                        >
                          <option value="">Chọn trạng thái</option>
                          <option value="0">Đang Hoạt Động</option>
                          <option value="1">Ngừng Hoạt Động</option>
                        </select>
                        {errors.status && (
                          <div className="invalid-feedback">
                            {errors.status.message}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="description">Mô Tả</label>
                      <textarea
                        {...register("description")}
                        id="description"
                        rows="4"
                        className="form-control"
                        placeholder="Nhập mô tả..."
                      ></textarea>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-dark">
                        <i className="zmdi zmdi-plus"></i> Thêm Danh Mục
                      </button>
                    </div>
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
