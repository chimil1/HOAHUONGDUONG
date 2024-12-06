import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function ThongKe() {
  const [loginStats, setLoginStats] = useState([]);
  const [revenueStats, setRevenueStats] = useState([]);
  const [revenue, setRevenue] = useState(0);
  //doanh thu
  useEffect(() => {
    // Fetch thống kê người đăng nhập
    axios
        .get("http://localhost:8000/api/user-stats")
        .then((response) => setLoginStats(response.data.login_stats))
        .catch((error) => console.error("Error fetching login stats:", error));
    // Fetch thống kê doanh thu theo tháng
    axios
        .get("http://localhost:8000/api/revenue-by-month")
        .then((response) => setRevenueStats(response.data))
        .catch((error) => console.error("Error fetching revenue stats:", error));
    axios
        //Tổng doanh thu
        .get("http://localhost:8000/api/revenue-by")
        .then((response) => setRevenue(response.data.total_amount))
        .catch((error) => console.error("Error fetching total revenue:", error));
  }, []);

  // Tạo màu sắc ngẫu nhiên cho mỗi cột
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Mảng màu sắc cho từng cột
  const barColors = loginStats.map(() => getRandomColor());

  // Dịch các ngày trong tuần sang tiếng Việt
  const translateDayToVietnamese = (day) => {
    const daysInVietnamese = {
      Sunday: 'Chủ Nhật',
      Monday: 'Thứ Hai',
      Tuesday: 'Thứ Ba',
      Wednesday: 'Thứ Tư',
      Thursday: 'Thứ Năm',
      Friday: 'Thứ Sáu',
      Saturday: 'Thứ Bảy'
    };
    return daysInVietnamese[day] || day;
  };

  // Dữ liệu cho biểu đồ thống kê người đăng nhập
  const chartDataLoginStats = {
    labels: loginStats.map((stat) => translateDayToVietnamese(stat.day)), // Dịch ngày sang tiếng Việt
    datasets: [
      {
        label: "Số người đăng nhập",
        data: loginStats.map((stat) => stat.users_logged_in),
        backgroundColor: barColors,
        borderColor: barColors,
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu cho biểu đồ doanh thu
  const chartDataRevenue = {
    labels: revenueStats.map((stat) => `Tháng ${stat.month}`),
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: revenueStats.map((stat) => stat.total_revenue),
        backgroundColor: revenueStats.map(() => getRandomColor()),
        borderColor: revenueStats.map(() => getRandomColor()),
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình biểu đồ thống kê người đăng nhập
  const chartOptionsLoginStats = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê số người đăng nhập trong 7 ngày gần nhất",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value % 1 === 0 ? value : ''; // Chỉ hiển thị số nguyên trên trục Y
          },
        },
      },
    },
  };

  // Cấu hình biểu đồ doanh thu
  const chartOptionsRevenue = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Doanh thu theo từng tháng trong năm",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // Định dạng giá trị trục Y cho dễ đọc
          },
        },
      },
    },
  };

  return (
      <div className="page-wrapper">
        <Menu />
        <div className="page-container">
          <Header />
          <div className="main-content">
            <div className="section__content section__content--p30">
              <div className="container-fluid">
                <div className="row m-t-25">
                  {/* Các phần hiển thị thông tin tổng quan */}
                  <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c1">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="icon">
                            <i className="zmdi zmdi-account-o"></i>
                          </div>
                          <div className="text">
                            <span>Người Dùng</span>
                            <h2>7</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c4">
                      <div className="overview__inner">
                        <div className="overview-box clearfix d-flex align-items-center">
                          <div className="icon">
                            <i className="zmdi zmdi-money"></i>
                          </div>
                          <div className="text">
                            <span>Tổng Doanh Thu</span>
                            <h2>
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(revenue)}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Các phần hiển thị thông tin khác */}
                </div>

                <div className="row">
                  {/* Biểu đồ thống kê số người đăng nhập */}
                  <div className="col-lg-6 col-md-12 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Biểu đồ thống kê người đăng nhập</h4>
                        <Bar data={chartDataLoginStats} options={chartOptionsLoginStats}/>
                      </div>
                    </div>
                  </div>

                  {/* Biểu đồ doanh thu */}
                  <div className="col-lg-6 col-md-12 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Biểu đồ doanh thu theo tháng</h4>
                        <Bar data={chartDataRevenue} options={chartOptionsRevenue} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ThongKe;
