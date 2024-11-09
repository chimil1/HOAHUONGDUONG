import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Link } from "react-router-dom";
import '../Css/Product.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchCategory } from "../actions/unitActions";

function Product() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const[product,setProduct]= useState([]);
  useEffect(()=>{
    axios
        .get("http://localhost:8000/api/user")
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
  },[])
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productState.units.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(productState.units.length / itemsPerPage);

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

  return (
    <div>
      <Header />
      <div className="bg0 m-t-23 p-b-140">
        <div className="container">
          <div className="row">
            {/* Bộ lọc và tìm kiếm sản phẩm bên trái */}
            <div className="col-md-3 p-3 mb-4 mt-5">
              <div className="d-flex align-items-center mb-3">
                <h5 className="text-dark mb-0">Tìm kiếm sản phẩm</h5>
              </div>
              {/* Tìm kiếm sản phẩm */}
              <div className="filter-search mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              {/* Lọc theo khoảng giá */}
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

              {/* Dropdown sắp xếp */}
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
              <div className="flex-w flex-sb-m p-b-52">
                <div className="flex-w flex-l-m filter-tope-group m-tb-10 btn-group">
                  <a className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" href="/product" t>Tất cả</a>
                  <div className="dropdown mr-1">
                    <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 "
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                      data-reference="parent" id="dropdownMenuOffset">Quần
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                      {currentCatetype.map((cate) => (
                        <a className="dropdown-item" href="#">{cate.name}</a>
                      ))}
                    </div>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 "
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                      data-reference="parent" id="dropdownMenuReference">Áo
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                      <a className="dropdown-item" href="#">Áo thun</a>
                      <a className="dropdown-item" href="#">Áo sơ mi</a>
                      <a className="dropdown-item" href="#">Áo Polo</a>
                    </div>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 "
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                      data-reference="parent" id="ao">Giày
                    </button>
                    <div className="dropdown-menu" aria-labelledby="ao">
                      <a className="dropdown-item" href="#">Giày thể thao</a>
                      <a className="dropdown-item" href="#">Giày sandal</a>
                      <a className="dropdown-item" href="#">Giày da</a>
                    </div>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 "
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                      data-reference="parent" id="PK">Phụ Kiện
                    </button>
                    <div className="dropdown-menu" aria-labelledby="PK">
                      <a className="dropdown-item" href="#">Đồng hồ</a>
                      <a className="dropdown-item" href="#">Nhẫn</a>
                      <a className="dropdown-item" href="#">Dây chuyền</a>
                      <a className="dropdown-item" href="#">Vòng tay</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row isotope-grid">
                {currentItems.length > 0 ? (
                  currentItems.map((product) => (
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
                  ))
                ) : (
                  <p>Không tìm được sản phẩm liên quan</p>
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
                    className="btn btn-outline-dark mr-2"
                  >
                    Sau
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
