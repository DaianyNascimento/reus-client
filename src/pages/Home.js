import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/AuthProviderWrapper";
import { ListProductsHome } from "../components/ListProductsHome";


export function Home() {
  const navigate = useNavigate();
  const { user, removeUserFromContext } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const logout = async () => {
    try {
      await axios.post(API_BASE_URL + "/auth/logout");
      removeUserFromContext();
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("there was an error logging out");
    }
  }
  useEffect(() => {
    async function fetchAllProducts() {
        console.log("Fetching all products to homepage!");
        try {
            const { data } = await axios.get(`${API_BASE_URL}/homeProducts`);

            if (!data.productsAvailable) return;
            setProducts(data.productsAvailable);
        } catch (err) {
            console.log("We got an error");
            console.error(err);
            console.log(err.response.data);
        }
    }
    fetchAllProducts();
}, []);


  return (
    <div>
      <h1>Home Page</h1>
      {user && <button onClick={logout}>Logout</button>}
      <div>
      {products.map((products) => (
        <ListProductsHome key={products._id} products={products}/>
      ))}
      </div>
    </div>
  );
}
