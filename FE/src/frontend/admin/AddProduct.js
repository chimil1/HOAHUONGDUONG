import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddProduct, fetchCategory } from "../actions/unitActions";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unitState = useSelector((state) => state.unit);
  const [options, setOptions] = useState([{ name: "", values: [""] }]);
  const [imageInputs, setImageInputs] = useState([{ file: null }]);
  const [showVariants, setShowVariants] = useState(false);
  const categoryState = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Thay đổi hàm handleAddOption
  const handleAddOption = () => {
    setOptions([...options, { name: "", values: [""] }]);
  };

  // Thêm hàm để thêm value cho mỗi option
  const handleAddValue = (optionIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].values.push(""); // Thêm một value mới (chuỗi rỗng)
    setOptions(newOptions);
  };

  // Hàm để thay đổi giá trị của mỗi value
  const handleValueChange = (optionIndex, valueIndex, event) => {
    const newOptions = [...options];
    newOptions[optionIndex].values[valueIndex] = event.target.value;
    setOptions(newOptions);
  };

  const handleImageChange = (index, event) => {
    const newImageInputs = [...imageInputs];
    newImageInputs[index].file = event.target.files[0];
    setImageInputs(newImageInputs);
  };

  const handleAddImageInput = () => {
    setImageInputs([...imageInputs, { file: null }]);
  };

  const submit = (data) => {
    const formData = new FormData();
    formData.append("product_name", data.product_name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("status", data.status);
    formData.append("category_id", data.category_id);

    const images = imageInputs
      .filter((input) => input.file)
      .map((input) => input.file.name);

    // Loại bỏ các giá trị trống trong options
    const filteredOptions = options
      .map((option) => ({
        ...option,
        values: option.values.filter((value) => value.trim() !== ""),
      }))
      .filter(
        (option) => option.name.trim() !== "" && option.values.length > 0
      );

    data.options = filteredOptions;
    data.images = images;

    // Thêm các trường còn lại vào formData
    formData.append("options", JSON.stringify(data.options));
    formData.append("images", JSON.stringify(data.images));

    // Log dữ liệu (chỉ để kiểm tra)
    console.log("Product Data:", data);

    dispatch(fetchAddProduct(data));
    Swal.fire({
      text: "Thêm sản phẩm thành công!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/qlsanpham");
      }
    });
  };
  if (unitState.loading) {
    return <p>Loading...</p>;
  }

  if (unitState.error) {
    return <p>Error: {unitState.error}</p>;
  }

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
                  <h3 className="title-5 m-b-35">Thêm sản phẩm mới</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit(submit)}>
                    <div className="row">
                      {/* Hàng đầu tiên */}
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
                          {...register("price", {
                            required: "Giá là bắt buộc",
                            min: {
                              value: 20000,
                              message: "Giá phải lớn hơn hoặc bằng 20.000",
                            },
                            validate: (value) =>
                                value > 0 || "Giá không được là số âm",
                          })}
                        />
                        {errors.price && (
                            <small className="text-danger">{errors.price.message}</small>
                        )}
                      </div>

                      {/* Hàng thứ hai */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="status" className="form-label">
                          Trạng thái
                        </label>
                        <select
                          id="status"
                          name="status"
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
                          {Array.isArray(categoryState.units) &&
                          categoryState.units.length > 0 ? (
                            categoryState.units.map((category) => (
                              <option value={category.id} key={category.id}>
                                {category.name}
                              </option>
                            ))
                          ) : (
                            <option value="">Không có danh mục</option>
                          )}
                        </select>
                        {errors.category_id && (
                          <small className="text-danger">
                            Danh mục là bắt buộc
                          </small>
                        )}
                      </div>
                    </div>

                    {/* Mô tả */}
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

                    {/* Thêm trường ảnh */}
                    <div className="mb-3">
                      <label className="form-label">Ảnh sản phẩm</label>
                      {imageInputs.map((input, index) => (
                        <div key={index} className="mb-2">
                          <input
                            type="file"
                            name="images"
                            id={`images[${index}]`}
                            className="form-control"
                            onChange={(e) => handleImageChange(index, e)}
                            // {...register(`images[${index}]`, {
                            //   required: true,
                            // })}
                          />
                          {/* {errors.images[index] && (
                            <small className="text-danger">
                              Hình ảnh là bắt buộc
                            </small>
                          )} */}
                        </div>
                      ))}
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className=" btn-WHITE my-3"
                          onClick={handleAddImageInput}
                        >
                          <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--medium">
                            <svg
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="#050505"
                                  stroke-width="1.5"
                                ></circle>{" "}
                                <path
                                  d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                                  stroke="#050505"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                ></path>{" "}
                              </g>
                            </svg>
                            <span class="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--medium">
                              Thêm ảnh
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Checkbox to show/hide variant options */}
                    <label className="d-flex align-items-center gap-2 form-label">
                      <input
                        type="checkbox"
                        checked={showVariants}
                        onChange={() => setShowVariants(!showVariants)}
                      />
                      Thêm biến thể sản phẩm
                    </label>

                    {/* Options for Variants */}
                    {showVariants && (
                      <div className="variant-options">
                        <h4 className="mt-4">Biến thể sản phẩm</h4>
                        {options.map((option, optionIndex) => (
                          <div key={optionIndex} className="my-3">
                            <label className="form-label">Tên biến thể*</label>
                            <input
                              type="text"
                              className="form-control"
                              value={option.name}
                              onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[optionIndex].name = e.target.value;
                                setOptions(newOptions);
                              }}
                              placeholder="Nhập tên biến thể"
                            />

                            <label className="form-label mt-3">
                              Giá trị biến thể*
                            </label>
                            {option.values.map((value, valueIndex) => (
                              <div
                                key={valueIndex}
                                className="d-flex align-items-center mt-2"
                              >
                                <input
                                  type="text"
                                  className="form-control me-2"
                                  value={value}
                                  onChange={(e) =>
                                    handleValueChange(
                                      optionIndex,
                                      valueIndex,
                                      e
                                    )
                                  }
                                  placeholder="Nhập giá trị biến thể"
                                />
                              </div>
                            ))}

                            <button
                              type="button"
                              className="mt-2"
                              onClick={() => handleAddValue(optionIndex)}
                            >
                              <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--medium">
                                <svg
                                  width="18px"
                                  height="18px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="#050505"
                                    strokeWidth="1.5"
                                  ></circle>
                                  <path
                                    d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                                    stroke="#050505"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  ></path>
                                </svg>
                                <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--medium">
                                  Thêm giá trị
                                </span>
                              </span>
                            </button>
                          </div>
                        ))}

                        <div className="d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn-WHITE my-3"
                            onClick={handleAddOption}
                          >
                            <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--medium">
                              <svg
                                width="18px"
                                height="18px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="#050505"
                                  strokeWidth="1.5"
                                ></circle>
                                <path
                                  d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                                  stroke="#050505"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                ></path>
                              </svg>
                              <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--medium">
                                Thêm Options
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                    )}

                    <button type="submit" className="btn btn-dark w-100">
                      Thêm sản phẩm
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

export default AddProduct;
