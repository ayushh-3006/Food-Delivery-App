// import React, { useState } from "react";
// import deliveryboy from "../assets/deliveryboy.png";

// const Login = () => {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const [validateError, setValidateError] = useState();

//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;

//     setLoginData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Handle login logic here, e.g., send loginData to the server
//     //Validate loginData

//     console.log("Login data submitted:", loginData);

//     const payload = {
//       email: loginData.email.toLowerCase(),
//       password: loginData.password,
//     };
//   };

//   return (
//     <>
//       <div className="h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid grid-cols-2 p-10 ">
//         <div className="hidden md:block">
//           <img src={deliveryboy} alt="" className="rotate-y-180" />
//         </div>
//         <div className="w-md bg-(--background) rounded shadow p-10 flex flex-col justify-center">
//           <div>Welocome Back!</div>

//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-2">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={loginData.email}
//                 onChange={handleChange}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
//               />
//             </div>
//             <div className="flex flex-col gap-2 mt-4">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={loginData.password}
//                 onChange={handleChange}
//                 className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
//               />
//             </div>
//             <button
//               type="submit"
//               className="mt-6 bg-(--primary) text-white py-2 px-4 rounded hover:bg-(--accent)"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import LoginPage from "../assets/deliveryboy.png";
// import { FaUserCircle, FaLock, FaEnvelope } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isFormValid, setIsFormValid] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     const newErrors = {};

//     // Email Validation
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
//     ) {
//       newErrors.email = "Please enter a valid email";
//     }

//     // Password Validation
//     if (!formData.password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     setIsFormValid(Object.keys(newErrors).length === 0);
//   }, [formData]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isFormValid) return;

//     console.log("Login Data:", formData);

//     // API Call Here
//   };

//   return (
//     <div className="max-w-6xl mx-auto h-[90vh] flex items-center">
//       <div className="grid md:grid-cols-2 gap-10 w-full">
//         {/* Left Side */}
//         <div className="bg-(--background) flex justify-center shadow-xl items-center rounded-2xl p-6">
//           <img src={LoginPage} alt="Login" className="max-w-full h-auto" />
//         </div>

//         {/* Right Side */}
//         <div className="flex justify-center items-center">
//           <form
//             onSubmit={handleSubmit}
//             className="w-full max-w-md shadow-xl rounded-2xl p-8 bg-white"
//           >
//             {/* Icon */}
//             <div className="flex justify-center mb-4">
//               <FaUserCircle className="text-7xl text-(--primary)" />
//             </div>

//             <h2 className="text-3xl font-bold text-center mb-2">
//               Welcome Back
//             </h2>

//             {/* Email */}
//             <div className="mb-4">
//               <label className="block mb-2 font-medium">Email Address</label>

//               <div className="relative">
//                 <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 outline-none focus:border-(--primary)"
//                 />
//               </div>

//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="mb-4">
//               <label className="block mb-2 font-medium">Password</label>

//               <div className="relative">
//                 <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                   className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 outline-none focus:border-(--primary)"
//                 />
//               </div>

//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             <div className="flex justify-end mb-6">
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-(--primary) hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               disabled={!isFormValid}
//               className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
//                 isFormValid
//                   ? "bg-(--primary) hover:opacity-90"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Login
//             </button>

//             <p className="text-center mt-6 text-gray-600">
//               Don't have an account?{" "}
//               <Link
//                 to="/register"
//                 className="text-(--primary) font-semibold hover:underline"
//               >
//                 Register
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deliveryboy from "../assets/deliveryboy.png";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

const Login = () => {
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
