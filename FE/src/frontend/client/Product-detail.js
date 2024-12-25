import { useEffect, useState } from "react";
import {
  fetchProductDetails,
  fetchProductRandom,
  addToCart,
} from "../actions/unitActions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "./layout/Loading";
function Productdetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { handleSubmit } = useForm();
  const productState = useSelector((state) => state.unit);
  // Destructure randomProducts
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const token = localStorage.getItem("token");
  console.log("Token:", token); 
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };
  useEffect(() => {
    // Kiểm tra xem dữ liệu sản phẩm có sẵn trong Redux hay không
    if (!productState.units || !productState.units.id) {
      dispatch(fetchProductDetails(id)); // Gọi lại sản phẩm nếu chưa có
    }
  }, [dispatch, id, productState.units]);

  useEffect(() => {
    if (
        Array.isArray(productState.units.images) &&
        productState.units.images.length > 0
    ) {
      setCurrentImage(productState.units.images[0].product_img);
    }
  }, [productState]);

  const initialImage =
      Array.isArray(productState.units.images) &&
      productState.units.images.length > 0
          ? productState.units.images[0].product_img
          : "";
  const [currentImage, setCurrentImage] = useState(initialImage);

  const product = productState.units;

  const submit = () => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Bạn cần đăng nhập để thêm vào giỏ hàng",
        showConfirmButton: true,
        confirmButtonText: "Đăng nhập",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }
  
    const data = {
      product_id: product.id,
      quantity,
      options: selectedOptions, // Gửi các tùy chọn đã chọn
    };
  
    dispatch(addToCart(data));
    Swal.fire({
      icon: "success",
      title: "Thêm giỏ hàng thành công!",
      showConfirmButton: false,
      timer: 1200,
    });
  };
  
  

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
    return <p><Loading></Loading></p>;
  }

  if (productState.error) {
    return <p>Lỗi: {productState.error}</p>;
  }

  if (!product || !productState.units || !productState.units.images) {
    return <p>Không có dữ liệu sản phẩm.</p>;
  }

  return (
      <div>
        <Header />
        <hr />
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

              <form className="col-md-6 col-lg-5 p-b-10">
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
                        <div
                            className="flex-w flex-r-m p-b-10"
                            key={options.option_name}
                        >
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
                    <button
                        className="btn btn-dark btn-lg m-2 rounded-pill"
                        type="submit"
                        onClick={handleSubmit(submit)}
                    >
                      Thêm vào giỏ
                    </button>

                    <button className="btn btn-dark btn-lg rounded-pill">
                      Mua hàng
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* Related Products Section */}
            {/** // <section className="sec-popular bg0 p-t-45 p-b-105">
             //   <div className="container">
             //     <div className="sec-title p-b-60">
             //       <h3 className="m-text5 t-center">Sản phẩm liên quan</h3>
             //     </div>
             //     // <div className="row">
             //     //   {randomProducts &&
             //     //     randomProducts.length > 0 &&
             //     //     randomProducts.map((item) => (
             //     //       <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 p-b-35">
             //     //         <div className="block2">
             //     //           <div className="block2-pic hov-img0">
             //     //             <img
             //     //               src={item.product_img}
             //     //               alt="Sản phẩm ngẫu nhiên"
             //     //               className="img-fluid"
             //     //             />
             //     //           </div>
             //     //           <div className="block2-txt">
             //     //             <a href="#" className="block2-name">
             //     //               {item.product_name}
             //     //             </a>
             //     //             <span className="block2-price">
             //     //               {formatPrice(item.price)}
             //     //             </span>
             //     //           </div>
             //     //         </div>
             //     //       </div>
             //     //     ))}
             //     // </div>
             //   </div>
             // </section>*/}
          </div>
        </section>
        <Footer />
      </div>
  );
}

export default Productdetail;
