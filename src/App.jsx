import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import SignIn from "./pages/Signin";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import SingleBook from "./pages/SingleBook";
import Cart from "./pages/Cart";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Orders from "./pages/Admin/Orders";
import Users from "./pages/Admin/Users";
import Payments from "./pages/Admin/Payments";
import AllProducts from "./pages/Admin/AllProducts";
import AddProduct from "./pages/Admin/AddProducts";
import PaymentSuccess from "./pages/paymentSuccess";
import EditProduct from "./pages/Admin/EditProduct";
import ProtectedRoute from "./middleware/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/book/:id" element={<SingleBook />}></Route>
          <Route path="/payment/success" element={<PaymentSuccess />}></Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="payments" element={<Payments />} />
            <Route path="products" element={<AllProducts />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
          </Route>
        </Route>

        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
