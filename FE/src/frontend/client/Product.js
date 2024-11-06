import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Link } from "react-router-dom";
import '../Css/Product.css'
import axios from "axios";
import React, { useEffect, useState } from "react";

function Product() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const[product,setProduct]=useStata([]);
  useEffect(()=>{
    axios
        .get("http://localhost:8000/api/user")
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
  },[])
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
      <div>
        <Header />
        <div className="bg0 m-t-23 p-b-140">
          <div className="container">
            <div className="flex-w flex-sb-m p-b-52">
              <div className="flex-w flex-l-m filter-tope-group m-tb-10 btn-group">
                <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" data-filter="*">Tất cả
                </button>
                <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Quần
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Quần short</a>
                  <a className="dropdown-item" href="#">Quần dài</a>
                  <a className="dropdown-item" href="#">Quần Jeans</a>
                </div>
                <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Áo
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Áo thun</a>
                  <a className="dropdown-item" href="#">Áo sơ mi</a>
                </div>
                <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Giày
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Giày thể thao</a>
                  <a className="dropdown-item" href="#">Giày saldal</a>
                  <a className="dropdown-item" href="#">Giày da</a>
                </div>
                <button type="button" className="dropdown-toggle stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phụ kiện
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Đồng hồ</a>
                  <a className="dropdown-item" href="#">Nhẫn</a>
                  <a className="dropdown-item" href="#">Dây chuyền</a>
                  <a className="dropdown-item" href="#">Vòng tay</a>
                </div>
              </div>
            </div>

            <div className="row isotope-grid">
              <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                <div className="block2">
                  <div className="block2-pic hov-img0">
                    <img src="../../asset/images/product-01.jpg" alt="IMG-PRODUCT"/>
                    <Link to="/productdetail"
                          className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                      Xem
                    </Link>
                  </div>
                  <div className="block2-txt flex-w flex-t p-t-14">
                    <div className="block2-txt-child1 flex-col-l">
                      <Link to="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">Esprit Ruffle Shirt</Link>
                      <span className="stext-105 cl3">160.000đ</span>
                    </div>
                    <div className="block2-txt-child2 flex-r p-t-3">
                      <Link to="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                        <img className="icon-heart1 dis-block trans-04" src="../../asset/images/icons/icon-heart-01.png" alt="ICON"/>
                        <img className="icon-heart2 dis-block trans-04 ab-t-l" src="../../asset/images/icons/icon-heart-02.png" alt="ICON"/>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-c-m flex-w w-full p-t-45">
              <Link to="#" className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">Xem thêm</Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
  );
}

export default Product;
