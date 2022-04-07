import { useState } from "react";

export function SignupForm({
    submitFormAction,
    passwordAutocomplete,
    error = null,
}) {
    const [formState, setFormState] = useState({ name: "", email: "", password: "", role: "donor" });

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
            <label>Name:</label>
            <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="name"
                value={formState.name}
                onChange={handleFormState}
            />
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
            <button type="submit">Sign up!</button>
        </form>
    );
}