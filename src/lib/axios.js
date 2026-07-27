import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-booklid-backend.onrender.com/api",
});
