import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";

export function LayoutComponent() {
    const { user } = useContext(AuthContext);

    const determineStyle = ({ isActive }) => {
        return {
            textDecoration: isActive ? "underline" : "none",
        };
    };

    return (
        <div>
            <nav>
                {user ? (
                    <>
                        <NavLink style={determineStyle} to="/">
                            Home
                        </NavLink>
                        <NavLink style={determineStyle} to="/profile">
                            Profile
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink style={determineStyle} to="/login">
                            Login
                        </NavLink>
                        <NavLink style={determineStyle} to="/signup">
                            Signup
                        </NavLink>
                    </>
                )}
            </nav>
            <Outlet />
        </div>
    );
}