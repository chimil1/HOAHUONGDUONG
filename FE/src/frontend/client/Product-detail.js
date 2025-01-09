import { useEffect, useState } from "react";
import {
  fetchProductDetails,
  fetchRelatedProducts,
  fetchReviews,
  addReview,
} from "../actions/unitActions";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { Link, useParams } from "react-router-dom";

function Productdetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.unit);
  const relatedProductsState = useSelector(
    (state) => state.relatedProducts || []
  );

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
    if (productState.units && productState.units.category_id) {
      dispatch(fetchRelatedProducts(productState.units.category_id));
    }
  }, [dispatch, productState.units]);

  useEffect(() => {
    if (
      Array.isArray(productState.units.images) &&
      productState.units.images.length > 0
    ) {
      setCurrentImage(productState.units.images[0].product_img);
    }
  }, [productState]);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    dispatch(fetchReviews(id)); 
  }, [dispatch, id]);

  
  const reviewsState = useSelector((state) => state.reviews); 

  
  useEffect(() => {
    console.log("Reviews state updated:", reviewsState);
  }, [reviewsState]); 



  const product = productState.units;
  const [quantity, setQuantity] = useState(1);

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
  const [comment, setReviewText] = useState('');
  const [rating, setRating] = useState(0); 
  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value)); 
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim() || rating === 0) {
      alert("Vui lòng nhập đánh giá và chọn số sao.");
      return;
    }

    const reviewData = {
      productId: id, 
      // userId: 16,
      rating, 
      comment, 
    };

    dispatch(addReview(reviewData)); 
     

    setReviewText("");
    setRating(0);
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
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                {currentImage ? (
                  <Link className="rounded-4">
                    <img
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100vh",
                        margin: "auto",
                      }}
                      className="rounded-4 fit"
                      src={currentImage}
                    />
                  </Link>
                ) : (
                  <p>Không có hình ảnh nào cho sản phẩm này.</p>
                )}
              </div>
              <div className="d-flex justify-content-center mb-3">
                {Array.isArray(productState.units.images) && productState.units.images.length > 0 ? (
                  productState.units.images.slice(0, 5).map((item, index) => (
                    <Link
                      className="border mx-1 rounded-2 item-thumb"
                      key={index}
                      onClick={() => handleThumbnailClick(item.product_img)}
                      href={item.product_img}
                    >
                      <img
                        width="60"
                        height="60"
                        className="rounded-2"
                        src={item.product_img}
                        alt={`Product Thumbnail ${index + 1}`}
                      />
                    </Link>
                  ))
                ) : (
                  <p>Không có hình ảnh nào cho sản phẩm này.</p>
                )}
              </div>
            </aside>

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
                    <p className="stext-102 text-justify">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="p-t-33">
                  {productState.units && Array.isArray(productState.units.options) && productState.units.options.map((options) => (
                    // item.option_name
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">
                        {options.option_name}
                      </div>
                      <div className="size-204 respon6-next">
                        <select className="form-select form-select-sm" name="time">
                          <option>Chọn {options.option_name}</option>
                          {options.option_values && options.option_values.map((values) => (
                            <option key={values.id} value={values.id}>
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

          <div className="container mt-5">
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active text-dark fw"
                      id="description-tab"
                      data-bs-toggle="tab"
                      href="#description"
                      role="tab"
                      aria-controls="description"
                      aria-selected="true"
                    >
                      Mô tả sản phẩm
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark fw-bold"
                      id="reviews-tab"
                      data-bs-toggle="tab"
                      href="#reviews"
                      role="tab"
                      aria-controls="reviews"
                      aria-selected="false"
                    >
                      Đánh giá
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                <div className="tab-content">
                  {/* Tab Mô tả sản phẩm */}
                  <div
                    className="tab-pane fade show active"
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                  >
                    <p className="text-start">{product.description}</p>
                  </div>

                  {/* Tab Đánh giá */}
                  <div
                    className="tab-pane fade"
                    id="reviews"
                    role="tabpanel"
                    aria-labelledby="reviews-tab"
                  >
                    <div className="row">
                      <div className="col-lg-8 mx-auto">
                       
                        {Array.isArray(reviewsState.units) && reviewsState.units.length > 0 ? (
                          reviewsState.units.map((review) => {
                            if (review.status != 1) {
                              return (
                                <div className="d-flex align-items-start mb-4" key={review.id}>
                                  <img
                                    src={review.user_avatar || "../../asset/images/avatar.jpg"} 
                                    alt="AVATAR"
                                    className="rounded-circle me-3"
                                    width="60"
                                    height="60"
                                  />
                                  <div>
                                    <h6 className="fw-bold">{review.username}</h6>
                                    <p className="small mb-2">
                                      {Array.from({ length: 5 }, (_, index) => (
                                        <i
                                          key={index}
                                          className={`text-warning me-1 zmdi zmdi-star${index < review.rating ? "" : "-outline"}`}
                                        ></i>
                                      ))}
                                    </p>
                                    <p className="text-muted">{review.comment}</p>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })
                        ) : (
                          <p>Không có đánh giá nào.</p>
                        )}

                        <form onSubmit={handleReviewSubmit}>
                          <div className="mb-3">
                            <label htmlFor="review" className="form-label">
                              Đánh giá của bạn
                            </label>
                            <textarea
                              className="form-control"
                              id="review"
                              rows="4"
                              placeholder="Nhập đánh giá..."
                              value={comment}
                              onChange={handleReviewTextChange}
                            ></textarea>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Đánh giá sao</label>
                            <select
                              className="form-select"
                              value={rating}
                              onChange={handleRatingChange}
                            >
                              <option value={0}>Chọn sao</option>
                              <option value={1}>1 Sao</option>
                              <option value={2}>2 Sao</option>
                              <option value={3}>3 Sao</option>
                              <option value={4}>4 Sao</option>
                              <option value={5}>5 Sao</option>
                            </select>
                          </div>

                          <div className="text-end">
                            <button type="submit" className="btn btn-dark ">
                              Gửi đánh giá
                            </button>
                          </div>
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
              {Array.isArray(relatedProductsState.relatedProducts) && relatedProductsState.relatedProducts.length > 0 ? (
                relatedProductsState.relatedProducts.map((relatedProduct) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35" key={relatedProduct.id}>
                    <div className="block2">
                      <div className="block2-pic hov-img0 position-relative">
                        <img
                          src={relatedProduct.img || ""}
                          alt={relatedProduct.product_name || "Product Image"}
                          className="img-fluid"
                        />
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
                            to={`/product/${relatedProduct.id}`}
                            className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                          >
                            {relatedProduct.product_name || "Tên sản phẩm"}
                          </Link>
                          <span className="stext-105 cl3">
                            {relatedProduct.price ? formatPrice(relatedProduct.price) : "Liên hệ"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">Không có sản phẩm liên quan.</p>
              )}


            </div>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}

export default Productdetail;
