import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThongKe from "./frontend/admin/ThongKe";
import CNDanhMuc from "./frontend/admin/CNDanhMuc";
import CNDonHang from "./frontend/admin/CNDonHang";
import CNNhanVien from "./frontend/admin/CNNhanVien";
import CNSanPham from "./frontend/admin/CNSanPham";
import CNTaiKhoan from "./frontend/admin/CNTaiKhoan";
import DanhGia from "./frontend/admin/DanhGia";
import QlDanhMuc from "./frontend/admin/QlDanhMuc";
import QlDanhSach from "./frontend/admin/QlDanhSach";
import QlDonHang from "./frontend/admin/QlDonHang";
import QlKhachHang from "./frontend/admin/QlKhachHang";
import QlNhanVien from "./frontend/admin/QlNhanVien";
import QlSanPham from "./frontend/admin/QlSanPham";
import QlTaiKhoan from "./frontend/admin/QlTaiKhoan";
import AddCategory from "./frontend/admin/AddCategory";
import AddPersonnel from "./frontend/admin/AddPersonnel";
import AddProduct from "./frontend/admin/AddProduct";
import Home from "./frontend/client/Home";
import Product from "./frontend/client/Product";
import About from "./frontend/client/About";
import Contact from "./frontend/client/Contact";
import LoginForm from "./frontend/admin/LoginForm";

import Productdetail from "./frontend/client/Productdetail";
import Blog from "./frontend/client/Blog";
import ShoppingCart from "./frontend/client/ShoppingCart";
import Login from "./frontend/client/auth/Login";
import Register from "./frontend/client/auth/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          {/* Các Route cho client */}
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productdetail" element={<Productdetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Các Route cho admin */}
          <Route path="/" element={<ThongKe />} />
          <Route path="/thongke" element={<ThongKe />} />
          <Route path="/cndanhmuc" element={<CNDanhMuc />} />
          <Route path="/cndonhang" element={<CNDonHang />} />
          <Route path="/cnnhanvien" element={<CNNhanVien />} />
          <Route path="/cnsanpham" element={<CNSanPham />} />
          <Route path="/cntaikhoan" element={<CNTaiKhoan />} />
          <Route path="/danhgia" element={<DanhGia />} />
          <Route path="/qldanhmuc" element={<QlDanhMuc />} />
          <Route path="/qldanhsach" element={<QlDanhSach />} />
          <Route path="/qldonhang" element={<QlDonHang />} />
          <Route path="/qlkhachhang" element={<QlKhachHang />} />
          <Route path="/qlnhanvien" element={<QlNhanVien />} />
          <Route path="/qlsanpham" element={<QlSanPham />} />
          <Route path="/qltaikhoan" element={<QlTaiKhoan />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/addpersonnel" element={<AddPersonnel />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
