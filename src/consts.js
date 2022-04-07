import axios from "axios";

axios.defaults.withCredentials = true;

export const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5005/api";

export async function getCsrfToken() {
    const { data } = await axios.get(API_BASE_URL + "/getCsrfToken");
    axios.defaults.headers.post["X-CSRF-Token"] = data.csrfToken;
}