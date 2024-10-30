import React, { useState } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    status: "",
    category_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu product lên backend tại đây
    console.log("Product submitted:", product);
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
                  <h3 class="title-5 m-b-35">Thêm sản phẩm mới</h3>
                </div>
                <div class="card-body">
                  <form onSubmit={handleSubmit}>
                    <div class="form-group">
                      <label for="name">Tên sản phẩm</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="price">Giá</label>
                      <input
                        type="number"
                        class="form-control"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="discountPrice">Mô tả</label>
                      <input
                        type="text"
                        class="form-control"
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Trạng thái</label>
                      <select
                        className="form-control"
                        value={product.status}
                        onChange={handleChange}
                      >
                        <option value="Có sẵn">Có sẵn</option>
                        <option value="Hết hàng">Hết hàng</option>
                        <option value="Đã ngừng cung cấp">Đã ngừng cung cấp</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Chọn danh mục</label>
                      <select
                        className="form-control"
                        value={product.category_id}
                        onChange={handleChange}
                      >
                        <option value="Quần">Quần</option>
                        <option value="Áo">Áo</option>
                      </select>
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Thêm sản phẩm
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

export default AddProduct;
