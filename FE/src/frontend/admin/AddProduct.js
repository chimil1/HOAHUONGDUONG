import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddProduct } from "../actions/productAction";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unitState = useSelector((state) => state.unit);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  if (unitState.loading) {
    return <p>Loading...</p>;
  }

  if (unitState.error) {
    return <p>Error: {unitState.error}</p>;
  }

  const submit = (data) => {
    const formData = new FormData();
    formData.append("product_name", data.product_name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("status", data.status);
    formData.append("category_id", data.category_id);

    dispatch(fetchAddProduct(formData));
    console.log(data);
    Swal.fire({
      text: "Thêm sản phẩm thành công!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/qlproduct");
      }
    });
  };

  return (
    <div class="page-wrapper">
      <Menu />
      <div class="page-container">
        <Header />
        <div class="main-content">
          <div class="section__content section__content--p30">
            <div class="container-fluid">
              <div class="card">
                <div class="card-header">
                  <h3 class="title-5 m-b-35">Thêm sản phẩm mới</h3>
                </div>
                <div class="card-body">
                  <form onSubmit={handleSubmit(submit)}>
                    <div className="mb-3">
                      <label htmlFor="product_name" className="form-label">
                        Tên sản phẩm
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product_name"
                        {...register("product_name", { required: true })}
                      />
                      {errors.product_name && (
                        <small className="text-danger">
                          Tên sản phẩm là bắt buộc
                        </small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        Giá
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        {...register("price", { required: true })}
                      />
                      {errors.price && (
                        <small className="text-danger">Giá là bắt buộc</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Mô tả
                      </label>
                      <textarea
                        id="description"
                        className="form-control"
                        rows="4"
                        {...register("description")}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">
                        Trạng thái
                      </label>
                      <select
                        id="status"
                        className="form-select"
                        {...register("status", { required: true })}
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="0">Đang hoạt động</option>
                        <option value="1">Không hoạt động</option>
                      </select>
                      {errors.status && (
                        <small className="text-danger">
                          Trạng thái là bắt buộc
                        </small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="category_id" className="form-label">
                        Danh mục
                      </label>
                      <select
                        id="category_id"
                        className="form-select"
                        {...register("category_id", { required: true })}
                      >
                        <option value="">Chọn danh mục</option>
                        <option value="1">Áo thun</option>
                        <option value="2">Áo khoác</option>
                        <option value="3">Quần jean</option>
                      </select>
                      {errors.category_id && (
                        <small className="text-danger">
                          Danh mục là bắt buộc
                        </small>
                      )}
                    </div>
                    {/* Hình ảnh (Nếu có) */}
                    {/* <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Hình ảnh
                  </label>
                  <input type="file" className="form-control" id="image" {...register("image")} />
                </div> */}
                    <button type="submit" className="btn btn-dark w-100">
                      Thêm sản phẩm
                    </button>
                  </form>
                </div>
                <div class="card-footer">
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

export default AddProduct;
