import React, { useState, useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import "./pr.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

const CNDanhMuc = () => {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [formState, setFormState] = useState({
    productName: "",
    price: "",
    category: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

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
    accept: "image/*",
    onDrop,
  });

  useEffect(() => {
    // Cleanup memory
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.productName.trim())
      newErrors.productName = "Tên sản phẩm là bắt buộc.";
    if (
      !formState.price.trim() ||
      isNaN(formState.price) ||
      formState.price <= 0
    )
      newErrors.price = "Giá phải là một số lớn hơn 0.";
    if (!formState.category.trim())
      newErrors.category = "Danh mục là bắt buộc.";
    if (!formState.status.trim()) newErrors.status = "Trạng thái là bắt buộc.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Form Data:", { ...formState, description, files });
    // Thực hiện các xử lý submit ở đây
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
                  <h3 className="title-5 m-b-35">Thêm sản phẩm mới</h3>
                </div>
                <div className="card-body">
                  <form className="add-product-form" onSubmit={handleSubmit}>
                    {/* Left Column */}
                    <div className="form-left">
                      <div className="form-group">
                        <label htmlFor="productName">Tên sản phẩm</label>
                        <input
                          type="text"
                          id="productName"
                          name="productName"
                          value={formState.productName}
                          onChange={handleInputChange}
                          placeholder="Nhập tên sản phẩm"
                          className={errors.productName ? "is-invalid" : ""}
                        />
                        {errors.productName && (
                          <small className="text-danger">
                            {errors.productName}
                          </small>
                        )}
                      </div>

                      <div className=" form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="price">Giá</label>
                          <input
                            type="text"
                            id="price"
                            name="price"
                            value={formState.price}
                            onChange={handleInputChange}
                            placeholder="Nhập giá sản phẩm"
                            className={errors.price ? "is-invalid" : ""}
                          />
                          {errors.price && (
                            <small className="text-danger">
                              {errors.price}
                            </small>
                          )}
                        </div>

                        <div className="form-group col-md-6">
                          <label htmlFor="price">Giá khuyến mãi </label>
                          <input
                            type="text"
                            id="price"
                            name="price"
                            value={formState.price}
                            onChange={handleInputChange}
                            placeholder="Nhập giá khuyến mãi "
                            className={errors.price ? "is-invalid" : ""}
                          />
                          {errors.price && (
                            <small className="text-danger">
                              {errors.price}
                            </small>
                          )}{" "}
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
                    </div>

                    {/* Right Column */}
                    <div className="form-right">
                      <div className="form-group">
                        <label htmlFor="category">Danh mục</label>
                        <select
                          id="category"
                          name="category"
                          value={formState.category}
                          onChange={handleInputChange}
                          className={errors.category ? "is-invalid" : ""}
                        >
                          <option value="">Chọn danh mục</option>
                          <option value="cat1">Danh mục 1</option>
                          <option value="cat2">Danh mục 2</option>
                        </select>
                        {errors.category && (
                          <small className="text-danger">
                            {errors.category}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="status">Trạng thái</label>
                        <select
                          id="status"
                          name="status"
                          value={formState.status}
                          onChange={handleInputChange}
                          className={errors.status ? "is-invalid" : ""}
                        >
                          <option value="">Chọn trạng thái</option>
                          <option value="active">Đang hoạt động</option>
                          <option value="inactive">Không hoạt động</option>
                        </select>
                        {errors.status && (
                          <small className="text-danger">{errors.status}</small>
                        )}
                      </div>

                      <div className="form-group">
                        <label>Tải lên hình ảnh</label>
                        <div {...getRootProps()} className="dropzone">
                          <input {...getInputProps()} />
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
};

export default CNDanhMuc;
