import { useContext, useState } from "react";
import axios from "axios";
import { API_BASE_URL, getCsrfToken } from "../consts";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";

export function Login() {
    const [errorState, setErrorState] = useState();
    const navigate = useNavigate();
    const { addUserToContext } = useContext(AuthContext);
    const login = async (formState) => {
        try {
            const response = await axios.post(API_BASE_URL + "/auth/login", formState);
            addUserToContext(response.data.user);
            getCsrfToken();
            if(response.data.user.role === "donor"){
                navigate("/profile");
            } else {
                navigate("/");
            }
            
        } catch (err) {
            setErrorState({ message: err.response.data.errorMessage });
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginForm
                submitFormAction={login}
                passwordAutocomplete={"current-password"}
                error={errorState}
            />
        </div>
    );
}