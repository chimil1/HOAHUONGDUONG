import { Link } from "react-router-dom";
import { fetchProducts } from "../actions/unitActions";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import Header from "./layout/Header";
import Slider from "./layout/Slider";
import Footer from "./layout/Footer";

function Home() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.unit);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [currentProductIndex, setCurrentProductIndex] = React.useState(0);

  const handleNextProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex < productState.units.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : productState.units.length - 1
    );
  };

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

  const [time, setTime] = useState({
    days: 150,
    hours: 23,
    minutes: 47,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer); // Dừng đồng hồ khi kết thúc
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup khi component unmount
  }, []);

  return (
    <div className="App ">
      <Header />
      <Slider />
      <section class="features-area section_gap ">
        <div class="container">
          <div class="row features-inner">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="single-features">
                <div class="f-icon">
                  <img src="../../asset/images/features/f-icon1.png" alt="" />
                </div>
                <h6>Giảm phí vận chuyển</h6>
                <p>Theo đơn hàng</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="single-features">
                <div class="f-icon">
                  <img src="../../asset/images/features/f-icon2.png" alt="" />
                </div>
                <h6>Chính sách trả hàng</h6>
                <p>Kiểm tra hàng trước khi nhận</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="single-features">
                <div class="f-icon">
                  <img src="../../asset/images/features/f-icon3.png" alt="" />
                </div>
                <h6>Hỗ trợ 24/7</h6>
                <p>Giải đáp thắc mắc</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="single-features">
                <div class="f-icon">
                  <img src="../../asset/images/features/f-icon4.png" alt="" />
                </div>
                <h6>Thanh toán an toàn</h6>
                <p>Hoàn trả 100% giá đơn hàng</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="p-b-10">
          <h3 className="text-center text-uppercase text-dark fw-bold">
            Sản phẩm nổi bật
          </h3>
        </div>
        <div className="row isotope-grid mt-4">
          {Array.isArray(productState.units) &&
            productState.units.slice(0, visibleProducts).map((product) => (
              <div
                key={product.id}
                className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
              >
                <div className="block2">
                  <div className="block2-pic hov-img0 position-relative">
                    <img src={product.img} alt="IMG-PRODUCT" />
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
                        to={`/product/${product.id}`}
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
            {visibleProducts >= productState.units.length
              ? "Rút gọn"
              : "Xem thêm"}
          </button>
        </div>
      </div>
      <section className="exclusive-deal-area my-5">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 no-padding exclusive-left">
              <div className="row clock_sec clockdiv" id="clockdiv">
                <div className="col-lg-12">
                  <h1>Khuyến mãi hấp dẫn độc quyền sắp kết thúc!</h1>
                  <p>Who are in extremely love with eco friendly system.</p>
                </div>
                <div className="col-lg-12">
                  <div className="row clock-wrap">
                    <div className="col clockinner1 clockinner">
                      <h1 className="days">{time.days}</h1>
                      <span className="smalltext">Days</span>
                    </div>
                    <div className="col clockinner clockinner1">
                      <h1 className="hours">{time.hours}</h1>
                      <span className="smalltext">Hours</span>
                    </div>
                    <div className="col clockinner clockinner1">
                      <h1 className="minutes">{time.minutes}</h1>
                      <span className="smalltext">Mins</span>
                    </div>
                    <div className="col clockinner clockinner1">
                      <h1 className="seconds">{time.seconds}</h1>
                      <span className="smalltext">Secs</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="" className="primary-btn">
                Mua ngay
              </Link>
            </div>
            {Array.isArray(productState.units) &&
              productState.units.length > 0 && (
                <div className="col-lg-6 no-padding exclusive-right">
                  <div className="active-exclusive-product-slider position-relative">
                    <div className="single-exclusive-slider">
                      <img
                        className="img-fluid"
                        src={productState.units[currentProductIndex].img}
                        alt={
                          productState.units[currentProductIndex].product_name
                        }
                      />
                      <div className="product-details">
                        <div className="price">
                          <h6>
                            {productState.units[currentProductIndex].price}
                          </h6>
                          <h6 className="l-through">
                            {productState.units[currentProductIndex].old_price}
                          </h6>
                        </div>
                        <h4>
                          {productState.units[currentProductIndex].product_name}
                        </h4>
                        <div className="add-bag d-flex align-items-center justify-content-center">
                          <a className="add-btn" href="#">
                            <span className="ti-bag"></span>
                          </a>
                          <span className="add-text text-uppercase">
                            Add to Bag
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mũi tên điều hướng */}
                    <button
                      className="arrow left-arrow"
                      onClick={handlePreviousProduct}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                      className="arrow right-arrow"
                      onClick={handleNextProduct}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>
      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <div className="p-b-10">
            <h3 className="text-center text-uppercase text-dark my-4 fw-bold">
              TỔNG QUAN SẢN PHẨM
            </h3>
          </div>
          <div className="row isotope-grid my-2">
            {Array.isArray(productState.units) &&
              productState.units.map((product) => (
                <div
                  key={product.id}
                  className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
                >
                  <div className="block2">
                    <div className="block2-pic hov-img0 position-relative">
                      <img src={product.img} alt="IMG-PRODUCT" />
                      <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                        <button
                          type="button"
                          className="btn btn-dark text-white mt-2 position-absolute cart-button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
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
        </div>
      </section>
      {/* Modall */}
      <Footer />
    </div>
  );
}
export default Home;
