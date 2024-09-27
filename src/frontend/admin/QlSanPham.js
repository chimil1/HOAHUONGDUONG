import React, { useState } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import ProductDetails from "./ProductDetails";
import EditProductForm from "./EditProductForm";

function QlSanPham() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);

  const products = [
    {
      id: 1,
      name: "Áo Thun Line Phối ATN0163",
      price: "100.000đ",
      discountPrice: "10.000đ",
      quantity: 112
    },
    // Các sản phẩm khác
  ];

  const handleDetailClick = (product) => {
    setSelectedProduct(product);
    setIsViewingDetails(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleSaveEdit = (updatedProduct) => {
    // Xử lý lưu sản phẩm sau khi chỉnh sửa
    console.log("Product updated:", updatedProduct);
    setIsEditing(false);
    setSelectedProduct(null);
  };

  return (
    <div className="page-wrapper">
      <Menu></Menu>
      <div className="page-container">
        <Header></Header>

        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-header">
                      <div className="col-md-12">
                        <h3 className="title-5 m-b-35">Bảng sản phẩm</h3>
                      </div>
                    </div>

                    <div className="card-body">
                      <table className="table table-data2">
                        <thead>
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Giá khuyến mãi</th>
                            <th>Số lượng</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr className="tr-shadow" key={product.id}>
                              <td></td>
                              <td>{product.name}</td>
                              <td>{product.price}</td>
                              <td>{product.discountPrice}</td>
                              <td>{product.quantity}</td>
                              <td>
                                <div className="table-data-feature">
                                  <button
                                    className="item"
                                    onClick={() => handleDetailClick(product)}
                                    title="Chi tiết"
                                  >
                                    <i className="zmdi zmdi-mail-send"></i>
                                  </button>
                                  <button
                                    className="item"
                                    onClick={() => handleEditClick(product)}
                                    title="Sửa"
                                  >
                                    <i className="zmdi zmdi-edit"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Hiển thị chi tiết sản phẩm */}
                    {isViewingDetails && selectedProduct && (
                      <ProductDetails
                        product={selectedProduct}
                        onClose={() => setIsViewingDetails(false)}
                      />
                    )}

                    {/* Hiển thị form sửa sản phẩm */}
                    {isEditing && selectedProduct && (
                      <EditProductForm
                        product={selectedProduct}
                        onSave={handleSaveEdit}
                        onCancel={() => setIsEditing(false)}
                      />
                    )}

                    <div className="card-footer">
                      <Footer></Footer>
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

export default QlSanPham;
