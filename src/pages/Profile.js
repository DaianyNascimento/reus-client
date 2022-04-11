import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProviderWrapper";
import { SingleProduct } from "../components/SingleProduct";
import { CreateProduct } from "../components/CreateProduct";
import { DeleteAllProductsButtons } from "../components/DeleteAllProductsButtons";
import { ListAlerts } from "../components/ListAlerts";


export function Profile() {
    const navigate = useNavigate();
    const { user, removeUserFromContext } = useContext(AuthContext);
    const [allProducts, setAllProducts] = useState([]);
    const [formIsShown, setFormIsShown] = useState(false);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        async function fetchAllProducts() {
            console.log("Fetching all products!");
            try {
                const { data } = await axios.get(`${API_BASE_URL}/products`);

                if (!data.products) return;
                setAllProducts(data.products);
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
                const { data } = await axios.get(`${API_BASE_URL}/homeProducts`);
                console.log("This is data from alerts ", data)
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
        console.log(idToDelete);
        try {
            const { data } = await axios.delete(`${API_BASE_URL}/products/${idToDelete}`);
            console.log("this is data from delete", data);
            setAllProducts((oldProducts) => {
                return oldProducts.filter((product) => {
                    return idToDelete !== product._id;
                });
            });
        } catch (error) {
            console.error("Error to delete the product on the server!", error);
        }
    };

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

    const toggleForm = () => {
        setFormIsShown(!formIsShown);
    };

    return (
        <div>
            <h1>Profile Page</h1>
            {user && <h2>Welcome, {user.email}</h2>}
            <button onClick={logout}>Logout</button>

            <button type="primary" onClick={toggleForm}>
                {formIsShown ? 'Cancel' : 'Create new product'}
            </button>
            {formIsShown && <CreateProduct setAllProducts={setAllProducts} />}

            {allProducts.map((product) => (
                <SingleProduct
                    key={product._id}
                    product={product}
                    setAllProducts={setAllProducts}
                    deleteSingleProduct={deleteSingleProduct}
                />
            ))}

            <DeleteAllProductsButtons
                deleteSingleProduct={deleteSingleProduct}
                allProducts={allProducts}
                setAllProducts={setAllProducts}
            />

            <h2>Alerts received</h2>
            {alerts.map((alerts) => (
                <ListAlerts
                    key={alerts._id}
                    alerts={alerts}
                />
            ))} 
        </div>
    );
}
