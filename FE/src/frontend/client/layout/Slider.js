import React from "react";

function SliderComponent() {
  return (
    <div>
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">

        <div className="carousel-inner">
          <div className="carousel-item active position-relative">
            <img
              className="d-block w-100"
              src="../../asset/images/slide-01.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item position-relative">
            <img
            className="d-block w-100"
            src="../../asset/images/slide-02.jpg"
            alt="Second slide"
          />
        </div>
        <div className="carousel-item position-relative">
          <img
            className="d-block w-100"
            src="../../asset/images/slide-03.png"
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