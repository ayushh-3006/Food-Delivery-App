import React, { useState } from 'react';
import { 
  MdOutlineFastfood, 
  MdOutlineReceipt, 
  MdOutlineSearch,
  MdCheckCircle,
  MdDirectionsRun,
  MdOutlineCancel
} from "react-icons/md";

const Orders = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const ordersData = [
    {
      id: "CRV-98231",
      restaurant: "Biryani Paradise",
      address: "Gachibowli, Hyderabad",
      date: "Today, 1:24 PM",
      items: "1x Special Chicken Biryani, 1x Garlic Naan",
      total: "$18.50",
      status: "In Transit",
      statusText: "Out for Delivery",
      payment: "Paid online",
    },
    {
      id: "CRV-97104",
      restaurant: "Pizza Express",
      address: "Madhapur, Hyderabad",
      date: "Yesterday",
      items: "1x Large Pepperoni Pizza, 2x Garlic Bread",
      total: "$24.90",
      status: "Delivered",
      statusText: "Delivered Yesterday",
      payment: "Paid online",
    },
    {
      id: "CRV-96582",
      restaurant: "The Burger Bistro",
      address: "Jubilee Hills, Hyderabad",
      date: "28 Jun 2026",
      items: "1x Double Cheese Burger Combo, 1x Chocolate Shake",
      total: "$14.20",
      status: "Delivered",
      statusText: "Delivered 28 Jun",
      payment: "Cash on Delivery",
    },
    {
      id: "CRV-95041",
      restaurant: "Subway Sandwiches",
      address: "Kondapur, Hyderabad",
      date: "15 Jun 2026",
      items: "1x Chicken Teriyaki Sub (6 inch), 1x Oatmeal Cookie",
      total: "$9.80",
      status: "Delivered",
      statusText: "Delivered 15 Jun",
      payment: "Paid online",
    },
    {
      id: "CRV-94210",
      restaurant: "Waffles & Co",
      address: "Banjara Hills, Hyderabad",
      date: "04 Jun 2026",
      items: "1x Triple Chocolate Waffle, 1x Maple Syrup Dip",
      total: "$11.50",
      status: "Cancelled",
      statusText: "Cancelled by User",
      payment: "Refunded to source",
    }
  ];

  // Filters
  const filteredOrders = ordersData.filter(order => {
    // Tab Filter
    if (filter === "active" && order.status !== "In Transit") return false;
    if (filter === "completed" && order.status !== "Delivered") return false;
    
    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.restaurant.toLowerCase().includes(query) ||
        order.items.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <MdCheckCircle className="text-emerald-500 text-sm" />;
      case "In Transit":
        return <MdDirectionsRun className="text-orange-500 text-sm animate-pulse" />;
      default:
        return <MdOutlineCancel className="text-rose-500 text-sm" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "text-emerald-700 bg-emerald-50 border-emerald-100";
      case "In Transit":
        return "text-orange-700 bg-orange-50 border-orange-100";
      default:
        return "text-rose-700 bg-rose-50 border-rose-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
          <MdOutlineReceipt className="text-orange-600 text-2xl" /> Order History
        </h2>
        <p className="text-sm text-zinc-500 font-medium mt-1">
          Review, track, or reorder your recent cravings.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-zinc-100 pb-4">
        {/* Tabs */}
        <div className="flex bg-zinc-100/80 p-1 rounded-xl w-full sm:w-auto">
          {[
            { id: "all", label: "All Orders" },
            { id: "active", label: "Active" },
            { id: "completed", label: "Completed" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition duration-200 cursor-pointer ${
                filter === tab.id
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
          <input
            type="text"
            placeholder="Search restaurant or food item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium text-zinc-800 placeholder-zinc-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white border border-zinc-100 rounded-xl overflow-hidden hover:border-zinc-200 hover:shadow-xs transition duration-200"
            >
              {/* Order Top Summary */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-zinc-50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-zinc-800 tracking-tight">{order.restaurant}</h3>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.statusText}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-medium">{order.address} • {order.date}</p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <p className="text-xs text-zinc-400 font-medium">Total Amount</p>
                  <p className="text-base font-extrabold text-zinc-800">{order.total}</p>
                </div>
              </div>

              {/* Order Details Body */}
              <div className="p-4 sm:p-5 bg-zinc-50/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider">{order.id}</span>
                  <p className="text-xs font-bold text-zinc-700 tracking-wide">{order.items}</p>
                  <p className="text-[10px] text-zinc-400 font-medium">Payment: {order.payment}</p>
                </div>

                <div className="flex gap-2.5 w-full sm:w-auto mt-2 sm:mt-0">
                  {order.status === "In Transit" ? (
                    <button className="flex-1 sm:flex-initial px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition duration-200 cursor-pointer text-center">
                      Track Order
                    </button>
                  ) : (
                    <button className="flex-1 sm:flex-initial px-5 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold text-xs rounded-xl transition duration-200 cursor-pointer text-center">
                      Reorder
                    </button>
                  )}
                  <button className="flex-1 sm:flex-initial px-4 py-2.5 bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-800 hover:border-zinc-300 font-bold text-xs rounded-xl transition duration-200 cursor-pointer text-center">
                    Get Help
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200">
            <div className="mx-auto w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-xl mb-3">
              <MdOutlineFastfood />
            </div>
            <h4 className="text-sm font-bold text-zinc-700">No orders found</h4>
            <p className="text-xs text-zinc-400 mt-1">Try resetting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;