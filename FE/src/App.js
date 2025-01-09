import { BrowserRouter, Routes, Route } from "react-router-dom";

import ThongKe from "./frontend/admin/ThongKe";
import QlDanhMuc from "./frontend/admin/QlDanhMuc";
import EditCategory from "./frontend/admin/EditCategory";
import QlDanhSach from "./frontend/admin/QlDanhSach";
import QlDonHang from "./frontend/admin/QlDonHang";
import QlKhachHang from "./frontend/admin/QlKhachHang";
import QlSanPham from "./frontend/admin/QlSanPham";
import OrderDetails from "./frontend/admin/orderDetail";
import EditProduct from "./frontend/admin/EditProduct";
import AddProduct from "./frontend/admin/AddProduct";
import ProductDetails from "./frontend/admin/ProductDetails";
import ReviewDetail from "./frontend/admin/ReviewDetails";
import Coupons from "./frontend/admin/Coupons";
import Review from "./frontend/admin/Review";
import Addcoupon from "./frontend/admin/Addcoupon";
import EditCoupon from "./frontend/admin/EditCoupon";
import AddCategory from "./frontend/admin/AddCategory";
import OrderManagement from "./frontend/admin/OrderManagement";
import Editshipping from "./frontend/client/editShipping";
import OrderClient from "./frontend/client/OrderClient";
import OrderDetailClient from"./frontend/client/OrderDetailClient";
import Home from "./frontend/client/Home";
import Product from "./frontend/client/Product";
import About from "./frontend/client/About";
import Contact from "./frontend/client/Contact";
import LoginForm from "./frontend/admin/LoginForm";
import Productdetail from "./frontend/client/Product-detail";
import Blog from "./frontend/client/Blog";
import ShoppingCart from "./frontend/client/ShoppingCart";
import Profile from "./frontend/client/Profile";
import Login from "./frontend/client/auth/Login";
import Register from "./frontend/client/auth/Register";
import ForgotPassword from "./frontend/client/auth/ForgotPassword";
import ConfirmPassword from "./frontend/client/auth/ComfirmPassword";
import Cart from "./frontend/client/ShoppingCart";
import ListAddress from "./frontend/client/ShippingList";
import PayMent from "./frontend/client/cart";
import Loading from "./frontend/client/layout/Loading"
function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          {/* Các Route cho client */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<Productdetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/Loading" element={<Loading />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ConfirmPassword />} />
          <Route path="/listaddress" element={<ListAddress />} />
          <Route path="/editshipping/:id" element={<Editshipping />} />
          <Route path="/listaddress/:id" element={<ListAddress />} />
          <Route path="/orderuser" element={< OrderClient/>} />
          <Route path="/orderuser/:id" element={< OrderClient/>} />
          <Route path="/orderdetailclient/:id" element={< OrderDetailClient/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ConfirmPassword />} />
          <Route path="/listaddress" element={<ListAddress />} />
          <Route path="/cart" element={<Cart />} />
          {/* Các Route cho admin */}
          <Route path="/admin" element={<LoginForm />} />
          <Route path="/thongke" element={<ThongKe />} />
          <Route path="/review" element={<Review />} />
          <Route path="/qldanhmuc" element={<QlDanhMuc />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/editcategory/:id" element={<EditCategory />} />
          <Route path="/editcoupon/:id" element={<EditCoupon />} />
          <Route path="/qldanhsach" element={<QlDanhSach />} />
          <Route path="/qldonhang" element={<QlDonHang />} />
          <Route path="/qldonhang/:id" element={<QlDonHang />} />
          <Route path="/qlkhachhang" element={<QlKhachHang />} />
          <Route path="/qlsanpham" element={<QlSanPham />} />
          <Route path="/productdetail" element={<ProductDetails />} />
          <Route path="/productdetail/:id" element={<ProductDetails />} />
          <Route path="/orderdetails/:id" element={<OrderDetails />} />
          <Route path="/orderdetails" element={<OrderDetails />} />
          <Route path="/details/:id" element={<OrderManagement />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/coupon" element={<Coupons />} />
          <Route path="/Addcoupon" element={<Addcoupon />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/reviewdetail" element={<ReviewDetail />} />
          <Route path="/reviewdetail/:id" element={<ReviewDetail />} />
          <Route path="/home" element={<Home />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="/payment" element={<PayMent />} />
          {/* <Route path="/admin/login" element={<LoginForm />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
