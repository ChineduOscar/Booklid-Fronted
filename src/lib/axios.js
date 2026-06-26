import axios from "axios";

export const api = axios.create({
  baseURL: "https://booklid-backend.onrender.com/api",
});
