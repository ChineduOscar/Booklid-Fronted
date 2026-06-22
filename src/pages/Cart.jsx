import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, clearCart, updateCart, removeFromCart } from "../services/cartService";
import { initializePayment } from "../services/paymentService";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Failed to clear cart"),
  });

  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onError: () => toast.error("Failed to remove item"),
  });

 const updateMutation = useMutation({
    mutationFn: updateCart,

    onMutate: async ({ bookId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData(["cart"]);

      queryClient.setQueryData(["cart"], (old) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.map((item) =>
            item.book._id === bookId
              ? { ...item, quantity }
              : item
          ),
        };
      });

      return { previousCart };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["cart"], context.previousCart);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const paymentMutation = useMutation({
    mutationFn: initializePayment,

    onSuccess: (data) => {
      window.location.href = data.authorization_url;
    },

    onError: () => {
      toast.error("Failed to initialize payment");
    },
  });

  const handleQty = (id, qty) => {
    if (qty < 1) return;
    updateMutation.mutate({ bookId: id, quantity: qty });
  };

  if (isLoading) return <p className="text-center py-20">Loading cart...</p>;
  if (error) return <p className="text-center py-20 text-red-500">Failed to load cart</p>;

  const items = cartItems.items || [];
  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-24 py-12">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Your <span className="text-orange-500">Cart</span>
            </h1>
            <p className="text-gray-500 text-sm">{totalQty} item{totalQty !== 1 ? "s" : ""} in your cart</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => clearCartMutation.mutate()}
              disabled={clearCartMutation.isPending}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors underline-offset-2 hover:underline disabled:opacity-50 cursor-pointer"
            >
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-500">Your cart is empty</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item?.book._id} className="bg-white rounded-2xl p-4 flex gap-4">
                  <div className="w-20 h-28 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={item?.book.image} alt={item?.book.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-xs text-gray-400 uppercase">{item?.book.category}</p>
                      <p className="font-semibold text-gray-800">{item?.book.title}</p>
                      <p className="text-xs text-gray-400">{item?.book.author}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-orange-500">₦{(Number(item.price) * item.quantity).toFixed(2)}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg">
                          <button
                            disabled={updateMutation.isPending || item.quantity <= 1}
                            onClick={() => handleQty(item?.book._id, item.quantity - 1)}
                            className="px-2 disabled:opacity-30 cursor-pointer"
                          >-</button>
                          <span>{item.quantity}</span>
                          <button
                            disabled={updateMutation.isPending}
                            onClick={() => handleQty(item?.book._id, item.quantity + 1)}
                            className="px-2 disabled:opacity-50 cursor-pointer"
                          >+</button>
                        </div>
                        <button
                          onClick={() => removeMutation.mutate(item?.book._id)}
                          disabled={removeMutation.isPending}
                          aria-label="Remove item"
                          className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-2xl h-fit">
              <h2 className="font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2"><span>Items</span><span>{totalQty}</span></div>
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span className="text-orange-500">₦{total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => paymentMutation.mutate()}
                disabled={paymentMutation.isPending || items.length === 0} 
                className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors cursor-pointer">
                  {paymentMutation.isPending ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;