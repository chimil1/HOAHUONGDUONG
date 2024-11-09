import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Link } from "react-router-dom";
import '../Css/Product.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchCategory } from "../actions/unitActions";

function Search() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  let filteredProducts;
  switch (true) {
    case searchTerm.trim() === "":
      filteredProducts = productState.units;
      break;
    case productState.units.some(product =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    ):
      filteredProducts = productState.units.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      break;
    default:
      filteredProducts = [];
      break;
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

  return (
    <div>
      <Header />
      <div className="bg0 m-t-23 p-b-140">
        <div className="container">
          <div className="d-flex justify-content-center my-4">
            <input
              type="text"
              className="form-control col-md-6" 
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="row isotope-grid">
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                  <div className="block2">
                    <div className="block2-pic hov-img0">
                      <img src={product.img} alt="IMG-PRODUCT"/>
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
      <Footer />
    </div>
  );
}

export default Search;
