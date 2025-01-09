import React from "react";
import { Button, Card } from "react-bootstrap";

function ProductDetails({ product, onClose }) {
  return (
    <Card className="mt-3">
      <Card.Header className="bg-dark text-white">Chi tiết sản phẩm</Card.Header>
      <Card.Body>
        <Card.Text><strong>Tên sản phẩm:</strong> {product.name}</Card.Text>
        <Card.Text><strong>Giá:</strong> {product.price} VND</Card.Text>
        <Card.Text><strong>Giá khuyến mãi:</strong> {product.discountPrice} VND</Card.Text>
        <Card.Text><strong>Số lượng:</strong> {product.quantity}</Card.Text>
        <Button variant="secondary" onClick={onClose}>Đóng</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductDetails;
