import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProviderWrapper";

export function Home() {
  const navigate = useNavigate();
  const { user, removeUserFromContext } = useContext(AuthContext);

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
      <h1>Home Page</h1>
      {user && <button onClick={logout}>Logout</button>}
    </div>
  );
}
