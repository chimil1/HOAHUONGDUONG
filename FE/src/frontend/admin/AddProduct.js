import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddProduct, fetchCategory } from "../actions/unitActions";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import "./product.css";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unitState = useSelector((state) => state.unit);
  const categoryState = useSelector((state) => state.unit);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();
  const [options, setOptions] = useState([{ name: "", values: [""] }]);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  // const [errors, setErrors] = useState({});
  const [showVariants, setShowVariants] = useState(false);
  const [variants, setVariants] = useState([
    { priceOption: [""], quantityOption: [""], imageOption: [""] },
  ]);
  const [totalQuantities, setTotalQuantities] = useState({});

  const handleVariantChange = (index, field, valueIndex, event) => {
    const newVariants = [...variants];
    const value = event.target.value.trim();

    // Cập nhật giá trị cho ô hiện tại
    newVariants[index][field][valueIndex] = value;

    setVariants(newVariants);
  };

  const calculateTotalQuantity = (key, variants, option) => {
    // Kiểm tra nếu không có dữ liệu trong option cho key thì trả về 0
    if (!option[key] || !Array.isArray(option[key])) return 0;
    let total = 0;
    // Sử dụng forEach để duyệt qua các phần tử trong option[key]
    option[key].forEach((_, valueIndex) => {
      // Lấy quantity từ variants, nếu không có thì gán giá trị 0
      const quantity = variants[key]?.[`quantity_${valueIndex}`] || 0;

      // Cộng dồn số lượng vào tổng
      total += parseInt(quantity, 10);
    });
    return total;
  };

  const totalQuantity = (variants) => {
    let totalQuantity = 0;
    // Duyệt qua tất cả các đối tượng trong variants (ví dụ M, S)
    Object.keys(variants).forEach((key) => {
      const variant = variants[key];

      // Duyệt qua tất cả các trường trong từng đối tượng (quantity_0, quantity_1, ...)
      Object.keys(variant).forEach((field) => {
        if (field.startsWith("quantity_")) {
          // Cộng dồn số lượng vào totalQuantity, chuyển giá trị sang kiểu number
          totalQuantity += parseInt(variant[field], 10);
        }
      });
    });
    return totalQuantity;
  };
  const totalQuantityProduct = totalQuantity(variants);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  // console.log(totalQuantityProduct);
  // console.log(variants);
  // console.log(options);

  useEffect(() => {
    // Đồng bộ state `description` với react-hook-form
    setValue("description", description);
  }, [description, setValue]);

  // Thay đổi hàm handleAddOption
  const handleAddOption = () => {
    if (options.length < 3) {
      setOptions([
        ...options,
        {
          name: "",
          values: [""],
        },
      ]);
    } else {
      Swal.fire({
        text: "Chỉ được thêm tối đa 3 tùy chọn",
        icon: "warning",
      });
    }
  };

  const handleValueChange = (optionIndex, valueIndex, event) => {
    const newOptions = [...options];
    const value = event.target.value.trim();

    // Cập nhật giá trị cho ô hiện tại
    newOptions[optionIndex].values[valueIndex] = value;

    // Nếu ô cuối cùng được điền, tự động thêm input mới
    if (
      valueIndex === newOptions[optionIndex].values.length - 1 &&
      value !== "" &&
      newOptions[optionIndex].values.length < 5 // Giới hạn số lượng value mỗi option là 5
    ) {
      newOptions[optionIndex].values.push("");
    }
    // Nếu ô input trống, xóa ô đó
    if (value === "" && newOptions[optionIndex].values.length > 1) {
      newOptions[optionIndex].values.splice(valueIndex, 1);
    }
    const filteredOptions = options
      .map((option) => ({
        ...option,
        values: option.values.filter((value) => value.trim() !== ""), // Loại bỏ giá trị trống
      }))
      .filter(
        (option) => option.name.trim() !== "" && option.values.length > 0 // Loại bỏ tùy chọn trống hoặc không có giá trị nào
      );
    const firstOptionValues = filteredOptions[0].values;
    const newVariants = firstOptionValues.map(() => ({
      priceOption: [""],
      quantityOption: [""],
    }));
    setVariants(newVariants);
    setOptions(newOptions);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    setFiles((prevFiles) => [
      ...prevFiles,
      ...validFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const onDropImageVariant = useCallback(
    (acceptedFiles, index) => {
      const updatedVariants = [...variants];
      // Cập nhật imageOption của phần tử tại index
      updatedVariants[index].imageOption = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setVariants(updatedVariants);
    },
    [variants]
  );
  const {
    getRootProps: rootPropImageVariant,
    getInputProps: inputPropImageVariant,
  } = useDropzone({
    onDrop: onDropImageVariant,
    accept: "image/*",
    multiple: true, // Cho phép tải nhiều ảnh
  });

  useEffect(() => {
    // Cleanup memory
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const hasDuplicateOptions = (options) => {
    const optionNames = options.map((option) =>
      option.name.trim().toLowerCase()
    );
    const uniqueNames = new Set(optionNames);
    return uniqueNames.size !== optionNames.length; // Trả về true nếu có trùng lặp
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  console.log(options);

  const generateNestedOptions = (options) => {
    const filteredOptions = options
      .map((option) => ({
        ...option,
        values: option.values.filter((value) => value.trim() !== ""), // Loại bỏ giá trị trống
      }))
      .filter(
        (option) => option.name.trim() !== "" && option.values.length > 0 // Loại bỏ tùy chọn trống hoặc không có giá trị nào
      );
    if (filteredOptions.length === 0) return []; // Không có option nào hợp lệ, trả về mảng rỗng

    if (filteredOptions.length === 1) {
      // Trường hợp chỉ có 1 option, trả về mảng 1 chiều
      return filteredOptions[0].values;
    }

    if (filteredOptions.length >= 2) {
      // Trường hợp có từ 2 options trở lên, trả về mảng 2 chiều
      const firstOption = filteredOptions[0].values; // Lấy giá trị của option đầu tiên
      const remainingOptions = filteredOptions.slice(1); // Các option còn lại

      const combinedValues = remainingOptions
        .map((option) => option.values)
        .reduce((acc, curr) =>
          acc.flatMap((a) => curr.map((b) => `${a} - ${b}`))
        );

      return firstOption.map((value) => ({
        [value]: combinedValues,
      }));
    }
    return []; // Trường hợp không hợp lệ
  };

  const nestedOptions = generateNestedOptions(options);

  const submit = (data) => {
    const formData = new FormData();

    formData.append("product_name", data.product_name);
    formData.append("price", data.price);
    formData.append("discount", data.discount || 0);
    formData.append("status", data.status);
    formData.append("category_id", data.category_id);
    formData.append("description", description);

    Array.from(files).forEach((file) => {
      formData.append("images[]", file); // Dùng 'images[]' để gửi mảng file
    });
    const filteredOptions = options
      .map((option) => ({
        ...option,
        values: option.values.filter((value) => value.trim() !== ""), // Loại bỏ giá trị trống
      }))
      .filter(
        (option) => option.name.trim() !== "" && option.values.length > 0 // Loại bỏ tùy chọn trống hoặc không có giá trị nào
      );

    const filteredVariant = variants.map((variant) => ({
      priceOption: variant.priceOption, // Dữ liệu giá trị giá
      quantityOption: variant.quantityOption, // Dữ liệu số lượng
    }));

    formData.append("options", JSON.stringify(filteredOptions));
    formData.append("variants", JSON.stringify(filteredVariant));
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    dispatch(fetchAddProduct(formData));
    // Swal.fire({
    //   text: "Thêm sản phẩm thành công!",
    //   icon: "success",
    // }).then(() => {
    //   navigate("/qlsanpham");
    // });
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
                  <h3 className="title-5 m-b-35">Thêm sản phẩm</h3>
                </div>
                <div className="card-body">
                  <form
                    className="add-product-form"
                    onSubmit={handleSubmit(submit)}
                  >
                    {/* Left Column */}
                    <div className="form-left">
                      <div className="form-group">
                        <label htmlFor="product_name">Tên sản phẩm</label>
                        <input
                          type="text"
                          id="product_name"
                          name="product_name"
                          // onChange={handleInputChange}
                          placeholder="Nhập tên sản phẩm"
                          // className={errors.product_name ? "is-invalid" : ""}
                          {...register("product_name", { required: true })}
                        />
                      </div>

                      <div className=" form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="price">Giá</label>
                          <input
                            type="number"
                            id="price"
                            name="price"
                            // onChange={handleInputChange}
                            placeholder="Nhập giá sản phẩm"
                            className={errors.price ? "is-invalid" : ""}
                            {...register("price", { required: true })}
                          />
                          {/* {errors.price && (
                            <small className="text-danger">
                              {errors.price}
                            </small>
                          )} */}
                        </div>

                        <div className="form-group col-md-6">
                          <label htmlFor="discount">Giá khuyến mãi </label>
                          <input
                            type="number"
                            id="discount"
                            name="discount"
                            // onChange={handleInputChange}
                            placeholder="Nhập giá khuyến mãi "
                            className={errors.discount ? "is-invalid" : ""}
                            {...register("discount", { required: true })}
                          />
                          {/* {errors.discount && (
                            <small className="text-danger">
                              {errors.discount}
                            </small>
                          )}{" "} */}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Mô tả chi tiết</label>
                        <ReactQuill
                          theme="snow"
                          value={description}
                          onChange={setDescription}
                          placeholder="Nhập mô tả chi tiết sản phẩm..."
                        />
                      </div>
                      {/* Checkbox to show/hide variant options */}
                      <label className="d-flex align-items-center gap-2 form-label">
                        <input
                          type="checkbox"
                          checked={showVariants}
                          onChange={() => setShowVariants(!showVariants)}
                        />
                        Sản phẩm có tùy chọn
                      </label>

                      {/* Options for Variants */}
                      {showVariants && (
                        <div className="variant-options">
                          <h4 className="mt-4">Các tùy chọn</h4>
                          {options.map((option, optionIndex) => (
                            <div key={optionIndex} className="my-3">
                              <label className="form-label">Tên tùy chọn</label>
                              <input
                                type="text"
                                className="form-control"
                                value={option.name}
                                onChange={(e) => {
                                  const newOptions = [...options];
                                  newOptions[optionIndex].name = e.target.value;
                                  setOptions(newOptions);
                                }}
                                placeholder={`Ví dụ: ${
                                  optionIndex === 0
                                    ? "Kích cỡ"
                                    : optionIndex === 1
                                    ? "Màu sắc"
                                    : "Chất liệu"
                                }`}
                              />

                              <label className="form-label mt-3">
                                Giá trị tùy chọn
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
                                    placeholder="Nhập giá trị tùy chọn"
                                  />
                                </div>
                              ))}
                              {/* {errors.options && (
                                <small className="text-danger">
                                  {errors.options}
                                </small>
                              )} */}
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
                          <div>
                            {/* Hiển thị nestedOptions với trường nhập giá */}
                            <div className="nested-options mt-4">
                              <h4>Các tùy chọn chi tiết</h4>
                              <table className="table table-data2">
                                <thead>
                                  <tr>
                                    <th>Tùy chọn</th>
                                    {/* <th></th> */}
                                    <th></th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {nestedOptions.map((option, index) => {
                                    // Trường hợp mảng 1 chiều (giá trị đơn)
                                    if (
                                      typeof option !== "object" ||
                                      Array.isArray(option)
                                    ) {
                                      return (
                                        <tr>
                                          <td>{option}</td>
                                          {/* <td></td> */}
                                          <td></td>
                                          <td>
                                            <input
                                              type="number"
                                              placeholder="Nhập giá cho tùy chọn"
                                              className="form-control w-100"
                                              value={
                                                variants[index]?.price || ""
                                              }
                                              onChange={(e) =>
                                                handleVariantChange(
                                                  index,
                                                  "price",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </td>
                                          <td>
                                            <input
                                              type="number"
                                              placeholder="Nhập số lượng"
                                              className="form-control"
                                              value={
                                                variants[index]?.quantity || ""
                                              }
                                              onChange={(e) =>
                                                handleVariantChange(
                                                  index,
                                                  "quantity",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </td>
                                        </tr>
                                      );
                                    }
                                    // Trường hợp option là object (mảng 2 chiều)
                                    if (typeof option === "object") {
                                      let subIndex = 0;
                                      return Object.keys(option).map((key) => (
                                        <tr>
                                          <td className="flex flex-col justify-between items-center">
                                            <span className="">{key}</span>
                                            {option[key].map((value) => (
                                              <span className="mt-3 ml-3">
                                                {value}
                                              </span>
                                            ))}
                                          </td>
                                          <td>
                                          </td>
                                          {/* <td></td> */}
                                          <td>
                                            <div className="flex flex-col items-center">
                                              {option[key].map(
                                                (value, valueIndex) => (
                                                  <input
                                                    key={`${value}-price-${valueIndex}`}
                                                    type="number"
                                                    placeholder="Nhập giá cho giá trị"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                      handleVariantChange(
                                                        index,
                                                        `priceOption`,
                                                        valueIndex,
                                                        e
                                                      )
                                                    }
                                                  />
                                                )
                                              )}
                                            </div>
                                          </td>
                                          <td className="flex flex-col justify-between items-center">
                                            <input
                                              type="number"
                                              placeholder="Nhập số lượng"
                                              className="form-control w-50"
                                              value={calculateTotalQuantity(
                                                key,
                                                variants,
                                                option
                                              )}
                                              disabled
                                            />
                                            {option[key].map(
                                              (value, valueIndex) => (
                                                <input
                                                  key={`${value}-quantity-${valueIndex}`} // Make sure you add a unique key when mapping
                                                  type="number"
                                                  placeholder={`Số lượng ${key}`}
                                                  className="form-control w-50"
                                                  onChange={(e) =>
                                                    handleVariantChange(
                                                      index,
                                                      `quantityOption`,
                                                      valueIndex,
                                                      e
                                                    )
                                                  }
                                                />
                                              )
                                            )}
                                          </td>
                                        </tr>
                                      ));
                                    }

                                    return null;
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="form-right">
                      <div className="form-group">
                        {/* danh muc  */}
                        <label htmlFor="category_id" className="form-label">
                          Danh mục
                        </label>
                        <select
                          name="category_id"
                          id="category_id"
                          className={errors.category ? "is-invalid" : ""}
                          // onChange={handleInputChange}
                          {...register("category_id")}
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
                        {/* {errors.category && (
                          <small className="text-danger">
                            {errors.category}
                          </small>
                        )} */}
                      </div>

                      <div className="form-group">
                        <label htmlFor="status">Trạng thái</label>
                        <select
                          id="status"
                          name="status"
                          className={errors.status ? "is-invalid" : ""}
                          {...register("status", { required: true })}
                        >
                          <option value="">Chọn trạng thái</option>
                          <option value="0">Đang hoạt động</option>
                          <option value="1">Không hoạt động</option>
                        </select>
                        {/* {errors.status && (
                          <small className="text-danger">{errors.status}</small>
                        )} */}
                      </div>

                      <div className="form-group">
                        <label>Tải lên hình ảnh</label>
                        <div {...getRootProps()} className="dropzone">
                          <input
                            type="file"
                            name="images"
                            {...getInputProps()}
                          />
                          <p>Kéo & thả hình ảnh hoặc nhấn để chọn tệp</p>
                        </div>
                        <div className="preview-container">
                          {files.map((file, index) => (
                            <div key={index} className="preview-item">
                              <img
                                src={file.preview}
                                alt="preview"
                                className="preview-image"
                              />
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => handleRemoveFile(index)}
                              >
                                Xóa
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

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
