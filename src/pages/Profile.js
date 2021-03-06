import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProviderWrapper";
import { SingleProduct } from "../components/SingleProduct";
import { CreateProduct } from "../components/CreateProduct";
import { DeleteAllProductsButtons } from "../components/DeleteAllProductsButtons";
import { ListAlerts } from "../components/ListAlerts";
import { Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export function Profile() {
  const navigate = useNavigate();
  const { user, removeUserFromContext, addUserToContext } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [userName, setUserName] = useState([]);

  useEffect(() => {
    if (!user || typeof user == "undefined") {
      const checkLoggedUser = async () => {
        try {
          const userData = await axios.get(`${API_BASE_URL}/verifySession`);
          addUserToContext(userData.data.user);
          if (!userData.data.user) {
            navigate("/login");
          }
        } catch (err) {
          console.log("We got an error");
          console.error(err);
          console.log(err.response.data);
        }
      }
      checkLoggedUser();
    }
  }, [user, navigate, addUserToContext]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      console.log("Fetching all products to profile!");
      try {
        const { data } = await axios.get(`${API_BASE_URL}/products`);
        if (!data.currentDonorProducts) return;
        setAllProducts(data.currentDonorProducts);
        setUserName(data.currentDonor.name);
      } catch (err) {
        console.log("We got an error");
        console.error(err);
        console.log(err.response.data);
      }
    }
    fetchAllProducts();
  }, []);

  useEffect(() => {
    async function fetchAllAlerts() {
      console.log("Fetching all alerts to profile!");
      try {
        const { data } = await axios.get(`${API_BASE_URL}/homeProducts/alerts`);
        if (!data.pendingAlerts) return;
        setAlerts(data.pendingAlerts);
      } catch (err) {
        console.log("We got an error");
        console.error(err);
        console.log(err.response.data);
      }
    }
    fetchAllAlerts();
  }, []);

  const deleteSingleProduct = async (idToDelete) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${idToDelete}`);
      setAllProducts((oldProducts) => {
        return oldProducts.filter((product) => {
          return idToDelete !== product._id;
        });
      });
    } catch (error) {
      console.error("Error to delete product!", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(API_BASE_URL + "/auth/logout");
      removeUserFromContext();
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("There was an error logging out");
    }
  };

  return (
    <div>
      <div className="profileHead">
        {user && <h2 className="profTitle">Welcome, {userName} <SmileOutlined /></h2>}
        <Button className="profLogOut btnStyle" type="primary" onClick={logout}>
          Logout
        </Button>
      </div>
   
    
      
      <div className="profSubTitleDiv"> 
      <h2 className="profSubTitle">Your Products</h2> 

      </div>


      <div className="productsListProfile">


        {allProducts.map((product) => (
          <SingleProduct
            key={product._id}
            product={product}
            setAllProducts={setAllProducts}
            deleteSingleProduct={deleteSingleProduct}
          />
        ))}

        
      </div>
     

      <div className="createProdDiv">
      {<CreateProduct setAllProducts={setAllProducts} />}
      </div>

      
      <div className="createProdDiv">
      <DeleteAllProductsButtons
       
        deleteSingleProduct={deleteSingleProduct}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
      />
      </div>
   
         
      <div className="alertsProfile">
        <h2 className="alertsProfile">Alerts received</h2>
        {alerts.map((alerts) => (
          <ListAlerts key={alerts._id} alerts={alerts} />
        ))}
      </div>
    </div>
  );
}