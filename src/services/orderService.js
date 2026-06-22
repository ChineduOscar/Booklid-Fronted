import { authApi } from "../lib/authAxios";

export const fetchOrders = async () => {
  const res = await authApi.get("/orders/admin/orders");
  console.log(res.data)
  return res.data.data;
};