import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoryDetails, updateCategory } from "../actions/unitActions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function EditCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryState = useSelector((state) => state.unit);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    dispatch(fetchCategoryDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (categoryState.selectedUnit) {
      setValue("name", categoryState.selectedUnit.name);
      setValue("description", categoryState.selectedUnit.description);
      setValue("status", categoryState.selectedUnit.status);
      // Assuming image data might come as URL
      setValue("img", categoryState.selectedUnit.img);
    }
  }, [categoryState.selectedUnit, setValue]);

  if (categoryState.loading) {
    return <p>Loading...</p>;
  }

  if (categoryState.error) {
    return <p>Error: {categoryState.error}</p>;
  }
  
  const submit = (data) => {
    const jsonData = {
      name: data.name,
      description: data.description,
      status: data.status,
      img: data.img,
    };
  

 
    try {
      dispatch(updateCategory(id, jsonData));   // Sử dụng JSON thay vì FormData  // Đợi API hoàn thành
      Swal.fire({
        text: "Cập nhật danh mục thành công!",
        icon: "success",
      });
      navigate("/qldanhmuc");
    } catch (error) {
      Swal.fire({
        text: "Có lỗi xảy ra khi cập nhật danh mục!",
        icon: "error",
      });
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
                  <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group">
                      <label htmlFor="name">Tên danh mục</label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        id="name"
                        placeholder="Nhập tên sản phẩm..."
                        className="form-control"/>
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
                          className="form-control"
                          id="file-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="status">Trạng thái</label>
                        <select
                          {...register("status", { required: true })}
                          id="status"
                          className="form-control"
                        >
                          <option value="">Chọn trạng thái</option>
                          <option value="0">Đang Hoạt Động</option>
                          <option value="1">Ngừng Hoạt Động</option>
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