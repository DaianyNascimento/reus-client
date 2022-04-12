import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../consts";

export function CreateProduct({ setAllProducts }) {
  const [newProduct, setNewProduct] = useState({ title: "", description: "", image: "" });
  const [formIsShown, setFormIsShown] = useState(false);

  const handleFormInput = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const handleAddNewProduct = async () => {
    if (newProduct.title.length === 0 || newProduct.description.length === 0 || newProduct.image.length === 0) {
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
      <button type="primary" onClick={toggleForm}>
        {formIsShown ? 'Cancel' : 'Create new product'}
      </button>

      {formIsShown && (
        <form>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            autoComplete="title"
            placeholder="product title"
            value={newProduct.title}
            onChange={handleFormInput}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            autoComplete="description"
            placeholder="product description"
            value={newProduct.description}
            onChange={handleFormInput}
          />
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            autoComplete="image"
            placeholder="product image"
            value={newProduct.image}
            onChange={handleFormInput}
          />
          <button onClick={handleAddNewProduct}>Create product!</button>
        </form>)}

    </div>
  );
}