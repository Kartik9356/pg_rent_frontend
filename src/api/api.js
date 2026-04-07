import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true   // 🔥 Important for OTP login cookies
});

export default api;