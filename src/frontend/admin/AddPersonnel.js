import React, { useState } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function AddPersonnel() {
  const [employee, setEmployee] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu employee lên backend tại đây
    console.log("Employee submitted:", employee);
  };

  return (
    <div class="page-wrapper">
      <Menu />
      <div class="page-container">
        <Header />
        <div class="main-content">
          <div class="section__content section__content--p30">
            <div class="container-fluid">
              <div class="card">
                <div class="card-header">
                  <h3 class="title-5 m-b-35">Thêm nhân viên mới</h3>
                </div>
                <div class="card-body">
                  <form onSubmit={handleSubmit}>
                    <div class="form-group">
                      <label for="name">Tên nhân viên</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="age">Tuổi</label>
                      <input
                        type="number"
                        class="form-control"
                        id="age"
                        name="age"
                        value={employee.age}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="phone">Số điện thoại</label>
                      <input
                        type="text"
                        class="form-control"
                        id="phone"
                        name="phone"
                        value={employee.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="address">Địa chỉ</label>
                      <input
                        type="text"
                        class="form-control"
                        id="address"
                        name="address"
                        value={employee.address}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Thêm nhân viên
                    </button>
                  </form>
                </div>
                <div class="card-footer">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPersonnel;
