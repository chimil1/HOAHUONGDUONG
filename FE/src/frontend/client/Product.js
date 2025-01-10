import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchCategory, fetchCategoryType,addToCart } from "../actions/unitActions";
import Loading from "./layout/Loading";
import Swal from "sweetalert2";
function Product() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [isRecording, setIsRecording] = useState(false); // Trạng thái ghi âm
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.unit);
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };


  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "vi-VN";

    setIsRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setCurrentPage(1);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      alert("Không thể nhận diện giọng nói!");
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1); // Quay lại trang đầu
  };

  const filterProducts = () => {
    const min = minPrice ? parseFloat(minPrice) : -Infinity;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;

    return Array.isArray(productState.units)
        ? productState.units.filter(
            (product) =>
                product.price >= min &&
                product.price <= max &&
                product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];
  };

  let filteredProducts = filterProducts();

  if (sortOrder === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "a-z") {
    filteredProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
  } else if (sortOrder === "z-a") {
    filteredProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchCategoryType());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Bạn cần đăng nhập để thêm vào giỏ hàng",
        confirmButtonText: "Đăng nhập",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    const data = {
      product_id: product.id,
      quantity: 1, // Mặc định là 1
      options: {}, // Mặc định không có tùy chọn
    };

    dispatch(addToCart(data));
    Swal.fire({
      icon: "success",
      title: "Thêm vào giỏ hàng thành công!",
      timer: 1200,
      showConfirmButton: false,
    }).then(() => {
      console.log("Alert closed");
    });
  };

  if (productState.loading) {
    return <Loading></Loading>;
    return (
        <div className="row">
          {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="col-md-3">
                <div className="skeleton skeleton-card"></div>
              </div>
          ))}
        </div>
    );
  }

  if (productState.error) {
    return <p>Error: {productState.error}</p>;
  }

  if (!Array.isArray(productState.units)) {
    return <p>Error: Data format is incorrect, expected an array.</p>;
  }

  return (
      <div>
        <Header />
        <div className="bg0 m-t-23 p-b-140 m-t-150">
          <div className="container">
            <div className="row">
              <div className="col-md-3 p-3 mb-4 mt-1">
                <h5 className="text-dark mb-3">Tìm kiếm sản phẩm</h5>

                {/* Tìm kiếm sản phẩm */}
                <div className="filter-search mb-3 position-relative">
                  <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {/* Nút xóa */}
                  {searchTerm && (
                      <button
                          onClick={clearSearch}
                          className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-5 p-0"
                          style={{border: "none", background: "none"}}
                      >
                        <i className="fa fa-times fa-lg text-danger"></i>
                      </button>
                  )}
                  {/* Nút microphone */}
                  <button
                      onClick={handleVoiceSearch}
                      className={`btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-0 ${
                          isRecording ? "text-danger" : "text-primary"
                      }`}
                      style={{border: "none", background: "none"}}
                  >
                    <i className={`fa fa-microphone fa-lg ${isRecording ? "fa-beat" : ""}`}></i>
                  </button>
                </div>

                {/* Các bộ lọc khác */}
                <div className="filter-price mb-3">
                  <label className="form-label fw-bold">Khoảng giá:</label>
                  <input
                      type="number"
                      placeholder="Giá tối thiểu"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="form-control mb-2"
                  />
                  <input
                      type="number"
                      placeholder="Giá tối đa"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="form-control"
                  />
                </div>

                <div className="filter-options mb-3">
                  <label className="form-label fw-bold">Sắp xếp theo:</label>
                  <select
                      value={sortOrder || ""}
                      onChange={handleSortChange}
                      className="form-select"
                  >
                    <option value="">Sắp xếp</option>
                    <option value="asc">Giá tăng dần</option>
                    <option value="desc">Giá giảm dần</option>
                    <option value="a-z">Tên A-Z</option>
                    <option value="z-a">Tên Z-A</option>
                  </select>
                </div>
              </div>

              {/* Danh sách sản phẩm */}
              <div className="col-md-9">
                <div className="row isotope-grid">
                  {currentItems.length > 0 ? (
                      currentItems.map((product) => (
                          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item">
                            <div className="block2">
                              <div className="block2-pic hov-img0 position-relative">
                                <div
                                    className="block2-pic hov-img0 position-relative"

                                    style={{cursor: "pointer"}}
                                >
                                  <img src={product.img} alt="IMG-PRODUCT"/>
                                </div>

                                <div
                                    className="cart-eye-buttons d-flex flex-column align-items-center position-absolute">
                                  <button
                                      type="button"
                                      className="btn btn-dark text-white"
                                      onClick={(e) => {
                                        console.log("Clicked element:", e.target); // Kiểm tra DOM element
                                        handleAddToCart(product);
                                      }}

                                  >
                                    <i className="fas fa-cart-plus"></i>
                                  </button>
                                </div>
                              </div>

                              <div className="block2-txt flex-w flex-t p-t-14">
                                <div className="block2-txt-child1 flex-col-l">
                                  <Link
                                      to={`/product/${product.id}`}
                                      className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                                  >
                                    {truncate(product.product_name, 20)}
                                  </Link>
                                  <span className="stext-105 cl3 text-danger">
                        {formatPrice(product.price)}
                      </span>
                                </div>
                              </div>
                            </div>
                          </div>
                      ))
                  ) : (
                      <p className="text-center mt-5">
                        <i className="fa fa-search-minus fa-2x text-muted"></i>
                        <br/>
                        Không tìm thấy sản phẩm liên quan.
                      </p>
                  )}
                </div>

                {/* Pagination */}
                {filteredProducts.length > itemsPerPage && (
                    <div className="flex-c-m flex-w w-full p-t-45">
                      <button
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                          className="btn btn-outline-dark mr-2"
                      >
                        Trước
                      </button>
                      <span className="m-2">Trang {currentPage} / {totalPages}</span>
                      <button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          className="btn btn-outline-dark"
                      >
                        Sau
                      </button>
                    </div>
                )}
              </div>

            </div>
          </div>
        </div>
        <Footer/>
      </div>
  );
}

export default Product;