import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import { Toaster } from "react-hot-toast";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import RestaurantDashboard from "./pages/dashboard/RestaurantDashboard";
import RiderDashboard from "./pages/dashboard/RiderDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import { useAuth } from "./context/AuthContext";

const DashboardRedirect = () => {
  const { isLogin, user } = useAuth();

  if (!isLogin || !user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.userType) {
    case "admin":
      return <Navigate to="/admin-dashboard" replace />;
    case "rider":
      return <Navigate to="/rider-dashboard" replace />;
    case "restaurant":
      return <Navigate to="/restaurant-dashboard" replace />;
    case "customer":
    default:
      return <Navigate to="/customer-dashboard" replace />;
  }
};

const App = () => {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ContactUs" element={<ContactUs />} />

          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route
            path="/restaurant-dashboard"
            element={<RestaurantDashboard />}
          />
          <Route path="/rider-dashboard" element={<RiderDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user/dashboard" element={<DashboardRedirect />} />
          <Route path="/User/dashboard" element={<DashboardRedirect />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
