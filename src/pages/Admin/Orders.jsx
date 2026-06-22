import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../services/orderService";

const Orders = () => {
  const [filter, setFilter] = useState("All");

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter(
          (order) =>
            order.orderStatus?.toLowerCase() === filter.toLowerCase()
        );

  if (isLoading) {
    return <p className="text-center py-20">Loading orders...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-20 text-red-500">
        Failed to load orders.
      </p>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>

        <div className="flex gap-2">
          {["All", "Confirmed", "Pending"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {order.orderNumber || order._id}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {order.user?.fullName || "N/A"}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      order.orderStatus?.toLowerCase() === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : order.orderStatus?.toLowerCase() === "pending"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.orderStatus || "Unknown"}
                  </span>
                </td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  ₦{Number(order.total || 0).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;