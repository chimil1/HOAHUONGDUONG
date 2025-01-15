import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../actions/unitActions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import Footer from "./layout/Footer";
import Header from "./layout/Header";


function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageInputs, setImageInputs] = useState([{ file: null }]);
  const productState = useSelector((state) => state.unit);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productState.selectedUnit) {
      setValue("product_name", productState.selectedUnit.product_name);
      setValue("price", productState.selectedUnit.price);
      setValue("description", productState.selectedUnit.description);
      setValue("status", productState.selectedUnit.status);
      setValue("category_id", productState.selectedUnit.category_id);
    }
  }, [productState.selectedUnit, setValue]);

  const handleImageChange = (index, event) => {
    const newImageInputs = [...imageInputs];
    newImageInputs[index].file = event.target.files[0];
    setImageInputs(newImageInputs);
  };

  const handleAddImageInput = () => {
    setImageInputs([...imageInputs, { file: null }]);
  };

  const images = imageInputs
    .filter((input) => input.file)
    .map((input) => input.file);

  const submit = (data) => {
    const jsonData = {
      product_name: data.product_name,
      price: data.price,
      description: data.description,
      status: data.status, // Assuming 'status' is a number (0 or 1)
      category_id: data.category_id,
    };
    console.log("Submitting data:", jsonData);

    try {
      dispatch(updateProduct(id, jsonData)); // Sử dụng JSON thay vì FormData  // Đợi API hoàn thành
      Swal.fire({
        text: "Cập nhật danh mục thành công!",
        icon: "success",
      });
      navigate("/qlsanpham");
    } catch (error) {
      Swal.fire({
        text: "Có lỗi xảy ra khi cập nhật danh mục!",
        icon: "error",
      });
    }
  };

  return (
    <div className="page-wrapper">
       <Header />
      <div className="page-container">
        <div className="main-content m-t-100">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="card">
                <div className="card-header">
                  <h3 className="title-5 m-b-35">Chỉnh sửa sản phẩm</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit(submit)}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="product_name" className="form-label">
                          Tên sản phẩm
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="product_name"
                          id="product_name"
                          {...register("product_name", { required: true })}
                        />
                        {errors.product_name && (
                          <small className="text-danger">
                            Tên sản phẩm là bắt buộc
                          </small>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="price" className="form-label">
                          Giá
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          id="price"
                          {...register("price", { required: true })}
                        />
                        {errors.price && (
                          <small className="text-danger">Giá là bắt buộc</small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="status" className="form-label">
                          Trạng thái
                        </label>
                        <select
                          name="status"
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
                      <div className="col-md-6 mb-3">
                        <label htmlFor="category_id" className="form-label">
                          Danh mục
                        </label>
                        <select
                          name="category_id"
                          id="category_id"
                          className="form-select"
                          {...register("category_id", { required: true })}
                        >
                          <option value="">Chọn danh mục</option>
                          <option value="4">Áo thun</option>
                          <option value="3">Áo khoác</option>
                          <option value="7">Quần jean</option>
                        </select>
                        {errors.category_id && (
                          <small className="text-danger">
                            Danh mục là bắt buộc
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Mô tả
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        className="form-control"
                        rows="4"
                        {...register("description")}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Ảnh sản phẩm</label>
                      {imageInputs.map((input, index) => (
                        <div key={index} className="mb-2">
                          <input
                            type="file"
                            id={`images[${index}]`}
                            className="form-control"
                            onChange={(e) => handleImageChange(index, e)}
                            {...register("images", { required: true })}
                          />
                          {errors.images && (
                            <small className="text-danger">
                              Hình ảnh là bắt buộc
                            </small>
                          )}
                        </div>
                      ))}
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn-WHITE my-3"
                          onClick={handleAddImageInput}
                        >
                          Thêm ảnh
                        </button>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-dark w-100">
                      Cập nhật sản phẩm
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

export default EditProduct;
