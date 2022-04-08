import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProviderWrapper";
import { SingleProduct } from "../components/SingleProduct";
import { CreateProduct } from "../components/CreateProduct";
import { DeleteAllProductsButtons } from "../components/DeleteAllProductsButtons";
import { Update } from "../components/UpdateButton";

export function Profile() {
    const navigate = useNavigate();
    const { user, removeUserFromContext } = useContext(AuthContext);
    const [allProducts, setAllProducts] = useState([]);
    const [formIsShown, setFormIsShown] = useState(false);

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
    }, [navigate]);

    const updateSingleProduct = async (idToUpdate, updatedProduct) => {
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

    const deleteSingleProduct = async (idToDelete) => {
        console.log(idToDelete);
        try {
            const { data } = await axios.delete(`${API_BASE_URL}/products/${idToDelete}`);
            console.log(data);
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
                {formIsShown ? 'Hide form' : 'Create new product'}
            </button>
            {formIsShown && <CreateProduct setAllProducts={setAllProducts} />}

            {allProducts.map((product) => (
                <SingleProduct
                    key={product._id}
                    product={product}
                    updateSingleProduct={updateSingleProduct}
                    deleteSingleProduct={deleteSingleProduct}
                />
            ))}

            <DeleteAllProductsButtons
                deleteSingleProduct={deleteSingleProduct}
                allProducts={allProducts}
                setAllProducts={setAllProducts}
            />
            <Update setAllProducts={setAllProducts} />

        </div>
    );
}
