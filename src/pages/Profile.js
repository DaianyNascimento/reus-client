import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProviderWrapper";
import { CreateProduct } from "../components/CreateProduct";
import { Delete } from "../components/DeleteButton";
import { Update } from "../components/UpdateButton";


export function Profile() {
    const navigate = useNavigate();
    const { user, removeUserFromContext } = useContext(AuthContext);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        async function fetchAllProducts() {
            console.log("Fetching all products!");
            try {
                const { data } = await axios.get(`${API_BASE_URL}/allproducts`);
                console.log("This is data from Profile axios.get all ", data)
                //if (!data) return;
                setAllProducts(data);
              
            } catch (err) {
                console.log("We got an error");
                console.error(err);
                console.log(err.response.data);
            }
        }
        fetchAllProducts();
    }, []);

    console.log("This is all products", allProducts)
    
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

    return (
        <div>
            <h1>Profile Page</h1>
            {user && <h2>Welcome, {user.email}</h2>}
            <button onClick={logout}>Logout</button>

            <CreateProduct setAllProducts = {setAllProducts}/>
            <Delete setAllProducts = {setAllProducts}/>
            <Update setAllProducts = {setAllProducts}/>

        </div>
    );
}
