import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { CartItem, removeFromCart } from "../actions/unitActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
function ShoppingCart() {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.unit);
  //format giá sản phẩm
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    dispatch(CartItem());
  }, [dispatch]);
  useEffect(() => {
    if (!cartitems.units || cartitems.units.length === 0) {
      dispatch(CartItem()); // Gọi lại sản phẩm nếu giỏ hàng trống
    }
  }, [dispatch, cartitems.units]);
  
  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    Swal.fire({
      icon: "success",
      title: "Xóa sản phẩm thành công!",
      showConfirmButton: false,
      timer: 500
    });
  };
  const units = Array.isArray(cartitems.units) ? cartitems.units : [];
  const cartTotal =units.reduce(
    (total, item) =>
      total +
      (item.product && item.product.price
        ? item.product.price * item.quantity
        : 0),
    0
  );


  console.log("CartItem:", cartitems.units);

  if (cartitems.loading) {
    return <p>Loading...</p>;
  }

  if (cartitems.error) {
    return <p>Error: {cartitems.error}</p>;
  }
  return (
    <div>
      <Header></Header>
      <div class="container">
        <div class="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <a href="index.html" class="stext-109 cl8 hov-cl1 trans-04">
            Trang chủ
            <i class="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
          </a>

          <span class="stext-109 cl4">Giỏ hàng</span>
        </div>
      </div>

      <form class="bg0 p-t-75 p-b-85">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div class="m-l-25 m-r--38 m-lr-0-xl">
                <div class="wrap-table-shopping-cart">
                  <table class="table-shopping-cart">
                    <thead>
                      <tr class="table_head">
                        <th class="column-1">Sản phẩm</th>
                        <th class="column-2"></th>
                        <th class="column-3">Giá</th>
                        <th class="column-4">Số lượng</th>
                        <th class="column-5">Tổng cộng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {units.length === 0 ? (
                        <p>Giỏ hàng trống.</p>
                      ) : ( units.map((item) =>
                        item.product ? (
                          <tr class="table_row" key={item.product.id}>
                            <td class="column-1">
                              <button
                                class="how-itemcart1"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <img
                                  src="../../asset/images/item-cart-04.jpg"
                                  alt="IMG"
                                />
                              </button>
                            </td>
                            <td class="column-2">
                              {item.product.product_name}
                            </td>
                            <td class="column-3">
                              {formatCurrency(item.product.price)}
                            </td>
                            <td class="column-4">
                              <div class="wrap-num-product flex-w m-l-auto m-r-0">
                                <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                  <i class="fs-16 zmdi zmdi-minus"></i>
                                </div>

                                <input
                                  class="mtext-104 cl3 txt-center num-product"
                                  type="number"
                                  name="num-product1"
                                  value={item.quantity}
                                />

                                <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                  <i class="fs-16 zmdi zmdi-plus"></i>
                                </div>
                              </div>
                            </td>
                            <td class="column-5">
                              {" "}
                              {formatCurrency(
                                item.product.price * item.quantity
                              )}
                            </td>
                          </tr>
                        ) : (
                          <tr key={item.id}>
                            <td colSpan="5">
                              Sản phẩm không hợp lệ hoặc đã bị xóa.
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div class="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 class="mtext-109 cl2 p-b-30">Tổng giỏ hàng</h4>

                <div class="flex-w flex-t bor12 p-b-13">
                  <div class="size-208">
                    <span class="stext-110 cl2">Tổng phụ:</span>
                  </div>

                  <div class="size-209">
                    <span class="mtext-110 cl2">
                      {formatCurrency(cartTotal)}
                    </span>
                  </div>
                </div>

                <div class="flex-w flex-t p-t-27 p-b-33">
                  <div class="size-208">
                    <span class="mtext-101 cl2">Tổng cộng:</span>
                  </div>

                  <div class="size-209 p-t-1">
                    <span class="mtext-110 cl2">
                      {formatCurrency(cartTotal)}
                    </span>
                  </div>
                </div>

                <button class="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer></Footer>
    </div>
  );
}
export default ShoppingCart;
