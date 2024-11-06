import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoryDetails, updateCategory } from "../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function EditCategory() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryState = useSelector((state) => state.unit);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(() => {
    dispatch(fetchCategoryDetails(id)); // Sử dụng action lấy chi tiết sản phẩm
  }, [dispatch, id]);
  useEffect(() => {
    console.log("Unit State:", categoryState.selectedUnit);
    if (categoryState.selectedUnit) {
      setValue("name", categoryState.selectedUnit.name);
      setValue("description", categoryState.selectedUnit.description);
      setValue("status", categoryState.selectedUnit.status);
    }
  }, [categoryState.selectedUnit, setValue]);

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

    if (data.img && data.img.length > 0) {
      Array.from(data.img).forEach((file) => {
        formData.append("img", file);
      });
    }

    dispatch(updateCategory(id, formData)); // Sử dụng action cập nhật sản phẩm

    console.log(data);
    Swal.fire({
      text: "Cập nhật sản phẩm thành công!",
      icon: "success",
    });
    navigate("/qldanhmuc");
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
                  <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group">
                      <label htmlFor="name">Tên danh mục</label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nhập tên sản phẩm..."
                        className="form-control"
                      />
                      {errors.name && (
                        <span className="text-danger">
                          Tên sản phẩm không được bỏ trống!
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Mô tả</label>
                      <textarea
                        {...register("description", { required: true })}
                        name="description"
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
                      <label htmlFor="file-input">Hình ảnh</label>
                      <input
                        {...register("img")}
                        type="file"
                        id="file-input"
                        name="img"
                        className="form-control-file"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="status">Trạng thái</label>
                      <select
                        {...register("status", { required: true })}
                        name="status"
                        id="status"
                        className="form-control"
                      >
                        <option value="Đang Hoạt Động">Đang Hoạt Động</option>
                        <option value="Ngừng Hoạt Động">Ngừng Hoạt Động</option>
                      </select>
                      {errors.status && (
                        <span className="text-danger">
                          Trạng thái sản phẩm không được bỏ trống!
                        </span>
                      )}
                    </div>
                    <button type="submit" className="btn btn-dark">
                      <i className="zmdi zmdi-edit"></i> Cập nhật danh mục
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
