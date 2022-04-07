import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProviderWrapper";

export function Profile() {
    const navigate = useNavigate();
    const { user, removeUserFromContext } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const logout = async () => {
        try {
            await axios.post(API_BASE_URL + "/auth/logout");
            removeUserFromContext();
            navigate("/login");
        } catch (err) {
            console.log(err);
            alert("there was an error logging out");
        }
    };
    return (
        <div>
            <h1>Profile Page</h1>
            {user && <h2>Welcome, {user.email}</h2>}
            <button onClick={logout}>Logout</button>
        </div>
    );
}