import { authApi } from "../lib/authAxios";

export const addToCart = async (bookId) => {
  const res = await authApi.post("/cart", {
    bookId,
    quantity: 1,
  });

  return res.data.data;
};

export const getCart = async () => {
  const res = await authApi.get("/cart");
  return res.data.data;
};

export const updateCart = async ({ bookId, quantity }) => {
  const res = await authApi.patch("/cart", {
    bookId,
    quantity,
  });

  console.log(res.data)
  return res.data.data;
};

export const removeFromCart = async (bookId) => {
  const res = await authApi.delete("/cart/item", {
    data: { bookId }, 
  });

  return res.data.data;
};

export const clearCart = async () => {
  const res = await authApi.delete("/cart");
  return res.data.data;
};