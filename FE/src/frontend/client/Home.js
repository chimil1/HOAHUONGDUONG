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
            {visibleProducts >= productState.units.length ? "Rút ngắn" : "Xem thêm"}
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
                      Men
                    </span>

                    <span class="block1-info stext-102 trans-04">
                      Spring 2018
                    </span>
                  </div>

                  <div class="block1-txt-child2 p-b-4 trans-05">
                    <div class="block1-link stext-101 cl0 trans-09">
                      Shop Now
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
                      Accessories
                    </span>

                    <span class="block1-info stext-102 trans-04">
                      New Trend
                    </span>
                  </div>

                  <div class="block1-txt-child2 p-b-4 trans-05">
                    <div class="block1-link stext-101 cl0 trans-09">
                      Shop Now
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
            {[
              {
                imgSrc: "../../asset/images/product-01.jpg",
                title: "Esprit Ruffle Shirt",
                price: "400.000đ",
              },
              {
                imgSrc: "../../asset/images/product-02.jpg",
                title: "Herschel supply",
                price: "350. 000đ",
              },
              {
                imgSrc: "../../asset/images/product-03.jpg",
                title: "Only Check Trouser",
                price: "250.000đ",
              },
              {
                imgSrc: "../../asset/images/product-04.jpg",
                title: "Classic Trench Coat",
                price: "750.000đ",
              },
            ].map((product, index) => (
              <div
                key={index}
                className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item"
              >
                <div className="block2">
                  <div className="block2-pic hov-img0">
                    <img src={product.imgSrc} alt="IMG-PRODUCT" />
                    <Link
                      to="/Productdetail"
                      className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                    >
                      Xem
                    </Link>
                  </div>
                  <div className="block2-txt flex-w flex-t p-t-14">
                    <div className="block2-txt-child1 flex-col-l">
                      <a
                        href="product-detail.html"
                        className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                      >
                        {product.title}
                      </a>
                      <span className="stext-105 cl4">{product.price}</span>
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
                to="#"
                className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
              >
                Xem thêm
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Modall */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <form action="index.php?act=carts&get=toCart" method="post">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Thêm vào giỏ hàng
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-6 slick3 gallery-lb">
                    <div
                      className="item-slick3"
                      data-thumb="https://fttleather.com/uploads/1026/product/2023/10/12/ftttt-11-1697128314.jpg"
                    >
                      <div className="wrap-pic-w pos-relative">
                        <img src="" alt="IMG-PRODUCT" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-5 p-b-30">
                    <div className="p-r-50 p-t-5 p-lr-0-lg">
                      <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                        Lightweight Jacket
                      </h4>

                      <span className="mtext-106 cl2"> $58.79 </span>

                      <p className="stext-102 cl3 p-t-23">
                        Nulla eget sem vitae eros pharetra viverra. Nam vitae
                        luctus ligula. Mauris consequat ornare feugiat.
                      </p>

                      <div className="p-t-33">
                        <div className="flex-w flex-r-m p-b-10">
                          <div className="size-203 flex-c-m respon6">
                            Kích cỡ
                          </div>
                          <div className="size-204 respon6-next">
                            <div className="rs1-select2 bor8 bg0">
                              <select
                                className="form-select form-select-sm"
                                name="time"
                              >
                                <option>Chọn Size</option>
                                <option>Size S</option>
                                <option>Size M</option>
                                <option>Size L</option>
                                <option>Size XL</option>
                              </select>
                              <div className="dropDownSelect2"></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-w flex-r-m p-b-10">
                          <div className="size-203 flex-c-m respon6">Màu</div>

                          <div className="size-204 respon6-next">
                            <div className="rs1-select2 bor8 bg0">
                              <select
                                className="form-select form-select-sm"
                                name="time"
                              >
                                <option>Chọn màu</option>
                                <option>Red</option>
                                <option>Blue</option>
                                <option>White</option>
                                <option>Grey</option>
                              </select>
                              <div className="dropDownSelect2"></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-w flex-r-m p-b-10">
                          <div className="size-204 flex-w flex-m respon6-next">
                            <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                              <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                <i className="fs-16 zmdi zmdi-minus"></i>
                              </div>

                              <input
                                className="mtext-104 cl3 txt-center num-product"
                                type="number"
                                name="num-product"
                                value="1"
                              />

                              <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                <i className="fs-16 zmdi zmdi-plus"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                        <div className="flex-m bor9 p-r-10 m-r-11">
                          <Link
                            href="#"
                            className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                            data-tooltip="Add to Wishlist"
                          >
                            <i className="zmdi zmdi-favorite"></i>
                          </Link>
                        </div>

                        <Link
                          href="#"
                          className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                          data-tooltip="Facebook"
                        >
                          <i className="fa fa-facebook"></i>
                        </Link>

                        <Link
                          href="#"
                          className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                          data-tooltip="Twitter"
                        >
                          <i className="fa fa-twitter"></i>
                        </Link>

                        <Link
                          href="#"
                          className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                          data-tooltip="Google Plus"
                        >
                          <i className="fa fa-google-plus"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" name="addcart" className="btn btn-dark">
                  Thêm vào giỏ hàng
                </button>
              </div>
              <input type="hidden" name="id_product" value="" />
              <input type="hidden" name="name" value="" />
              <input type="hidden" name="price" value="" />
              <input type="hidden" name="img" value="" />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Home;
