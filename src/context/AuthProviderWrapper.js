
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProviderWrapper(props) {
    const [user, setUser] = useState(null);

    const addUserToContext = (newUser) => {
        if (user !== null) return;
        setUser(newUser);
    };

    const removeUserFromContext = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, addUserToContext, removeUserFromContext }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}