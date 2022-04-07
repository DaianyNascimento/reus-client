import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../consts";


export function CreateProduct({ setAllProducts }){

        const [newProduct, setNewProduct] = useState({ title: "", description: "", image: "" });

        const handleFormInput = (event) => {
            setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
        };
      
        const handleAddNewProduct = async () => {
          if (newProduct.title.length === 0 || newProduct.description.length === 0 || newProduct.image.length === 0) {
            alert("Please enter all the information required to create a new product!");
            return;
          }
      
          try {
            const { data } = await axios.post(`${API_BASE_URL}/profile/`, newProduct);
           
            console.log(data);

            setAllProducts((oldProducts) => {
            return [...oldProducts, data.product];
            });
          } catch (error) {
            console.error("Error in updating the product list on the server!", error);
          }
        };
      
        return (
          <div>
            <input name="title" value={newProduct.title} onChange={handleFormInput} />
            <input name="description" value={newProduct.description} onChange={handleFormInput} />
            <input name="image" value={newProduct.image} onChange={handleFormInput} />
            <button onClick={handleAddNewProduct}>Add Product!</button>
          </div>
        );
}