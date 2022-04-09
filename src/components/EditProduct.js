import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../consts";

export function EditProduct({ product, setAllProducts }) {
    const [editedProduct, setEditedProduct] = useState({ title: product.title, description: product.description, image: product.image });

    const updateSingleProduct = async (idToUpdate, updatedProduct) => {
        console.log(updatedProduct);
        try {
            const { data } = await axios.put(`${API_BASE_URL}/products`, updatedProduct);
            console.log(data);
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

    const handleUpdateProduct = () => {
        updateSingleProduct(product._id, { ...product, title: editedProduct.title, description: editedProduct.description, image: editedProduct.image });
    };

    return (
        <div>
            <label>Title:</label>
            <input
                type="text"
                name="title"
                autoComplete="title"
                placeholder="product title"
                value={editedProduct.title}
                onChange={handleFormInput}
            />
            <label>Description:</label>
            <input
                type="text"
                name="description"
                autoComplete="description"
                placeholder="product description"
                value={editedProduct.description}
                onChange={handleFormInput}
            />
            <label>Image URL:</label>
            <input
                type="text"
                name="image"
                autoComplete="image"
                placeholder="product image"
                value={editedProduct.image}
                onChange={handleFormInput}
            />
            <button onClick={handleUpdateProduct}>Update!</button>
        </div>
    );
}