import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../consts";
import { Form, Input, Button } from 'antd';

export function CreateProduct({ setAllProducts }) {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [formIsShown, setFormIsShown] = useState(false);

  const [form] = Form.useForm();

  const handleFormInput = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const handleAddNewProduct = async () => {
    if (
      newProduct.title.length === 0 ||
      newProduct.description.length === 0 ||
      newProduct.image.length === 0
    ) {
      alert("Please enter all required information to create a new product!");
      return;
    }

    try {
      const { data } = await axios.post(`${API_BASE_URL}/products`, newProduct);
      console.log(data);
      setAllProducts((oldProducts) => {
        return [...oldProducts, data.product];
      });
    } catch (error) {
      console.log("Error in updating the product list on the server!", error);
    }

    toggleForm();
  };

  const toggleForm = () => {
    setFormIsShown(!formIsShown);
  };

  return (
    <div>
      <Button className="btnStyle" type="primary" onClick={toggleForm}>
        {formIsShown ? "Cancel" : "Create new product"}
      </Button>

      {formIsShown && (
        <Form
          form={form}
          layout="vertical"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          style={{ padding: "24px" }}
        >
          <Form.Item label="TITLE" required tooltip="This is a required field">
            <Input
              type="text"
              name="title"
              autoComplete="title"
              placeholder="product title"
              value={newProduct.title}
              onChange={handleFormInput}
            />
          </Form.Item>
          <Form.Item
            label="DESCRIPTION"
            required
            tooltip="This is a required field"
          >
            <Input.TextArea
              showCount
              maxLength={100}
              type="text"
              name="description"
              autoComplete="description"
              placeholder="product description"
              value={newProduct.description}
              onChange={handleFormInput}
            />
          </Form.Item>
          <Form.Item
            label="IMAGE URL"
            required
            tooltip="This is a required field"
          >
            <Input
              type="text"
              name="image"
              autoComplete="image"
              placeholder="product image"
              value={newProduct.image}
              onChange={handleFormInput}
            />
          </Form.Item>
          <Button className="btnStyle" type="primary" onClick={handleAddNewProduct}>
            Create product!
          </Button>
        </Form>
      )}
    </div>
  );
}