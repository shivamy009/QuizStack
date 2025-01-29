import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://quizstack.onrender.com/api",
  withCredentials: true,
});