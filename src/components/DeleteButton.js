import axios from "axios";
//import { useState } from "react";
import { API_BASE_URL } from "../consts";

export function Delete({setAllProducts}){

const deleteProduct = async (idToDelete) => {
    try {
      const { data } = await axios.delete(`${API_BASE_URL}/profile`, {
        id: idToDelete,
      });
      console.log(data);
      setAllProducts(([oldProducts]) => {
        return oldProducts.filter((element) => {
          return idToDelete !== element._id;
        });
      });
    } catch (error) {
      console.error("Error in deleting the product on the server!", error);
    }
  };

  return (
    <div>
     <button onClick={deleteProduct}>Delete</button>
    </div>
  );
}