import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Link } from "react-router-dom";
import '../Css/Product.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchCategory } from "../actions/unitActions";

function Product() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);  // Thêm state để lưu trữ phương thức sắp xếp
  const itemsPerPage = 8;

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.unit);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (productState.loading) {
    return <p>Loading...</p>;
  }

  if (productState.error) {
    return <p>Error: {productState.error}</p>;
  }

  if (!Array.isArray(productState.units)) {
    return <p>Error: Data format is incorrect, expected an array.</p>;
  }

  // Sắp xếp sản phẩm theo giá
  let sortedProducts = [...productState.units]; // Sử dụng một bản sao của mảng để không thay đổi dữ liệu gốc

  if (sortOrder === "asc") {
    sortedProducts.sort((a, b) => a.price - b.price); // Giá tăng dần
  } else if (sortOrder === "desc") {
    sortedProducts.sort((a, b) => b.price - a.price); // Giá giảm dần
  }

  // Xử lý phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

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
    setSortOrder(e.target.value); // Cập nhật phương thức sắp xếp
    setCurrentPage(1); // Reset lại trang về đầu khi thay đổi sắp xếp
  };

  return (
    <div>
      <Header />
      <div className="bg0 m-t-23 p-b-140">
        <div className="container">
          <div className="flex-w flex-sb-m p-b-52">
            <div className="flex-w flex-l-m filter-tope-group m-tb-10 btn-group">
              <div className="dropdown mr-1">
                <a className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" href="/product">Tất cả</a>
                <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent" id="dropdownMenuOffset">Quần</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                  <a className="dropdown-item" href="#">Quần short</a>
                  <a className="dropdown-item" href="#">Quần dài</a>
                  <a className="dropdown-item" href="#">Quần Jeans</a>
                </div>
              </div>
              <div className="btn-group">
                <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent" id="dropdownMenuReference">Áo</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                  <a className="dropdown-item" href="#">Áo thun</a>
                  <a className="dropdown-item" href="#">Áo sơ mi</a>
                  <a className="dropdown-item" href="#">Áo Polo</a>
                </div>
              </div>
              <div className="btn-group">
                <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent" id="ao">Giày</button>
                <div className="dropdown-menu" aria-labelledby="ao">
                  <a className="dropdown-item" href="#">Giày thể thao</a>
                  <a className="dropdown-item" href="#">Giày sandal</a>
                  <a className="dropdown-item" href="#">Giày da</a>
                </div>
              </div>
              <div className="btn-group">
                <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent" id="PK">Phụ Kiện</button>
                <div className="dropdown-menu" aria-labelledby="PK">
                  <a className="dropdown-item" href="#">Đồng hồ</a>
                  <a className="dropdown-item" href="#">Nhẫn</a>
                  <a className="dropdown-item" href="#">Dây chuyền</a>
                  <a className="dropdown-item" href="#">Vòng tay</a>
                </div>
              </div>
            </div>

            {/* Thêm phần lọc theo giá dưới dạng select */}
            <div className="filter-options">
              <select
                value={sortOrder || ""}
                onChange={handleSortChange}
                className="form-control w-150 custom-dropdown"
              >
                <option value="">Sắp xếp theo giá</option>
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
              </select>
            </div>

            <div className="row isotope-grid">
              {currentItems.map((product) => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                  <div className="block2">
                    <div className="block2-pic hov-img0">
                      <img src={product.img} alt="IMG-PRODUCT" />
                      <Link
                        to={`${product.id}`}
                        className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                      >
                        Xem
                      </Link>
                    </div>
                    <div className="block2-txt flex-w flex-t p-t-14">
                      <div className="block2-txt-child1 flex-col-l">
                        <Link to={`${product.id}`} className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                          {product.product_name}
                        </Link>
                        <span className="stext-105 cl3">{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
                className="btn btn-outline-dark mr-2"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Product;
