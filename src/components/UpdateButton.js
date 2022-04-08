import axios from "axios";
//import { useState } from "react";
import { API_BASE_URL } from "../consts";

export function Update({setAllProducts}){

const updateProduct = async (idToUpdate, updatedProduct) => {
    try {
        const { data } = await axios.put(`${API_BASE_URL}/profile/`, updatedProduct);
        console.log(data);
        setAllProducts(([oldProducts]) => {
          return oldProducts.map((element) => {
            if (idToUpdate === element._id) {
              return updatedProduct;
            }
            return element;
          });
        });
    } catch (error) {
      console.error("Error in updating the product on the server!", error);
    }
  };

  return (
    <div>
     <button onClick={updateProduct}>Update</button>
    </div>
  );
}