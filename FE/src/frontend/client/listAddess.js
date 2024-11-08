import React from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { Link } from "react-router-dom";

function ListAddress() {
  // Mảng dữ liệu mẫu cho các địa chỉ giao hàng
  const shippingAddresses = [
    {
      id: 1,
      name: "Phạm Việt Hùng",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      phone: "0123456789",
    },
    {
      id: 2,
      name: "Nguyễn Văn A",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      phone: "0987654321",
    },
  ];

  return (
    <div>
      <Header />
      <section className="pt-5" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="text-center mb-4">
            <h2 className="text-muted">Danh sách địa chỉ giao hàng</h2>
          </div>
          <div className="row">
            {shippingAddresses.map((address) => (
              <div key={address.id} className="col-lg-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{address.name}</h5>
                    <p className="text-muted mb-1">
                      Địa chỉ: {address.address}
                    </p>
                    <p className="text-muted mb-1">
                      Số điện thoại: {address.phone}
                    </p>
                    <div className="d-flex justify-content-end">
                      <Link to={`/edit-shipping/${address.id}`} className="btn btn-outline-primary me-2">
                        Sửa
                      </Link>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(address.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// Hàm xử lý xóa địa chỉ (đây là chức năng mẫu)
function handleDelete(id) {
  // Xử lý xóa địa chỉ với id đã cho
  console.log("Xóa địa chỉ có ID:", id);
}

export default ListAddress;