import React, { useEffect } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { fetchStatiscal } from "../actions/unitActions";
import { useSelector, useDispatch } from "react-redux";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function ThongKe() {
  const dispatch = useDispatch();
  const StatisticalState = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(fetchStatiscal());
  }, [dispatch]);

  const { units } = StatisticalState; // Destructure units directly

  // Đảm bảo dữ liệu có sẵn trước khi sử dụng
  const totalEarningsToday = units?.totalEarningsToday || [];
  const productCount = units?.productCount || 0;

  const selectednow = new Date().toISOString().split("T")[0]; // Ngày hiện tại

  // Lọc dữ liệu cho ngày hôm nay
  const filteredEarningsToday = totalEarningsToday.filter(
    (item) => item.date === selectednow
  );

  // Tính tổng doanh thu cho ngày hôm nay
  const totalAmountForSelectedDay = filteredEarningsToday.reduce(
    (sum, item) => sum + item.total_amount,
    0
  );

  // Tính doanh thu cho các ngày trước (ngoại trừ hôm nay)
  // const dailyAmounts = totalEarningsToday.filter(
  //   (item) => item.date !== selectednow
  // );
  
  // const totalAmountForSelectedDays = dailyAmounts.reduce(
  //   (acc, current) => {
  //     const amount = current.total_amount || 0; // Nếu không có total_amount thì sử dụng 0
  //     return acc + amount;
  //   },
  //   0
  // );

  // Dữ liệu cho biểu đồ
  const generateDateRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
    }
    return dates;
  };

  // Chọn ngày bắt đầu và kết thúc (ví dụ: tháng này)
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const endOfMonth = new Date();

  // Lấy tất cả các ngày trong tháng
  const allDatesInMonth = generateDateRange(startOfMonth, endOfMonth);

  // Tạo dữ liệu cho biểu đồ, đảm bảo tất cả các ngày trong tháng đều có mặt
  const chartData = {
    labels: allDatesInMonth,
    datasets: [
      {
        label: "Doanh thu hàng ngày",
        data: allDatesInMonth.map((date) => {
          const earnings = totalEarningsToday.find(
            (item) => item.date === date
          );
          return earnings ? earnings.total_amount : 0; // Nếu không có dữ liệu thì trả về 0
        }),
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Thêm màu nền cho thanh
        borderColor: "rgba(75, 192, 192, 1)", // Màu viền của thanh
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // Format số liệu cho trục y (hiển thị có dấu phẩy ngăn cách hàng nghìn)
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ doanh thu hàng ngày", // Tiêu đề biểu đồ
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
                            <h2>
                              {totalAmountForSelectedDay.toLocaleString()}
                            </h2>
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
                            <h2>{productCount}</h2>
                            <span>Sản phẩm bán được</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hiển thị tổng doanh thu cho các ngày trước */}
                  {/* <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c1">
                      <div className="overview__inner">
                        <div className="overview-box clearfix">
                          <div className="icon">
                            <i className="zmdi zmdi-account-o"></i>
                          </div>
                          <div className="text">
                            <h2>
                              {totalAmountForSelectedDays.toLocaleString()}
                            </h2>
                            <span>Tổng thu nhập các ngày đã chọn</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
