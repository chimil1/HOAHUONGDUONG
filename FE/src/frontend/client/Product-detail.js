import { useEffect, useState } from "react";
import {
  fetchProductDetails,
  fetchRelatedProducts,
} from "../actions/unitActions";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { Link, useParams } from "react-router-dom";

function Productdetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.unit);
  // const relatedProducts = useSelector((state) => state.unit);

  const initialImage =
    Array.isArray(productState.units.images) &&
    productState.units.images.length > 0
      ? productState.units.images[0].product_img
      : "";
  const [currentImage, setCurrentImage] = useState(initialImage);
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      Array.isArray(productState.units.images) &&
      productState.units.images.length > 0
    ) {
      setCurrentImage(productState.units.images[0].product_img);
    }
  }, [productState]);

  const product = productState.units;
  const [quantity, setQuantity] = useState(1);

  // useEffect(() => {
  //   if (product.category_id) {
  //     dispatch(fetchRelatedProducts(product.category_id));
  //   }
  // }, [dispatch, product.category_id]);

  // const relatedProduct = relatedProducts.units;
  // console.log(relatedProduct);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleThumbnailClick = (img) => {
    setCurrentImage(img);
  };

  if (!product) {
    return <p>Không có dữ liệu sản phẩm.</p>;
  }

  if (productState.loading) {
    return <p>Loading...</p>;
  }

  if (productState.error) {
    return <p>Lỗi: {productState.error}</p>;
  }

  if (!product || !productState.units || !productState.units.images) {
    return <p>Không có dữ liệu sản phẩm.</p>;
  }

  return (
    <div>
      <Header></Header>
      <hr></hr>
      <div className="container">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <Link to="/Home" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i
              className="fa fa-angle-right m-l-9 m-r-10"
              aria-hidden="true"
            ></i>
          </Link>

          <Link to="/Product" className="stext-109 cl8 hov-cl1 trans-04">
            Men
            <i
              className="fa fa-angle-right m-l-9 m-r-10"
              aria-hidden="true"
            ></i>
          </Link>

          <span className="stext-109 cl4">{product.product_name}</span>
        </div>
      </div>

      <section className="sec-product-detail bg-light p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-7 p-b-30">
              <div className="p-l-25 p-r-30 p-lr-0-lg">
                <div className="wrap-slick3 flex-sb flex-w">
                  <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>
                  <div className="slick3 gallery-lb">
                    <div className="gallery-container">
                      {/* Hiển thị hình ảnh lớn */}
                      <div className="large-image">
                        {currentImage ? (
                          <div className="wrap-pic-w pos-relative">
                            <img src={currentImage} alt="Hình sản phẩm" />
                          </div>
                        ) : (
                          <p>Không có hình ảnh nào cho sản phẩm này.</p>
                        )}
                      </div>
                      {/* Hình ảnh nhỏ */}
                      <div className="small-images">
                        {Array.isArray(productState.units.images) &&
                        productState.units.images.length > 0 ? (
                          productState.units.images
                            .slice(0, 4)
                            .map((item, index) => (
                              <div
                                key={index}
                                className="item-slick3 pos-relative"
                                onClick={() =>
                                  handleThumbnailClick(item.product_img)
                                }
                              >
                                <div className="wrap-pic-w pos-relative">
                                  <img
                                    src={item.product_img}
                                    alt={`Hình sản phẩm ${index + 1}`}
                                  />
                                </div>
                              </div>
                            ))
                        ) : (
                          <p>Không có hình ảnh nào cho sản phẩm này.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-5 p-b-10">
              <div className="p-r-50 p-t-5 p-lr-0-lg">
                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                  {product.product_name}
                </h4>
                <span className="mtext-106 cl2 p-b-5">
                  Giá bán: {formatPrice(product.price)}
                </span>
                <div className="mt-3">
                  <h5 className="mtext-100">Mô tả</h5>
                  <div className="mt-2">
                    <p className="stext-102">{product.description}</p>
                  </div>
                </div>

                <div className="p-t-33">
                  {product.options.map((options) => (
                    // item.option_name
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">
                        {options.option_name}
                      </div>

                      <div className="size-204 respon6-next">
                        <select
                          className="form-select form-select-sm"
                          name="time"
                        >
                          <option>Chọn {options.option_name}</option>
                          {options.option_values.map((values) => (
                            <option value={values.id}>
                              {values.value_name}
                            </option>
                          ))}
                        </select>
                        <div className="dropDownSelect2"></div>
                      </div>
                    </div>
                  ))}

                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-203 flex-c-m respon6">Số lượng</div>
                    <div className="size-204 flex-w flex-m respon6-next">
                      <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                        <div
                          className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                          onClick={handleDecrease}
                        >
                          <i className="fs-16 zmdi zmdi-minus"></i>
                        </div>

                        <input
                          className="mtext-104 cl3 txt-center num-product"
                          type="number"
                          name="num-product"
                          value={quantity}
                          readOnly
                        />

                        <div
                          className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                          onClick={handleIncrease}
                        >
                          <i className="fs-16 zmdi zmdi-plus"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-block">
                  <button className="btn btn-dark btn-lg m-2 rounded-pill">
                    Thêm vào giỏ
                  </button>

                  <button className="btn btn-dark btn-lg rounded-pill">
                    Mua hàng
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bor10 m-t-50 p-t-43 p-b-40">
            <div className="tab01">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item p-b-10">
                  <p className="nav-link active" role="tab">
                    MÔ TẢ SẢN PHẨM
                  </p>
                  <div className="mt-3">
                    <p className="stext-102">{product.description}</p>
                  </div>
                </li>

                <li className="nav-item p-b-10">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#reviews"
                    role="tab"
                  >
                    Đánh giá (1)
                  </a>
                </li>
              </ul>

              <div className="tab-content p-t-43">
                <div
                  className="tab-pane fade show active"
                  id="description"
                  role="tabpanel"
                >
                  <div className="how-pos2 p-lr-15-md">
                    <p className="stext-102 cl6"></p>
                  </div>
                </div>

                <div className="tab-pane fade" id="information" role="tabpanel">
                  <div className="row">
                    <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                      <ul className="p-lr-28 p-lr-15-sm">
                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">Weight</span>

                          <span className="stext-102 cl6 size-206">
                            0.79 kg
                          </span>
                        </li>

                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">
                            Dimensions
                          </span>

                          <span className="stext-102 cl6 size-206">
                            110 x 33 x 100 cm
                          </span>
                        </li>

                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">
                            Materials
                          </span>

                          <span className="stext-102 cl6 size-206">
                            60% cotton
                          </span>
                        </li>

                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">Color</span>

                          <span className="stext-102 cl6 size-206">
                            Black, Blue, Grey, Green, Red, White
                          </span>
                        </li>

                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">Size</span>

                          <span className="stext-102 cl6 size-206">
                            XL, L, M, S
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="reviews" role="tabpanel">
                  <div className="row">
                    <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                      <div className="p-b-30 m-lr-15-sm">
                        <div className="flex-w flex-t p-b-68">
                          <div className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                            <img
                              src="../../asset/images/avatar-01.jpg"
                              alt="AVATAR"
                            />
                          </div>

                          <div className="size-207">
                            <div className="flex-w flex-sb-m p-b-17">
                              <span className="mtext-107 cl2 p-r-20">
                                Phạm Việt Hùng
                              </span>

                              <span className="fs-18 cl11">
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star-half"></i>
                              </span>
                            </div>

                            <p className="stext-102 cl6">
                              Quod autem in homine praestantissimum atque
                              optimum est, id deseruit. Apud ceteros autem
                              philosophos
                            </p>
                          </div>
                        </div>

                        <form className="w-full">
                          <h5 className="mtext-108 cl2 p-b-7">Add a review</h5>

                          <p className="stext-102 cl6">
                            Your email address will not be published. Required
                            fields are marked *
                          </p>

                          <div className="flex-w flex-m p-t-50 p-b-23">
                            <span className="stext-102 cl3 m-r-16">
                              Your Rating
                            </span>

                            <span className="wrap-rating fs-18 cl11 pointer">
                              <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                              <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                              <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                              <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                              <i className="item-rating pointer zmdi zmdi-star-outline"></i>
                              <input
                                className="dis-none"
                                type="number"
                                name="rating"
                              />
                            </span>
                          </div>

                          <div className="row p-b-25">
                            <div className="col-12 p-b-5">
                              <label className="stext-102 cl3" for="review">
                                Your review
                              </label>
                              <textarea
                                className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                                id="review"
                                name="review"
                              ></textarea>
                            </div>

                            <div className="col-sm-6 p-b-5">
                              <label className="stext-102 cl3" for="name">
                                Name
                              </label>
                              <input
                                className="size-111 bor8 stext-102 cl2 p-lr-20"
                                id="name"
                                type="text"
                                name="name"
                              />
                            </div>

                            <div className="col-sm-6 p-b-5">
                              <label className="stext-102 cl3" for="email">
                                Email
                              </label>
                              <input
                                className="size-111 bor8 stext-102 cl2 p-lr-20"
                                id="email"
                                type="text"
                                name="email"
                              />
                            </div>
                          </div>

                          <button className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-relate-product bg0 p-t-45 p-b-105">
        <div className="container">
          <div className="p-b-45">
            <h3 className="ltext-106 cl5 txt-center">Sản phẩm liên quan</h3>
          </div>
          <div className="wrap-slick2">
            <div className="row isotope-grid">
              {/* {Array.isArray(relatedProduct) && relatedProduct.length > 0 ? (
                relatedProduct.map((relatedProduct) => (
                  <div
                    className="col-sm-6 col-md-4 col-lg-3 p-b-35"
                    key={relatedProduct.category_id}
                  >
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img
                          // src={relatedProduct.img || "../../asset/images/default-image.png"}
                          alt="IMG-PRODUCT"
                        />
                        <Link
                          to="#"
                          className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                        >
                          Quick View
                        </Link>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l">
                          <Link
                            to={`/product/${relatedProduct.category_id}`}
                            className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                          >
                            {relatedProduct.product_name || "Tên sản phẩm"}
                          </Link>
                          <span className="stext-105 cl3">
                            {relatedProduct.price
                              ? formatPrice(relatedProduct.price)
                              : "Liên hệ"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm liên quan.</p>
              )} */}
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Productdetail;
