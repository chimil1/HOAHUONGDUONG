import React from "react";
import { Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function OrderDetails({ orders, onClose }) {
    const location = useLocation();
    const selectedOrder = location.state;
  
    // Kiểm tra xem selectedOrder có tồn tại hay không
    if (!selectedOrder) {
      return <div>Không tìm thấy thông tin đơn hàng.</div>;
    }
  return (
    <Card className="mt-3">
      <Card.Header className="bg-dark text-white">
        Chi tiết sản phẩm
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Tên sản phẩm:</strong> {orders.recipient}
        </Card.Text>
        <Card.Text>
          <strong>Số lượng:</strong> {orders.quantity}
        </Card.Text>
        <Card.Text>
          <strong>Giá:</strong> {orders.price} VND
        </Card.Text>
        <Card.Text>
          <strong>Màu:</strong> {orders.color}
        </Card.Text>
        <Card.Text>
          <strong>Kích cỡ:</strong> {orders.size}
        </Card.Text>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Card.Body>
    </Card>
  );
}

export default OrderDetails;
