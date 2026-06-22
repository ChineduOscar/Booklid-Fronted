import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../services/paymentService";

const Payments = () => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  // Adjust this depending on your API response structure
  const payments = data?.data || data || [];

  const totalRevenue = payments
    .filter((p) => p.status === "successful")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const refundedAmount = payments
    .filter((p) => p.status === "refunded")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  if (isLoading) {
    return (
      <div className="p-8">
        <p>Loading payments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-500">Failed to load payments.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
        <p className="text-sm text-gray-400">
          Manage and track all financial transactions.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-400">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">
            ₦{totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-orange-500">
            ₦{pendingAmount.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-400">Refunded</p>
          <p className="text-2xl font-bold text-red-500">
            ₦{refundedAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Method</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {payments.length > 0 ? (
              payments.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {txn.transactionRef}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {txn.user.fullName}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {txn.paymentMethod || "—"}
                  </td>

                  <td className="px-6 py-4 font-bold text-gray-800">
                    ₦{txn.amount}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        txn.status === "successful"
                          ? "bg-green-100 text-green-600"
                          : txn.status === "pending"
                          ? "bg-orange-100 text-orange-600"
                          : txn.status === "refunded"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right text-gray-500 text-sm">
                    {new Date(txn.createdAt || txn.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;