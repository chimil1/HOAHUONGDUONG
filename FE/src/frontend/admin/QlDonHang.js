import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

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
        { name: "Quần jean", quantity: 1, price: 500000 }
      ]
    },
    {
      id: 2,
      recipient: "John Doe",
      address: "56 Đường Nguyễn Trãi, Hà Nội",
      phone: "0987654321",
      status: "Đã giao",
      products: [
        { name: "Giày thể thao", quantity: 1, price: 1000000 },
        { name: "Áo khoác", quantity: 2, price: 750000 }
      ]
    },
    {
      id: 2,
      recipient: "John Doe",
      address: "56 Đường Nguyễn Trãi, Hà Nội",
      phone: "0987654321",
      status: "Đã Hủy",
      products: [
        { name: "Giày thể thao", quantity: 1, price: 1000000 },
        { name: "Áo khoác", quantity: 2, price: 750000 }
      ]
    }
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
                            <th>Hình ảnh</th>
                            <th>Tên người nhận</th>
                            <th>Địa chỉ</th>
                            <th>SĐT</th>
                            <th>Chi tiết đơn hàng</th>
                            <th>Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, index) => (
                            <tr key={index} className="tr-shadow">
                              <td>
                                {/* Có thể hiển thị hình ảnh sản phẩm ở đây */}
                                <img
                                  src="https://via.placeholder.com/50"
                                  alt="Hình ảnh"
                                />
                              </td>
                              <td>{order.recipient}</td>
                              <td>{order.address}</td>
                              <td>{order.phone}</td>
                              <td>
                                <ul>
                                  {order.products.map((product, i) => (
                                    <li key={i}>
                                      {product.name} - Số lượng: {product.quantity} - Giá: {product.price.toLocaleString()} VND
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td>
                                <span className={`badge ${order.status === "Đã giao" ? "badge-success" : "badge-warning"}`}>
                                  {order.status}
                                </span>
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
