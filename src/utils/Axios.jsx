import axios from "axios";
import { auth } from "../config/firebase";


const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://habit-tracker-server-liart.vercel.app";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken(false);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      console.warn("Failed to attach token to request:", err.message || err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
