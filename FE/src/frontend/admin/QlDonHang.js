import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import { Link } from "react-router-dom";

function QlDonHang() {
  // Dữ liệu giả lập của đơn hàng
  const orders = [
    {
      id: 1,
      recipient: "Lori Lynch",
      address: "124D,12H,Nguyễn Văn Linh, Cần Thơ",
      phone: "0342453243",
      status: "Đang giao",
      products: [
        { name: "Áo thun", quantity: 2, price: 200000 },
        { name: "Quần jean", quantity: 1, price: 500000 },
      ],
    },
  ];

  return (
    <div className="page-wrapper">
      <Menu />
      <div className="page-container">
        <Header />
        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-header">
                      <div className="overview-wrap">
                        <h2 className="title-5 m-b-35">Đơn hàng</h2>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-data2">
                        <thead>
                          <tr>
                            <th>Tên người nhận</th>
                            <th>Tổng giá</th>
                            <th>Mã hóa đơn</th>
                            <th>Địa chỉ</th>
                            <th>SĐT</th>
                            <th>Trạng thái</th>
                            <th>Chi tiết đơn hàng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, index) => (
                            <tr key={index} className="tr-shadow">
                              <td>{order.recipient}</td>
                              <td>{order.recipient}</td>
                              <td>{order.recipient}</td>
                              <td>{order.address}</td>
                              <td>{order.phone}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    order.status === "Đã giao"
                                      ? "badge-success"
                                      : "badge-warning"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td>
                                <div className="overview-wrap">
                                  <Link
                                    className="au-btn au-btn-icon au-btn--green bg-dark"
                                    to="/OrderDetails"
                                    state={order}
                                  >
                                    <i className="zmdi zmdi-mail-send"></i>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="card-footer">
                      <Footer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QlDonHang;
