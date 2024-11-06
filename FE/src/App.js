import { BrowserRouter, Routes, Route } from "react-router-dom";

import ThongKe from "./frontend/admin/ThongKe";
import CNDanhMuc from "./frontend/admin/CNDanhMuc";
import CNDonHang from "./frontend/admin/CNDonHang";
import CNSanPham from "./frontend/admin/CNSanPham";
import CNTaiKhoan from "./frontend/admin/CNTaiKhoan";
import DanhGia from "./frontend/admin/DanhGia";
import QlDanhMuc from "./frontend/admin/QlDanhMuc";
import AddCategory from "./frontend/admin/AddCategory";
import EditCategory from "./frontend/admin/EditCategory";
import QlDanhSach from "./frontend/admin/QlDanhSach";
import QlDonHang from "./frontend/admin/QlDonHang";
import QlKhachHang from "./frontend/admin/QlKhachHang";
import QlSanPham from "./frontend/admin/QlSanPham";
import QlTaiKhoan from "./frontend/admin/QlTaiKhoan";
import OrderDetails from "./frontend/admin/OrderDetails";
import AddProduct from "./frontend/admin/AddProduct";


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
import Register from "./frontend/client/auth/Register"
import OrderDetail from "./frontend/admin/orderDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          {/* Các Route cho client */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productdetail" element={<Productdetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path='/profile' element={<Profile />}/>
          <Route path="/login" element={<Login />} />
          <Route path='/register'  element={<Register />}/>
          <Route path='/forgotpassword'  element={<ForgotPassword />}/>
          <Route path='/confirmpassword'  element={<ConfirmPassword />}/>

          {/* Các Route cho admin */}
          <Route path="/admin" element={<ThongKe />} />
          <Route path="/thongke" element={<ThongKe />} />
          <Route path="/cndanhmuc" element={<CNDanhMuc />} />
          <Route path="/cndonhang" element={<CNDonHang />} />
          <Route path="/cnsanpham" element={<CNSanPham />} />
          <Route path="/cntaikhoan" element={<CNTaiKhoan />} />
          <Route path="/danhgia" element={<DanhGia />} />
          <Route path="/qldanhmuc" element={<QlDanhMuc />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/editcategory/:id" element={<EditCategory />} />
          <Route path="/qldanhsach" element={<QlDanhSach />} />
          <Route path="/qldonhang" element={<QlDonHang />} />
          <Route path="/qlkhachhang" element={<QlKhachHang />} />
          <Route path="/qlsanpham" element={<QlSanPham />} />
          <Route path="/qltaikhoan" element={<QlTaiKhoan />} />
          <Route path="/orderdetails" element={<OrderDetails />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/orderdetail/:id" element={<OrderDetail />} />
          <Route path="/orderdetail" element={<OrderDetail />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
