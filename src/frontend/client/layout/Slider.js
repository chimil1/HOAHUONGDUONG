import React from "react";
import { Link } from "react-router-dom";

function SliderComponent() {
  return (
    <div>
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">

        <div className="carousel-inner">
          <div className="carousel-item active position-relative">
            <div className="container h-full position-absolute top-50 start-50 translate-middle">
              <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                <div
                  className="layer-slick1 animated visible-true"
                  data-appear="fadeInDown"
                >
                  <span className="ltext-101 cl2 respon2">
                    Women Collection 2018
                  </span>
                </div>
                <div
                  className="layer-slick1 animated visible-true"
                  data-appear="fadeInUp"
                  data-delay="800"
                >
                  <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                    NEW SEASON
                  </h2>
                </div>
                <div
                  className="layer-slick1 animated visible-true"
                  data-appear="zoomIn"
                  data-delay="1600"
                >
                  <Link to="/product" className="bg1">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            <img
              className="d-block w-100"
              src="../../asset/images/slide-01.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item position-relative">
          <div className="container h-full position-absolute top-50 start-50 translate-middle">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <div
                    className="layer-slick1 animated visible-true"
                    data-appear="rollIn"
                  >
                    <span className="ltext-101 cl2 respon2">
                      Men New-Season
                    </span>
                  </div>
                  <div
                    className="layer-slick1 animated visible-true"
                    data-appear="lightSpeedIn"
                    data-delay="800"
                  >
                    <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                      Jackets & Coats
                    </h2>
                  </div>
                  <div
                    className="layer-slick1 animated visible-true"
                    data-appear="slideInUp"
                    data-delay="1600"
                  >
                    <Link to="/product" className="bg1">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            <img
              className="d-block w-100"
              src="../../asset/images/slide-02.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item position-relative">
          <div className="container h-full position-absolute top-50 start-50 translate-middle">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <div
                    className="layer-slick1 animated visible-true"
                    data-appear="rotateInDownLeft"
                  >
                    <span className="ltext-101 cl2 respon2">
                      Men Collection 2018
                    </span>
                  </div>
                  <div
                    className="layer-slick1 animated visible-true"
                    data-appear="rotateInUpRight"
                    data-delay="800"
                  >
                    <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                      New arrivals
                    </h2>
                  </div>
                  <div
                    className="layer-slick1 animated visible-true"
                    data-appear="rotateIn"
                    data-delay="1600"
                  >
                    <Link to="/product" className="bg1">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            <img
              className="d-block w-100"
              src="../../asset/images/slide-03.jpg"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default SliderComponent;
