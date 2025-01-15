import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { CartItem, removeFromCart, fetchCoupons,updateCartQuantity,fetchCategory } from "../actions/unitActions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate,Link} from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "./layout/Loading";
import "./voucher.css";

function ShoppingCart() {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart);
  const coupons = useSelector((state) => state.unit);
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  //format giá sản phẩm
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };




  useEffect(() => {
    dispatch(CartItem());
    dispatch(fetchCategory());
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleApplyCoupon = () => {
    if (selectedCoupon) {
      Swal.fire({
        icon: "success",
        title: `Áp dụng mã ${selectedCoupon.name_coupon} thành công!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Vui lòng chọn mã giảm giá!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const units = Array.isArray(cartitems.units) ? cartitems.units : [];

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const selectedUnits = units.filter((item) => selectedItems.includes(item.id));

  const selectedCartTotal = selectedUnits.reduce(
    (total, item) =>
      total +
      (item.product && item.product.price
        ? item.product.price * (quantities[item.product.id] || item.quantity)
        : 0),
    0
  );

  const selectedDiscount = selectedCoupon
    ? (selectedCartTotal * selectedCoupon.discount_value) / 100
    : 0;

  const selectedTotalWithDiscount = selectedCartTotal - selectedDiscount;

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id)); // Gọi action để xóa sản phẩm
    Swal.fire({
      icon: "success",
      title: "Xóa sản phẩm thành công!",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(CartItem());
    dispatch(fetchCoupons());
  };

  const payment = () => {
    if (selectedItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Vui lòng chọn ít nhất một sản phẩm để thanh toán!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    // Lấy danh sách sản phẩm được checkbox
    const selectedProducts = units.filter((item) =>
      selectedItems.includes(item.id)
    );


    // Điều hướng sang trang thanh toán và gửi dữ liệu
    navigate("/payment", {
      state: { selectedProducts ,selectedTotalWithDiscount},
    });
  };


  
  const handleQuantityChange = async (id, newQuantity) => {
    try {
      // Kiểm tra sản phẩm có tồn tại trong giỏ hàng trước khi cập nhật
      const item = units.find((item) => item.id === id);
      if (!item) {
        throw new Error("Item not found");
      }
      // Gọi action để cập nhật số lượng
      await dispatch(updateCartQuantity(id, newQuantity));
      // Cập nhật lại state số lượng
      setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
      // Không hiển thị thông báo thành công
    } catch (error) {
      // Không hiển thị thông báo lỗi nữa, chỉ để lỗi
      console.error("Cập nhật thất bại:", error.message || "Vui lòng thử lại.");
    }
  };
  
  const handleIncrease = (id) => {
    const currentQuantity = quantities[id] || 1;
    const newQuantity = currentQuantity + 1;
    handleQuantityChange(id, newQuantity);
  };
  
  const handleDecrease = (id) => {
    const currentQuantity = quantities[id] || 1;
    const newQuantity = Math.max(currentQuantity - 1, 1);
    handleQuantityChange(id, newQuantity);
  };
  
  

  
  // Tổng số sản phẩm trong giỏ hàng
const totalItemsInCart = units.reduce((total, item) => total + item.quantity, 0);
  console.log("CartItem:", cartitems.units);

  if (cartitems.loading || coupons.loading) {
    return (
      <p>
        <Loading></Loading>
      </p>
    );
  }
  if (cartitems.error) {
    return <p>Error: {cartitems.error}</p>;
  }

  if (coupons.error) {
    return <p>Lỗi: {coupons.error}</p>;
  }
  return (
    <div>
      <Header></Header>

      <form class="bg0 p-t-75 p-b-85">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 col-xl-8 m-lr-auto m-b-50">
              <div class="m-l-25 m-r--38 m-lr-0-xl">
                <div class="wrap-table-shopping-cart">
                  <table class="table-shopping-cart">
                    <thead>
                      <tr style={{height:'50px'}}>
                        <th colSpan="100%">
                          <p class="text-left fw-bold m-2">
                          Bạn đang có {totalItemsInCart} sản phẩm trong giỏ hàng
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {units.length === 0 && (
                        <tr>
                          <td
                            colSpan="100%"
                            style={{
                              textAlign: "center",
                              padding: "20px",
                              boxSizing: "border-box",
                              fontSize: "18px",
                              // fontWeight: "bold",
                              color: "#333",
                            }}
                          >
                            <p style={{fontSize:'50px'}}><i class="fa fa-shopping-cart"></i></p>
                            <p style={{fontSize:'15px', margin:'10px'}}>Không có sản phẩm nào trong giỏ hàng.</p>
                            <button className="btn btn-dark" onClick={() => navigate('/product')}>
                            <i class="fa fa-reply"></i> Tiếp tục mua hàng
                          </button>
                          </td>
                        </tr>
                      )}
                      {units.map((item) =>
                        item.product ? (
                          <tr class="table_row" key={item.product.id}>
                              <td className="column-1 ">
                                <input
                                  type="checkbox"
                                  style={{ width: "15px", height: "15px" }}
                                  checked={selectedItems.includes(item.id)}
                                  onChange={() => handleCheckboxChange(item.id)}
                                />
                              </td>
                            
                            <td class="column-1">
                              <Link 
                               style={{width:'100px', height:'100px'}}
                                to={`/Product/${item.product.id}`}
                              >
                                <img
                                  src="../../asset/images/item-cart-04.jpg"
                                  alt="IMG"
                                />
                              </Link >
                            </td>
                            <td class="column-2">
                            <Link to={`/Product/${item.product.id}`}>
                              {truncateText(item.product.product_name, 20)}
                              </Link>
                            </td>
                            <td class="column-3">
                            <div className="flex-w flex-r-m p-b-5">
                              <form className="wrap-num-product flex-w m-r-10 m-tb-5">
                                <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                onClick={() => handleDecrease(item.id)}>
                                  <i className="fs-20 zmdi zmdi-minus"></i>
                                </div>

                                <input
                                  className="mtext-104 cl3 txt-center num-product"
                                  type="number"
                                  id="quantity"
                                  name="quantity"
                                  value={quantities[item.product.id] || item.quantity}
                                  
                                />
                                <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                onClick={() => handleIncrease(item.id)}>
                                  <i className="fs-20 zmdi zmdi-plus"></i>
                                </div>
                              </form>
                            </div>
                          </td>
                            <td class="column-4">
                              {formatCurrency(item.product.price)}
                            </td>
                          
                            <td class="column-5">
                              Tổng giá:{" "}
                              <p style={{ color: "red" }}>
                                {" "}
                                {formatCurrency(
                                  item.product.price * (quantities[item.product.id] || item.quantity)
                                )}
                              </p>
                              <p style={{textAlign:'center'}}> <button  onClick={() => handleRemoveItem(item.id)}> <i class="fa fa-trash-o"></i></button></p>
                             
                            </td>

                          </tr>
                        ) : (
                          <tr key={item.id}>
                            <td colSpan="5">
                              Sản phẩm không hợp lệ hoặc đã bị xóa.
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                {units.length !== 0 && (
                  <div class="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                    <button
                      type="button"
                      class="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5"
                      data-bs-toggle="modal"
                      data-bs-target="#applyDiscountModal"
                    >
                      Áp dụng mã giảm giá
                    </button>

                    <div
                      class="modal fade"
                      id="applyDiscountModal"
                      tabindex="-1"
                      aria-labelledby="applyDiscountModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5
                              class="modal-title"
                              id="applyDiscountModalLabel"
                            >
                              Chọn mã giảm giá
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>

                          <div className="modal-body">
                            {Array.isArray(coupons.units) &&
                              coupons.units
                                .filter((item) => {
                                  // Kiểm tra tồn tại của các thuộc tính cần thiết
                                  if (!item.start_date || !item.end_date) {
                                    console.warn(
                                      "Voucher thiếu ngày bắt đầu hoặc kết thúc:",
                                      item
                                    );
                                    return false;
                                  }

                                  const now = new Date();
                                  const startDate = new Date(
                                    item.start_date.replace(" ", "T")
                                  );
                                  const expiryDate = new Date(
                                    item.end_date.replace(" ", "T")
                                  );

                                  return now >= startDate && now <= expiryDate; // Chỉ hiển thị các mã còn hạn sử dụng
                                })
                                .map((item) => (
                                  <div className="form-check" key={item.id}>
                                    <input
                                      type="checkbox"
                                      id={`discount_${item.id}`}
                                      name="discount"
                                      className="form-check-input"
                                      disabled={
                                        item.minium_order_value >
                                        selectedCartTotal
                                      }
                                      checked={selectedCoupon?.id === item.id}
                                      onChange={(e) =>
                                        setSelectedCoupon(
                                          e.target.checked ? item : null
                                        )
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`discount_${item.id}`}
                                    >
                                      <div className="font-weight-bold">
                                        {item.name_coupon}
                                      </div>
                                      <div>
                                        Giảm {item.discount_value}% trên tổng
                                        đơn hàng
                                      </div>
                                      <div>
                                        {item.minium_order_value >
                                          selectedCartTotal ? (
                                          <p style={{ color: "red" }}>
                                            Đơn hàng chưa đạt giá trị tối thiểu{" "}
                                            {formatCurrency(
                                              item.minium_order_value
                                            )}
                                          </p>
                                        ) : (
                                          <p style={{ color: "green" }}>
                                            Bạn đủ điều kiện áp dụng mã giảm
                                            giá!
                                          </p>
                                        )}
                                      </div>
                                    </label>
                                  </div>
                                ))}
                          </div>

                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                              onClick={() => setSelectedCoupon(null)} // Hủy chọn mã giảm giá
                            >
                              Hủy
                            </button>
                            <button
                              type="button"
                              class="btn btn-outline-dark"
                              onClick={handleApplyCoupon}
                              data-bs-dismiss="modal"
                            >
                              Áp dụng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div class="col-sm-10 col-lg-7 col-xl-4 m-lr-auto m-b-50">
              <div class="bor10 m-l-20 m-lr-0-xl m-r-40 p-3">
                <h4 class="mtext-109 cl2 p-b-30">Tổng giỏ hàng</h4>

                <div class="flex-w flex-t bor12 p-b-13">
                  <div class="size-208">
                    <span class="stext-110 cl2">Tổng cộng:</span>
                  </div>

                  <div class="size-209">
                    <span class="mtext-110 cl2">
                      {formatCurrency(selectedCartTotal)}
                    </span>
                  </div>
                </div>

                <div class="flex-w flex-t p-t-27 p-b-33">
                  <div class="size-208">
                    <span class="mtext-101 cl2">Thành tiền:</span>
                  </div>

                  <div class="size-209 p-t-1">
                    <span class="mtext-110 cl2">
                      {formatCurrency(selectedTotalWithDiscount)}
                    </span>
                  </div>
                </div>
                {selectedItems.length > 0 && (
                  <button
                    className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                    type="submit"
                    onClick={payment}
                  >
                    Thanh toán
                  </button>
                )}
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
