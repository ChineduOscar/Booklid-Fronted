import { authApi } from "../lib/authAxios";

export const initializePayment = async () => {
  const res = await authApi.post("/payment/initialize");
  return res.data;
};

export const verifyPayment = async (reference) => {
  const res = await authApi.get(`/payment/verify/${reference}`);
  return res.data;
};

export const getPayments = async () => {
  const res = await authApi.get("/payment/admin/all");
  console.log(res.data.data)
  return res.data.data;
}