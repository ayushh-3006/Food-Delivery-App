import React, { useState } from "react";
import { 
  MdOutlineFavorite, 
  MdOutlineSearch, 
  MdOutlineShoppingCart, 
  MdDeleteOutline,
  MdStar
} from "react-icons/md";
import toast from "react-hot-toast";

const CustomerWishlist = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "wish-1",
      name: "Special Chicken Biryani",
      restaurant: "Biryani Paradise",
      rating: 4.8,
      reviews: 120,
      price: "$14.50",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: "wish-2",
      name: "Pepperoni Feast Pizza",
      restaurant: "Pizza Express",
      rating: 4.6,
      reviews: 85,
      price: "$18.90",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: "wish-3",
      name: "Double Cheese Crispy Burger",
      restaurant: "The Burger Bistro",
      rating: 4.5,
      reviews: 210,
      price: "$9.50",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
    }
  ]);

  const handleRemoveItem = (id, name) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    toast.success(`${name} removed from wishlist`);
  };

  const handleAddToCart = (name) => {
    toast.success(`${name} added to cart!`);
  };

  const filteredItems = wishlistItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
          <MdOutlineFavorite className="text-red-500 text-2xl" /> My Wishlist
        </h2>
        <p className="text-sm text-zinc-500 font-medium mt-1">
          Save your favorite meals to order them quickly anytime.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-zinc-100 pb-4">
        <div className="relative w-full sm:max-w-xs">
          <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
          <input
            type="text"
            placeholder="Search saved items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium text-zinc-800 placeholder-zinc-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Wishlist Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-zinc-100 rounded-xl overflow-hidden hover:border-zinc-200 hover:shadow-xs transition duration-200 flex"
            >
              {/* Product Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Product Details */}
              <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-extrabold text-zinc-800 tracking-tight truncate">
                      {item.name}
                    </h3>
                    <button 
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-zinc-400 hover:text-red-500 p-1 rounded-lg hover:bg-zinc-50 transition duration-150 cursor-pointer"
                      title="Remove from Wishlist"
                    >
                      <MdDeleteOutline className="text-lg" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 font-semibold">{item.restaurant}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <MdStar className="text-amber-500 text-sm shrink-0" />
                    <span className="text-xs font-bold text-zinc-700">{item.rating}</span>
                    <span className="text-[10px] text-zinc-400 font-medium">({item.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <span className="text-base font-extrabold text-zinc-800">{item.price}</span>
                  <button 
                    onClick={() => handleAddToCart(item.name)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition duration-200 cursor-pointer"
                  >
                    <MdOutlineShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200">
            <div className="mx-auto w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-xl mb-3">
              <MdOutlineFavorite />
            </div>
            <h4 className="text-sm font-bold text-zinc-700">Your wishlist is empty</h4>
            <p className="text-xs text-zinc-400 mt-1">Explore and save your favorite food items!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerWishlist;
