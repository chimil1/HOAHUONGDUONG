import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function QlKhachHang() {
  // Dữ liệu giả lập của khách hàng và đơn hàng
  const customers = [
    {
      id: 1,
      name: "Lori Lynch",
      email: "lori@example.com",
      phone: "0342453243",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      phone: "0987654321",
    }
  ];

  return (
    <div className="page-wrapper">
      <Menu />
      <div className="page-container">
        <Header />
        <header className="header-desktop2 bg-dark">
          {/* Nội dung header */}
        </header>

        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-header">
                      <div className="overview-wrap">
                        <h2 className="title-5 m-b-35">Bảng khách hàng</h2>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-data2">
                        <thead>
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Tên khách hàng</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customers.map((customer, index) => (
                            <tr key={index} className="tr-shadow">
                              <td>
                                {/* Có thể thêm hình ảnh khách hàng */}
                                <img
                                  src="https://via.placeholder.com/50"
                                  alt="Hình ảnh"
                                />
                              </td>
                              <td>{customer.name}</td>
                              <td>
                                <span className="block-email">{customer.email}</span>
                              </td>
                              <td>{customer.phone}</td>
                              <td>
                                <div className="table-data-feature">
                                  <button
                                    className="item"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Chi tiết"
                                  >
                                    <i className="zmdi zmdi-mail-send"></i>
                                  </button>
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

export default QlKhachHang;
