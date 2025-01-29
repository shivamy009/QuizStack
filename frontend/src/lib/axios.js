import axios from "axios";
let url=import.meta.env.VITE_BASE_URL
export const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: `${url}/api`,
  withCredentials: true,
});