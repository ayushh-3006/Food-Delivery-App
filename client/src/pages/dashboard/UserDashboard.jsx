// import { useEffect, useState } from "react";
// import bgImg from "../../assets/bgImage1.png";
// import { useAuth } from "../../context/AuthContext";

// const UserDashboard = () => {
//   const user = useAuth();
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const data = JSON.parse(sessionStorage.getItem("UserData"));
//     setUserData(data);
//   }, []);

//   if (!userData) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-xl font-medium text-gray-600 bg-gray-50">
//         <div className="animate-pulse flex flex-col items-center gap-3">
//           <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
//           <span>Loading your profile...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-no-repeat selection:bg-orange-500/20"
//       style={{
//         backgroundImage: `url(${bgImg})`,
//       }}
//     >
//       {/* Cinematic Dark Overlay */}
//       <div className="min-h-screen bg-black/50 backdrop-blur-xs flex justify-center items-center p-4 md:p-8">
//         <div className="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl bg-white/90 backdrop-blur-xl border border-white/20 transition-all duration-300">
//           {/* Cover Header Banner */}
//           <div className="h-44 bg-linear-to-r from-amber-500 via-orange-500 to-red-500 relative">
//             <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white tracking-wide uppercase">
//               Customer Profile
//             </div>
//           </div>

//           {/* Profile & Identity Section */}
//           <div className="relative px-6 md:px-8 pt-16 pb-6 border-b border-gray-100">
//             {/* Absolute Profile Picture Placement */}
//             <div className="absolute -top-16 left-6 md:left-8">
//               {userData.photo ? (
//                 <img
//                   src={userData.photo}
//                   alt={userData.fullName}
//                   className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg object-cover ring-1 ring-black/5"
//                 />
//               ) : (
//                 <div
//                   className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg   
//                 bg-linear-to-br from-orange-400 to-amber-500 flex justify-center items-center text-4xl font-bold text-white"
//                 >
//                   {userData.fullName?.charAt(0).toUpperCase()}
//                 </div>
//               )}
//             </div>

//             {/* Name & Greeting */}
//             <div className="flex flex-col justify-between items-start gap-1">
//               <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
//                 {userData.fullName}
//               </h2>
//               <p className="text-sm text-gray-500 font-medium">
//                 Savoring life at{" "}
//                 <span className="text-orange-600 font-bold">Cravings 🍔</span>
//               </p>
//             </div>
//           </div>

//           {/* Details Grid Block */}
//           <div className="p-6 md:p-8 space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* Email */}
//               <div className="group bg-gray-50/60 hover:bg-orange-50/50 rounded-2xl p-4 border border-gray-100 hover:border-orange-200 transition-all duration-300">
//                 <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
//                   Email Address
//                 </p>
//                 <p className="text-gray-800 font-medium break-all text-sm sm:text-base">
//                   {userData.email}
//                 </p>
//               </div>

//               {/* Phone */}
//               <div className="group bg-gray-50/60 hover:bg-orange-50/50 rounded-2xl p-4 border border-gray-100 hover:border-orange-200 transition-all duration-300">
//                 <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
//                   Phone Number
//                 </p>
//                 <p className="text-gray-800 font-medium text-sm sm:text-base">
//                   {userData.phone || "Not provided"}
//                 </p>
//               </div>
//             </div>

//             {/* Account Metadata Row */}
//             <div className="flex items-center justify-between bg-gray-50/40 px-5 py-3.5 rounded-xl border border-gray-100 text-sm">
//               <span className="text-gray-500 font-medium">Status</span>
//               <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
//                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
//                 Active Member
//               </span>
//             </div>

//             {/* Action Triggers */}
//             <div className="mt-8 pt-2 flex flex-col sm:flex-row gap-3">
//               <button className="flex-1 bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer text-center">
//                 Edit Profile
//               </button>

//               <button className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-3.5 px-6 rounded-xl font-semibold hover:border-gray-300 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer text-center">
//                 My Orders
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useState } from "react";
import Sidebar from "../../components/UserDashboard/Sidebar";
import Overview from "../../components/UserDashboard/Overview";
import Orders from "../../components/UserDashboard/Orders";
import Settings from "../../components/UserDashboard/Settings";
import Wishlist from "../../components/UserDashboard/Wishlist";

const UserDashboard = () => {
  const [active, setActive] = useState("Overview");

  return (
    <>
      <div className="flex h-[92vh]">
        <div className="w-1/6 border border-red-500 h-full p-3">
          <Sidebar active={active} setActive={setActive} />
        </div>
        <div className="w-5/6 border border-green-500 h-full">
          {active === "Overview" && <Overview />}
          {active === "Orders" && <Orders />}
          {active === "Wishlist" && <Wishlist />}
          {active === "Settings" && <Settings />}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
