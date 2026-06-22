import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../services/cartService";
import { toast } from "react-toastify";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const [loadingBookId, setLoadingBookId] = useState(null);

  const mutation = useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      setLoadingBookId(null);

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to add book to cart"
      );
      setLoadingBookId(null);
    },
  });

  const addToCartHandler = (bookId) => {
    setLoadingBookId(bookId);
    mutation.mutate(bookId);
  };

  return {
    addToCart: addToCartHandler,
    loadingBookId,
  };
};