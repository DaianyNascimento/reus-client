import { useState } from "react";
import { Button } from 'antd';

export function LoginForm({
    submitFormAction,
    passwordAutocomplete,
    error = null,
}) {
    const [formState, setFormState] = useState({ email: "", password: "", role: "donor" });

    const handleFormState = (event) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitFormAction(formState);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error.message}</p>}
            <label>Are you donor or donee?</label>
            <select name="role" onChange={handleFormState}>
                <option value="donor">donor</option>
                <option value="donee">donee</option>
            </select>
            <label>E-mail:</label>
            <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="e-mail"
                value={formState.email}
                onChange={handleFormState}
            />
            <label>Password:</label>
            <input
                type="password"
                name="password"
                autoComplete={passwordAutocomplete}
                placeholder="password"
                value={formState.password}
                onChange={handleFormState}
            />
            <button type="submit">Login!</button>
        </form>
    );
}