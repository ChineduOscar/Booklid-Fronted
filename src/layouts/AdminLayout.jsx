import { Outlet } from "react-router-dom";
import AdminSideNav from "../common/AdminSideNav";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <AdminSideNav />

      <main className="flex-1 h-full overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;