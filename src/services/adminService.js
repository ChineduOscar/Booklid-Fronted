import { authApi } from "../lib/authAxios";

export const getDashboardStats = async () => {
  const res = await authApi.get("/analytics");
  return res.data;
};