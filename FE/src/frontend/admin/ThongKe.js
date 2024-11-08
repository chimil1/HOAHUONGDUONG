import React, { useState, useEffect } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function ThongKe() {
  const [data, setData] = useState({
    totalEarnings: 0,
    productPercent: 0,
    servicePercent: 0,
  });

  useEffect(() => {
    // Gọi API để lấy dữ liệu thống kê
    fetch("http://localhost:3000/api/statistics") // URL API của bạn
      .then((response) => response.json())
      .then((data) => {
        setData({
          totalEarnings: data.totalEarnings,
          productPercent: data.productPercent,
          servicePercent: data.servicePercent,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div className="page-wrapper">
        <Menu></Menu>
        <div className="page-container">
          <Header></Header>
          <div className="main-content">
            <div className="section__content section__content--p30">
              <div className="container-fluid">
                <div className="row m-t-25">
                  <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c1">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="icon">
                            <i className="zmdi zmdi-account-o"></i>
                          </div>
                          <div className="text">

                            <h2>${data.totalEarnings}</h2>
                            <span>Tổng thu nhập</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Percent */}
                  <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c2">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="icon">
                            <i className="zmdi zmdi-shopping-cart"></i>
                          </div>
                          <div className="text">
                            <h2>{data.productPercent}</h2>
                            <span>Sản phẩm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Percent */}
                  <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c3">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="icon">
                            <i className="zmdi zmdi-calendar-note"></i>
                          </div>
                          <div className="text">
                            <h2>{data.servicePercent}%</h2>
                            <span>Dịch vụ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Orders */}
                  <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c4">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="icon">
                            <i className="zmdi zmdi-money"></i>
                          </div>
                          <div className="text">
                            <h2>{data.productPercent}</h2> {/* Bạn có thể thay bằng dữ liệu đơn hàng */}
                            <span>Đơn hàng</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Footer></Footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThongKe;
