import React from "react";
import { MdOutlineDashboard, MdOutlineFastfood } from "react-icons/md";
import { PiListHeartLight } from "react-icons/pi";
import { BsPersonGear } from "react-icons/bs";

const MenuItems = [
  { name: "Overview", icon: <MdOutlineDashboard /> },
  { name: "Orders", icon: <MdOutlineFastfood /> },
  { name: "Wishlist", icon: <PiListHeartLight /> },
  { name: "Settings", icon: <BsPersonGear /> },
];

const Sidebar = ({ active, setActive }) => {
  return (
    <>
     <div className="p-4 bg-white border border-zinc-200/60 rounded-2xl shadow-sm max-w-xs">
      {/* Title Header with a modern, clean saffron accent line */}
      <div className="pb-3 border-b border-zinc-100 text-center">
        <h2 className="text-sm font-extrabold tracking-widest text-zinc-400 uppercase">
          Account Panel
        </h2>
        <h1 className="text-xl font-black text-zinc-900 mt-0.5">
          User Dashboard
        </h1>
      </div>

      {/* Navigation Links List */}
      <div className="space-y-1.5 mt-5">
        {MenuItems.map((item, idx) => {
          const isActive = active === item.name;
          
          return (
            <button
              key={idx}
              onClick={() => setActive(item.name)}
              className={`
                flex items-center gap-3 w-full p-3.5 rounded-xl font-bold text-sm
                transition-all duration-200 outline-none group
                ${isActive 
                  ? "bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/5" 
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                }
              `}
            >
              {/* Icon component with smooth dynamic color state */}
              <div className={`
                text-lg transition-colors duration-200
                ${isActive ? "text-orange-600" : "text-zinc-400 group-hover:text-zinc-700"}
              `}>
                {item.icon}
              </div>

              <span className="tracking-wide">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Sidebar;