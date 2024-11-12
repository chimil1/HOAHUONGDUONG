import React, { useState, useEffect } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function ThongKe() {
  // Dữ liệu thật từ API
  const [data, setData] = useState({
    totalEarningsToday: 0,
    productCount: 0,
    DayEarnings: [], // Doanh thu hàng ngày thật
  });

  useEffect(() => {
    // Gọi API để lấy dữ liệu thống kê thực tế
    fetch("http://localhost:8000/api/statistics") // Đường dẫn API thực tế của bạn
      .then((response) => response.json())
      .then((data) => {
        setData({
          totalEarningsToday: data.totalEarningsToday,
          productCount: data.productCount,
          DayEarnings: data.DayEarnings, // Doanh thu hàng ngày
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Dữ liệu cho biểu đồ
  const chartData = {
    labels: ["Ngày 1", "Ngày 2", "Ngày 3", "Ngày 4", "Ngày 5", "Ngày 6", "Ngày 7"], // Bạn có thể điều chỉnh nhãn theo nhu cầu
    datasets: [
      {
        label: "Doanh thu hàng ngày",
        data: data.DayEarnings,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ doanh thu hàng ngày",
      },
    },
  };

  return (
    <div>
      <div className="page-wrapper">
        <Menu />
        <div className="page-container">
          <Header />
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
                            <h2>${data.totalEarningsToday}</h2>
                            <span>Tổng thu nhập hôm nay</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c2">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="icon">
                            <i className="zmdi zmdi-shopping-cart"></i>
                          </div>
                          <div className="text">
                            <h2>{data.productCount}</h2>
                            <span>Sản phẩm bán được</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biểu đồ doanh thu hàng ngày */}
                <div className="row">
                  <div className="col-sm-12">
                    <div className="overview-item">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="text">
                            <Bar data={chartData} options={chartOptions} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThongKe;
