import axios from "axios";
import Cookies from "js-cookie";

export const authApi = axios.create({
  baseURL: "https://api-booklid-backend.onrender.com/api",
});

authApi.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  },
);
