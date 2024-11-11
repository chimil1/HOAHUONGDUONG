import { Link } from "react-router-dom";
import { fetchProducts } from "../actions/unitActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Header from "./layout/Header";
import Slider from "./layout/Slider";
import Footer from "./layout/Footer";

function Home() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.unit);
  const [visibleProducts, setVisibleProducts] = useState(4);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const toggleProducts = () => {
    if (visibleProducts >= productState.units.length) {
      setVisibleProducts(4);
    } else {
      setVisibleProducts((prevVisible) => prevVisible + 4);
    }
  };

  return (
    <div className="App">
      <Header />
      <Slider />
      <div className="container my-5">
        <div className="p-b-10">
          <h3 className="text-center text-uppercase text-dark fw-bold my-4">Sản phẩm nổi bật</h3>
        </div>
        <div className="row isotope-grid mt-4">
        {productState.units.slice(0, visibleProducts).map((product) => (
            <div
              key={product.id}
              className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
            >
              <div className="block2">
                <div className="block2-pic hov-img0 position-relative">
                  <img src={product.images} alt="IMG-PRODUCT" />
                  <button
                    type="button"
                    className="btn btn-dark text-white mt-2 position-absolute cart-button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i className="fas fa-cart-plus"></i>
                  </button>
                </div>
                <div className="block2-txt flex-w flex-t p-t-14">
                  <div className="block2-txt-child1 flex-col-l">
                    <Link
                      to={`${product.id}`}
                      className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    >
                      {product.product_name}
                    </Link>
                    <span className="stext-105 cl3">{product.price}</span>
                  </div>
                  <div className="block2-txt-child2 flex-r p-t-3">
                    <Link
                      to="#"
                      className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    >
                      <img
                        className="icon-heart1 dis-block trans-04"
                        src="../../asset/images/icons/icon-heart-01.png"
                        alt="ICON"
                      />
                      <img
                        className="icon-heart2 dis-block trans-04 ab-t-l"
                        src="../../asset/images/icons/icon-heart-02.png"
                        alt="ICON"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-c-m flex-w w-full p-t-45">
          <button
            onClick={toggleProducts}
            className="text-center flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
            style={{ borderRadius: "30px" }}
          >
            {visibleProducts >= productState.units.length ? "Rút gọn" : "Xem thêm"}
          </button>
        </div>
      </div>

      <div className="sec-banner bg0 p-t-80 p-b-50">
        <div className="container">
          <div className="row">
            <div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div class="block1 wrap-pic-w">
                <img src="../../asset/images/banner-02.jpg" alt="IMG-BANNER" />

                <a
                  href="product.html"
                  class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div class="block1-txt-child1 flex-col-l">
                    <span class="block1-name ltext-102 trans-04 p-b-8">
                      Nam
                    </span>

                    <span class="block1-info stext-102 trans-04">
                      Spring 2024
                    </span>
                  </div>

                  <div class="block1-txt-child2 p-b-4 trans-05">
                    <div class="block1-link stext-101 cl0 trans-09">
                      Mua ngay
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src="../../asset/images/banner-01.jpg" alt="IMG-BANNER" />
                <a
                  href="product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Nữ
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      Spring 2024
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Mua ngay
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div class="block1 wrap-pic-w">
                <img src="../../asset/images/banner-03.jpg" alt="IMG-BANNER" />
                <a
                  href="product.html"
                  class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div class="block1-txt-child1 flex-col-l">
                    <span class="block1-name ltext-102 trans-04 p-b-8">
                      Phụ kiện
                    </span>

                    <span class="block1-info stext-102 trans-04">
                      Xu hướng mới
                    </span>
                  </div>

                  <div class="block1-txt-child2 p-b-4 trans-05">
                    <div class="block1-link stext-101 cl0 trans-09">
                      Mua ngay
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <div className="p-b-10">
            <h3 className="text-center text-dark fw-semibold display-6 my-4">TỔNG QUAN SẢN PHẨM</h3>
          </div>
          <div className="row isotope-grid my-2">
          {productState.units.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
            >
              <div className="block2">
                <div className="block2-pic hov-img0 position-relative">
                  <img src={product.images} alt="IMG-PRODUCT" />
                  <button
                    type="button"
                    className="btn btn-dark text-white mt-2 position-absolute cart-button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i className="fas fa-cart-plus"></i>
                  </button>
                </div>
                <div className="block2-txt flex-w flex-t p-t-14">
                  <div className="block2-txt-child1 flex-col-l">
                    <Link
                      to={`${product.id}`}
                      className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    >
                      {product.product_name}
                    </Link>
                    <span className="stext-105 cl3">{product.price}</span>
                  </div>
                  <div className="block2-txt-child2 flex-r p-t-3">
                    <Link
                      to="#"
                      className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    >
                      <img
                        className="icon-heart1 dis-block trans-04"
                        src="../../asset/images/icons/icon-heart-01.png"
                        alt="ICON"
                      />
                      <img
                        className="icon-heart2 dis-block trans-04 ab-t-l"
                        src="../../asset/images/icons/icon-heart-02.png"
                        alt="ICON"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
            <div className="flex-c-m flex-w w-full p-t-45">
              <Link
                to="/product"
                className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
              >
                Xem thêm
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default Home;
