import React from 'react';
import { useAuth } from "../../context/AuthContext";
import { 
  MdOutlineFastfood, 
  MdOutlineLocationOn, 
  MdOutlineKeyboardArrowRight,
  MdCheckCircleOutline
} from "react-icons/md";
import { PiListHeartLight } from "react-icons/pi";
import { BsPersonGear } from "react-icons/bs";

const Overview = ({ setActive }) => {
  const { user } = useAuth();
  
  // Custom greeting based on time of day
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 17) return "Good afternoon";
    return "Good evening";
  };

  const recentOrders = [
    {
      id: "CRV-98231",
      restaurant: "Biryani Paradise",
      date: "Today, 1:24 PM",
      items: "1x Special Chicken Biryani, 1x Garlic Naan",
      total: "$18.50",
      status: "Delivered",
      statusColor: "text-green-600 bg-green-50",
    },
    {
      id: "CRV-97104",
      restaurant: "Pizza Express",
      date: "Yesterday",
      items: "1x Large Pepperoni Pizza, 2x Garlic Bread",
      total: "$24.90",
      status: "Delivered",
      statusColor: "text-green-600 bg-green-50",
    },
    {
      id: "CRV-96582",
      restaurant: "The Burger Bistro",
      date: "4 days ago",
      items: "1x Double Cheese Burger Combo, 1x Chocolate Shake",
      total: "$14.20",
      status: "Delivered",
      statusColor: "text-green-600 bg-green-50",
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-linear-to-r from-orange-500/10 via-amber-500/5 to-transparent p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-200 shrink-0 shadow-md">
          {user?.photo ? (
            <img 
              src={user.photo} 
              alt={user.fullName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-orange-400 to-amber-500 flex items-center justify-center text-3xl font-extrabold text-white">
              {user?.fullName?.charAt(0).toUpperCase() || "C"}
            </div>
          )}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-600">
            Gold Member 👑
          </span>
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
            {getGreeting()}, {user?.fullName || "Foodie"}!
          </h2>
          <p className="text-sm text-zinc-500 font-medium">
            Satisfy your cravings today. You have <span className="text-orange-600 font-bold">12 loyalty points</span> to redeem!
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Orders */}
        <div className="bg-zinc-50/70 border border-zinc-100 rounded-xl p-5 hover:border-zinc-200 transition duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg text-xl">
              <MdOutlineFastfood />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Orders</p>
              <h4 className="text-xl font-extrabold text-zinc-800 mt-0.5">12 Placed</h4>
            </div>
          </div>
        </div>

        {/* Recent Order Status */}
        <div className="bg-zinc-50/70 border border-zinc-100 rounded-xl p-5 hover:border-zinc-200 transition duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg text-xl">
              <MdCheckCircleOutline />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Last Order Status</p>
              <h4 className="text-xl font-extrabold text-zinc-800 mt-0.5">Delivered</h4>
            </div>
          </div>
        </div>

        {/* Address card */}
        <div className="bg-zinc-50/70 border border-zinc-100 rounded-xl p-5 hover:border-zinc-200 transition duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg text-xl">
              <MdOutlineLocationOn />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Primary Address</p>
              <h4 className="text-sm font-bold text-zinc-800 mt-1 truncate">
                {user?.phone ? "123 Food Street, Tasty City" : "Not Provided"}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders List (Zomato inspired) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-extrabold text-zinc-800 tracking-tight">Recent Orders</h3>
            {setActive && (
              <button 
                onClick={() => setActive("Orders")}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-0.5 transition"
              >
                View all orders <MdOutlineKeyboardArrowRight />
              </button>
            )}
          </div>

          <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-xl overflow-hidden">
            {recentOrders.map((order, index) => (
              <div key={index} className="p-4 hover:bg-zinc-50/40 transition duration-200 flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider">{order.id}</span>
                  <h4 className="text-sm font-bold text-zinc-800">{order.restaurant}</h4>
                  <p className="text-xs text-zinc-500 font-medium">{order.items}</p>
                  <p className="text-[10px] text-zinc-400 font-medium mt-1">{order.date}</p>
                </div>
                <div className="text-right space-y-1.5 shrink-0">
                  <span className="text-sm font-extrabold text-zinc-800 block">{order.total}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions (Zomato inspired links) */}
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-zinc-800 tracking-tight">Quick Shortcuts</h3>
          <div className="grid grid-cols-1 gap-3">
            {setActive && (
              <>
                <button
                  onClick={() => setActive("Settings")}
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 hover:border-orange-100 hover:bg-orange-50/10 text-left transition group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg text-zinc-400 group-hover:text-orange-600 transition">
                      <BsPersonGear />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-zinc-800 block">Edit Profile</span>
                      <span className="text-[10px] text-zinc-400 font-medium">Update credentials & contact</span>
                    </div>
                  </div>
                  <MdOutlineKeyboardArrowRight className="text-zinc-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition" />
                </button>

                <button
                  onClick={() => setActive("Orders")}
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 hover:border-orange-100 hover:bg-orange-50/10 text-left transition group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg text-zinc-400 group-hover:text-orange-600 transition">
                      <MdOutlineFastfood />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-zinc-800 block">Order History</span>
                      <span className="text-[10px] text-zinc-400 font-medium">Reorder your past favorites</span>
                    </div>
                  </div>
                  <MdOutlineKeyboardArrowRight className="text-zinc-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition" />
                </button>

                <button
                  onClick={() => setActive("Wishlist")}
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 hover:border-orange-100 hover:bg-orange-50/10 text-left transition group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg text-zinc-400 group-hover:text-orange-600 transition">
                      <PiListHeartLight />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-zinc-800 block">My Wishlist</span>
                      <span className="text-[10px] text-zinc-400 font-medium">Loved dishes & restaurants</span>
                    </div>
                  </div>
                  <MdOutlineKeyboardArrowRight className="text-zinc-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;