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
  const initialImage =
      Array.isArray(productState.units?.images) &&
      productState.units.images.length > 0
          ? productState.units.images[0].product_img
          : "";
  const [currentImage, setCurrentImage] = useState(initialImage);
  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ" : "Liên hệ";
  };


  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (
        Array.isArray(productState.units?.images) &&
        productState.units.images.length > 0
    ) {
      setCurrentImage(productState.units.images[0].product_img);
    }
  }, [productState]);

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

  if (!product) {
    return <p>Không có dữ liệu sản phẩm.</p>;
  }

  if (productState.loading) {
    return <p>Loading...</p>;
  }

  if (productState.error) {
    return <p>Lỗi: {productState.error}</p>;
  }

  return (
      <div>
        <Header />
        <hr />
        <div className="container">
          <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
            <Link to="/Home" className="stext-109 cl8 hov-cl1 trans-04">
              Home
              <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
            </Link>

            <Link to="/Product" className="stext-109 cl8 hov-cl1 trans-04">
              Men
              <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
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
                    <div className="wrap-slick3-arrows flex-sb-m flex-w" />
                    <div className="slick3 gallery-lb">
                      <div className="gallery-container">
                        {/* Hình ảnh lớn */}
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
                          {Array.isArray(productState.units?.images) &&
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
                    {product.options && product.options.length > 0 ? (
                        product.options.map((options) => (
                            <div className="flex-w flex-r-m p-b-10" key={options.option_name}>
                              <div className="size-203 flex-c-m respon6">
                                {options.option_name}
                              </div>
                              <div className="size-204 respon6-next">
                                <select className="form-select form-select-sm" name="time">
                                  <option>Chọn {options.option_name}</option>
                                  {options.option_values.map((values) => (
                                      <option value={values.id} key={values.id}>
                                        {values.value_name}
                                      </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có tuỳ chọn cho sản phẩm này.</p>
                    )}

                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">Số lượng</div>
                      <div className="size-204 flex-w flex-m respon6-next">
                        <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                          <div
                              className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                              onClick={handleDecrease}
                          >
                            <i className="fs-16 zmdi zmdi-minus" />
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
                            <i className="fs-16 zmdi zmdi-plus" />
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
          </div>
        </section>

        <Footer />
      </div>
  );
}

export default Productdetail;
