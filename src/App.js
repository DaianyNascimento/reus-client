import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getCsrfToken } from "./consts";
import { Custom404Page } from "./pages/Custom404Page";
import { Home } from "./pages/Home";
import { LayoutComponent } from "./components/LayoutComponent";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";

export default function App() {
  useEffect(() => {
    getCsrfToken();
  }, []);

  return (
    <div>
      <Routes>
        <Route element={<LayoutComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Custom404Page />} />
        </Route>
      </Routes>
    </div>
  );
}
