import { Link } from "react-router-dom";
import Header from "./layout/Header";
import Slider from "./layout/Slider";
import Footer from "./layout/Footer";

function Home(){
    return(
        <div className="App">
            <Header></Header>
            <Slider></Slider>
            <section className="bg0 p-t-23 p-b-140">
            <div className="container">
              <div className="p-b-10">
                <h3 className="ltext-103 cl5">TỔNG QUAN SẢN PHẨM</h3>
              </div>
    
              <div className="row isotope-grid">
                {[
                  {
                    imgSrc: "../../asset/images/product-01.jpg",
                    title: "Esprit Ruffle Shirt",
                    price: "$16.64",
                  },
                  {
                    imgSrc: "../../asset/images/product-02.jpg",
                    title: "Herschel supply",
                    price: "$35.31",
                  },
                  {
                    imgSrc: "../../asset/images/product-03.jpg",
                    title: "Only Check Trouser",
                    price: "$25.50",
                  },
                  {
                    imgSrc: "../../asset/images/product-04.jpg",
                    title: "Classic Trench Coat",
                    price: "$75.00",
                  },
                  // Add more products as needed
                ].map((product, index) => (
                  <div
                    key={index}
                    className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item"
                  >
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src={product.imgSrc} alt="IMG-PRODUCT" />
                        <Link
                          to="/Productdetail"
                          className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                        >
                          Quick View
                        </Link>
                      </div>
    
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l">
                          <a
                            href="product-detail.html"
                            className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                          >
                            {product.title}
                          </a>
                          <span className="stext-105 cl3">{product.price}</span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <Link
                            to="#"
                            className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                          >
                            <img
                              className="icon-heart1 dis-block trans-04"
                              src="../../asset/images/icons/icon-heart-01.png"
                              alt="ICON"
                            />
                            <img
                              className="icon-heart2 dis-block trans-04 ab-t-l"
                              src="../../asset/images/icons/icon-heart-02.png"
                              alt="ICON"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
    
                {/* Load more button */}
                <div className="flex-c-m flex-w w-full p-t-45">
                  <Link
                    to="#"
                    className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
                  >
                    Xem thêm
                  </Link>
                </div>
              </div>
            </div>
          </section>
            <Footer></Footer>
        </div>
    )
}
export default Home;