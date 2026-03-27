import axios, { AxiosHeaders } from "axios";
import { auth } from "../config/firebase";

const api = axios.create({
  baseURL: "https://habit-tracker-server-liart.vercel.app",
});

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers = config.headers ?? new AxiosHeaders();
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
