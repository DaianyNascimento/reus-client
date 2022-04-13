import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../consts";
import { SignupForm } from "../components/SignupForm";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [errorState, setErrorState] = useState();
    const navigate = useNavigate();

    const signup = async (formState) => {
        try {
            await axios.post(API_BASE_URL + "/auth/signup", formState);
            navigate("/login");
        } catch (err) {
            //console.log(err.response.data);
            setErrorState({ message: err.response.data.errorMessage });
        }
    };

    return (
        <div>
            <SignupForm
                submitFormAction={signup}
                passwordAutocomplete={"new-password"}
                error={errorState}
            />
        </div>
    );
}