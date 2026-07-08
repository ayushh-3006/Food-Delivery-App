
import React, { useState } from "react";
import Sidebar from "../../components/UserDashboard/Sidebar";
import Overview from "../../components/UserDashboard/Overview";
import Orders from "../../components/UserDashboard/Orders";
import Settings from "../../components/UserDashboard/Settings";
import Wishlist from "../../components/UserDashboard/Wishlist";

const UserDashboard = () => {
  const [active, setActive] = useState("Overview");

  return (
    <div className="min-h-[92vh] bg-zinc-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-stretch">
        {/* Sidebar Panel */}
        <div className="w-full md:w-64 shrink-0">
          <Sidebar active={active} setActive={setActive} />
        </div>

        {/* Dynamic Content Panel */}
        <div 
          className={`flex-1 rounded-2xl p-6 md:p-8 transition-all duration-300 ${
            active === "Settings" 
              ? "bg-neutral-950 border border-neutral-900 shadow-xl" 
              : "bg-white border border-zinc-200/60 shadow-sm"
          }`}
        >
          {active === "Overview" && <Overview setActive={setActive} />}
          {active === "Orders" && <Orders />}
          {active === "Wishlist" && <Wishlist />}
          {active === "Settings" && <Settings />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
