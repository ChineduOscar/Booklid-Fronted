import { api } from "../lib/axios";
import { authApi } from "../lib/authAxios";

export const fetchBooks = async () =>{
    const res = await api.get('/books')
    return res.data.data
}

export const fetchBookById = async (id) =>{
    const res = await api.get(`/books/${id}`);
    return res.data.data
}

export const deleteBook = async (id) =>{
    const res = await authApi.delete(`/books/${id}`);
    return res.data
}

export const createBook = async (payload) => {
  const res = await authApi.post("/books", payload);
  return res.data;
};

export const updateBook = async (id, payload) => {
  const res = await authApi.patch(`/books/${id}`, payload);
  return res.data;
};