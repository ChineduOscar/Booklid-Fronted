import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../../services/adminService";

const StatCard = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>

      <div className={`w-12 h-12 rounded-xl ${color}`} />
    </div>
  </div>
);

const AdminDashboard = () => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  const statsData = data?.data || {};

  const confirmedPercentage =
    statsData.totalOrders > 0
      ? (statsData.completedOrders / statsData.totalOrders) * 100
      : 0;

  const pendingPercentage =
    statsData.totalOrders > 0
      ? (statsData.pendingOrders / statsData.totalOrders) * 100
      : 0;

  const stats = [
    {
      title: "Total Orders",
      value: statsData.totalOrders || 0,
      color: "bg-blue-200",
    },
    {
      title: "Revenue",
      value: `₦${(statsData.totalRevenue || 0).toLocaleString()}`,
      color: "bg-green-200",
    },
    {
      title: "Total Users",
      value: statsData.totalUsers || 0,
      color: "bg-purple-200",
    },
    {
      title: "Successful Payments",
      value: statsData.completedPayments || 0,
      color: "bg-orange-200",
    },
  ];

  if (isLoading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-6">Order Status</h2>

          <div className="space-y-5">
            {/* Confirmed Orders */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  Confirmed Orders
                </span>
                <span className="font-bold text-green-600">
                  {statsData.completedOrders || 0}
                </span>
              </div>

              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all"
                  style={{ width: `${confirmedPercentage}%` }}
                />
              </div>
            </div>

            {/* Pending Orders */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  Pending Orders
                </span>
                <span className="font-bold text-orange-500">
                  {statsData.pendingOrders || 0}
                </span>
              </div>

              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full transition-all"
                  style={{ width: `${pendingPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <h2 className="font-bold text-gray-800 mb-2">
            Revenue Generated
          </h2>

          <p className="text-4xl font-extrabold text-green-600">
            ₦{(statsData.totalRevenue || 0).toLocaleString()}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Total revenue collected from successful payments
          </p>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Successful Payments</span>

              <span className="font-bold text-green-600">
                {statsData.completedPayments || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;