import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 20000,
  withCredentials: true,
});

export default axiosInstance;
