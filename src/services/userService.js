import { authApi } from "../lib/authAxios";

export const fetchUsers = async () => {
  const res = await authApi.get("/users");
  return res.data;
};

export const updateUsers = async ({id, role}) => {
  const res = await authApi.patch(`/users/${id}`, { role })
  return res.data;
};