import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deliveryboy from "../assets/deliveryboy.png";
import api from "../config/api.config.js";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { setUser, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validateError, setValidateError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear previous error when user types
    setValidateError("");
  };

  // Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!loginData.email || !loginData.password) {
      setValidateError("All fields are required");
      return;
    }

    console.log("Login data submitted:", loginData);

    // Payload
    const payload = {
      email: loginData.email.toLowerCase(),
      password: loginData.password,
    };

    try {
      const res = await api.post("/auth/login", payload);

      toast.success(res.data.message);
      console.log(res.data.data);

      sessionStorage.setItem("UserData", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
      navigate("/User/dashboard");

      console.log(res.data);

      //alert(res.data.message);

      // Optional: Store user data
      // localStorage.setItem("user", JSON.stringify(res.data.data));

      // Redirect after successful login
      //   navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error.response.status + "|" + error?.response?.data?.message);
    }
  };

  const inputClass =
    "border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)";

  return (
    <>
      <div className="min-h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid md:grid-cols-2 p-10">
        {/* Left Side */}
        <div className="hidden md:block">
          <img src={deliveryboy} alt="Delivery Boy" className="rotate-y-180" />
        </div>

        {/* Right Side */}
        <div className="w-full max-w-2xl bg-(--background) rounded shadow p-10 flex flex-col justify-center">
          <div className="text-3xl font-bold mb-2">Welcome Back!</div>

          <p className="text-gray-500 mb-6">Login to your account</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div className="col-span-2 flex flex-col gap-2">
              <label htmlFor="email">Email Address</label>

              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div className="col-span-2 flex flex-col gap-2">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={inputClass}
              />
            </div>

            {/* Error Message */}
            {validateError && (
              <p className="text-red-500 text-sm col-span-2">{validateError}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="col-span-2 mt-2 bg-(--primary) text-white py-2 px-4 rounded hover:bg-(--accent) transition"
            >
              Login
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-(--primary) hover:underline font-semibold"
              >
                Register here
              </button>
            </p>

            <p className="text-sm">
              Having Trouble?{" "}
              <button
                onClick={() => navigate("/contact")}
                className="text-(--primary) hover:underline font-semibold"
              >
                Contact Us
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
