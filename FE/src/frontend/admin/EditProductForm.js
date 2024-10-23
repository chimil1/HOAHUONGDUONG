import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";

function EditProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="mt-3">
      <Card.Header className="bg-dark text-white">Sửa sản phẩm</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Giá khuyến mãi</Form.Label>
            <Form.Control
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="me-2">
            Lưu
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Hủy
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditProductForm;
