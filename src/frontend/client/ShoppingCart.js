import Header from "./layout/Header";
import Footer from "./layout/Footer";

function ShoppingCart() {
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
                    <tr class="table_head">
                      <th class="column-1">Sản phẩm</th>
                      <th class="column-2"></th>
                      <th class="column-3">Giá</th>
                      <th class="column-4">Số lượng</th>
                      <th class="column-5">Tổng cộng</th>
                    </tr>

                    <tr class="table_row">
                      <td class="column-1">
                        <div class="how-itemcart1">
                          <img
                            src="../../asset/images/item-cart-04.jpg"
                            alt="IMG"
                          />
                        </div>
                      </td>
                      <td class="column-2">Fresh Strawberries</td>
                      <td class="column-3">$ 36.00</td>
                      <td class="column-4">
                        <div class="wrap-num-product flex-w m-l-auto m-r-0">
                          <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                            <i class="fs-16 zmdi zmdi-minus"></i>
                          </div>

                          <input
                            class="mtext-104 cl3 txt-center num-product"
                            type="number"
                            name="num-product1"
                            value="1"
                          />

                          <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                            <i class="fs-16 zmdi zmdi-plus"></i>
                          </div>
                        </div>
                      </td>
                      <td class="column-5">$ 36.00</td>
                    </tr>

                    <tr class="table_row">
                      <td class="column-1">
                        <div class="how-itemcart1">
                          <img
                            src="../../asset/images/item-cart-05.jpg"
                            alt="IMG"
                          />
                        </div>
                      </td>
                      <td class="column-2">Lightweight Jacket</td>
                      <td class="column-3">$ 16.00</td>
                      <td class="column-4">
                        <div class="wrap-num-product flex-w m-l-auto m-r-0">
                          <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                            <i class="fs-16 zmdi zmdi-minus"></i>
                          </div>

                          <input
                            class="mtext-104 cl3 txt-center num-product"
                            type="number"
                            name="num-product2"
                            value="1"
                          />

                          <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                            <i class="fs-16 zmdi zmdi-plus"></i>
                          </div>
                        </div>
                      </td>
                      <td class="column-5">$ 16.00</td>
                    </tr>
                  </table>
                </div>

                <div class="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                  <div class="flex-w flex-m m-r-20 m-tb-5">
                    <input
                      class="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5"
                      type="text"
                      name="coupon"
                      placeholder="Mã giảm giá"
                    />
                    <div class="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                      {" "}
                      Áp dụng
                    </div>
                  </div>
                  <div class="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10">
                    Cập nhật giỏ hàng
                  </div>
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
                    <span class="mtext-110 cl2">$79.65</span>
                  </div>
                </div>

                <div class="flex-w flex-t p-t-27 p-b-33">
                  <div class="size-208">
                    <span class="mtext-101 cl2">Tổng cộng:</span>
                  </div>

                  <div class="size-209 p-t-1">
                    <span class="mtext-110 cl2">$79.65</span>
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
