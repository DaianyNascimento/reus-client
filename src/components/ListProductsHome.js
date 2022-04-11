import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../consts";

export function ListProductsHome({ products }) {

    const [newAlert, setNewAlert] = useState([]);

        const sendingAnAlert = async () => {
            console.log(products);
            try {
              const { data } = await axios.post(`${API_BASE_URL}/homeProducts/${products._id}`, newAlert);
              console.log(data);
              setNewAlert((oldAlerts) => {
                return [...oldAlerts, data.alert];
              });
            } catch (error) {
              console.log("Error in updating the alert list on the server!", error);
            }
        }

    return (
        <div>
            <h2>{products.title}</h2>
            <p>{products.description}</p>
            <img src={products.image} alt={products.title} />

            <button onClick = {sendingAnAlert}>I want this!</button>
        </div>
    );
}