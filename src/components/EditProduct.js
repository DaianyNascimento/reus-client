import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../consts";
import { Form, Input, Button, Modal } from 'antd';

export function EditProduct({ product, setAllProducts }) {
    const [editedProduct, setEditedProduct] = useState({ title: product.title, description: product.description, image: product.image });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const updateSingleProduct = async (idToUpdate, updatedProduct) => {
        //console.log(updatedProduct);
        try {
            await axios.put(`${API_BASE_URL}/products`, updatedProduct);
            setAllProducts((oldProducts) => {
                return oldProducts.map((product) => {
                    if (idToUpdate === product._id) {
                        return updatedProduct;
                    }
                    return product;
                });
            });
        } catch (error) {
            console.error("Error in updating the product on the server!", error);
        }
    };

    const handleFormInput = (event) => {
        setEditedProduct({ ...editedProduct, [event.target.name]: event.target.value });
    };

    const showModal = () => {
        setIsModalVisible(true);
      };


      const handleOk = () => {
        updateSingleProduct(product._id, { ...product, title: editedProduct.title, description: editedProduct.description, image: editedProduct.image });
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    return (
        <div>
            <Button className="updateBtn btnStyle" type="primary" onClick={showModal}>Update Product</Button>

            <Modal title="Update product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} 
            footer = {[ 
            <Button className="updateBtn btnStyle" type="primary" onClick={handleOk}>Update!</Button>,
            <Button className="updateBtn btnStyle" key="back" onClick={handleCancel}>Return</Button>,

                ]}>
                
                <Form form={form} layout="vertical" labelCol={{ span: 60,}} wrapperCol={{ span: 60,}} style={{padding: "24px"}}>
                <Form.Item label="TITLE" required tooltip="This is a required field">
                    <Input
                        type="text"
                        name="title"
                        autoComplete="title"
                        placeholder="product title"
                        value={editedProduct.title}
                        onChange={handleFormInput}
                    />
                    </Form.Item>
                    <Form.Item label="DESCRIPTION" required tooltip="This is a required field">
                    <Input.TextArea showCount maxLength={100}
                        type="text"
                        name="description"
                        autoComplete="description"
                        placeholder="product description"
                        value={editedProduct.description}
                        onChange={handleFormInput}
                    />
                    </Form.Item>

                    <Form.Item label="IMAGE URL" required tooltip="This is a required field">
                    <Input
                        type="text"
                        name="image"
                        autoComplete="image"
                        placeholder="product image"
                        value={editedProduct.image}
                        onChange={handleFormInput}
                    />
                   </Form.Item>
                    
                </Form>
                </Modal>
                
        </div>
    );
}