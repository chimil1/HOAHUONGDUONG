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
import PayMent from "./frontend/client/PayMentOrder";
import VNPayReturn from "./frontend/client/VNPayReturn";

import Loading from "./frontend/client/layout/Loading"
import ProtectedRoute from "./frontend/admin/ProtectedRoute";
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
          <Route path="/payment" element={<PayMent />} />
          <Route path="/vnpay-return" element={<VNPayReturn />} />
          {/* Các Route cho admin */}
          <Route path="/admin" element={<LoginForm />} />
          <Route path="/thongke" element={<ProtectedRoute><ThongKe /></ ProtectedRoute>} />
          <Route path="/review" element={<ProtectedRoute><Review /></ ProtectedRoute>} />
          <Route path="/qldanhmuc" element={<ProtectedRoute><QlDanhMuc /></ ProtectedRoute>} />
          <Route path="/addcategory" element={<ProtectedRoute><AddCategory /></ ProtectedRoute>} />
          <Route path="/editcategory/:id" element={<ProtectedRoute><EditCategory /></ ProtectedRoute>} />
          <Route path="/editcoupon/:id" element={<ProtectedRoute><EditCoupon /></ ProtectedRoute>} />
          <Route path="/qldanhsach" element={<ProtectedRoute><QlDanhSach /></ ProtectedRoute>} />
          <Route path="/qldonhang" element={<ProtectedRoute><QlDonHang /></ ProtectedRoute>} />
          <Route path="/qldonhang/:id" element={<ProtectedRoute><QlDonHang /></ ProtectedRoute>} />
          <Route path="/qlkhachhang" element={<ProtectedRoute><QlKhachHang /></ ProtectedRoute>} />
          <Route path="/qlsanpham" element={<ProtectedRoute><QlSanPham /></ ProtectedRoute>} />
          <Route path="/productdetail" element={<ProtectedRoute><ProductDetails /></ ProtectedRoute>} />
          <Route path="/productdetail/:id" element={<ProtectedRoute><ProductDetails /></ ProtectedRoute>} />
          <Route path="/orderdetails/:id" element={<ProtectedRoute><OrderDetails /></ ProtectedRoute>} />
          <Route path="/orderdetails" element={<ProtectedRoute><OrderDetails /></ ProtectedRoute>} />
          <Route path="/details/:id" element={<ProtectedRoute><OrderManagement /></ ProtectedRoute>} />
          <Route path="/addproduct" element={<ProtectedRoute><AddProduct /></ ProtectedRoute>} />
          <Route path="/coupon" element={<ProtectedRoute><Coupons /></ ProtectedRoute>} />
          <Route path="/Addcoupon" element={<ProtectedRoute><Addcoupon /></ ProtectedRoute>} />
          <Route path="/addproduct" element={<ProtectedRoute><AddProduct /></ ProtectedRoute>} />
          <Route path="/reviewdetail" element={<ProtectedRoute><ReviewDetail /></ ProtectedRoute>} />
          <Route path="/reviewdetail/:id" element={<ProtectedRoute><ReviewDetail /></ ProtectedRoute>} />
          <Route path="/editProduct/:id" element={<ProtectedRoute><EditProduct /></ ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
