import axios, { AxiosHeaders } from "axios";
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
          config.headers = config.headers ?? new AxiosHeaders();
          config.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : err;
      console.warn("Failed to attach token to request:", message);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
