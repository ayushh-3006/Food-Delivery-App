import React, { useState } from "react";
import { 
  MdOutlineFavorite, 
  MdOutlineSearch, 
  MdOutlineDelete, 
  MdOutlineShoppingCart,
  MdStar
} from "react-icons/md";

const CustomerWishlist = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const wishlistData = [
    {
      id: "WSH-001",
      name: "Special Chicken Biryani",
      restaurant: "Biryani Paradise",
      price: "$12.99",
      rating: 4.8,
      reviewsCount: 120,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80",
      description: "Fragrant basmati rice layered with juicy marinated chicken, slow-cooked in traditional Dum style.",
    },
    {
      id: "WSH-002",
      name: "Double Cheese Burger Combo",
      restaurant: "The Burger Bistro",
      price: "$9.50",
      rating: 4.6,
      reviewsCount: 85,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
      description: "Two flame-grilled beef patties, double cheddar cheese, lettuce, tomato, and bistro signature sauce.",
    },
    {
      id: "WSH-003",
      name: "Large Pepperoni Pizza",
      restaurant: "Pizza Express",
      price: "$16.99",
      rating: 4.7,
      reviewsCount: 210,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80",
      description: "Classic hand-tossed dough topped with rich tomato sauce, premium mozzarella, and loads of spicy pepperoni.",
    }
  ];

  const filteredItems = wishlistData.filter(item => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.restaurant.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
          <MdOutlineFavorite className="text-orange-600 text-2xl animate-pulse" /> My Wishlist
        </h2>
        <p className="text-sm text-zinc-500 font-medium mt-1">
          Your saved dishes and restaurants. Add them to your cart in one click.
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:border-zinc-200 hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 bg-zinc-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-3 right-3 p-2 bg-white/95 rounded-full text-rose-500 hover:bg-rose-50 border border-zinc-100 shadow-sm transition cursor-pointer"
                  title="Remove from Wishlist"
                >
                  <MdOutlineDelete className="text-lg" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 tracking-wider block uppercase">{item.restaurant}</span>
                      <h3 className="text-base font-extrabold text-zinc-800 tracking-tight mt-0.5">{item.name}</h3>
                    </div>
                    <span className="text-base font-black text-orange-600">{item.price}</span>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-50">
                  <div className="flex items-center gap-1">
                    <MdStar className="text-amber-500 text-base" />
                    <span className="text-xs font-bold text-zinc-800">{item.rating}</span>
                    <span className="text-[10px] text-zinc-400 font-medium">({item.reviewsCount} reviews)</span>
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition duration-200 cursor-pointer">
                    <MdOutlineShoppingCart className="text-sm" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200">
            <div className="mx-auto w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-xl mb-3">
              <MdOutlineFavorite />
            </div>
            <h4 className="text-sm font-bold text-zinc-700">Your wishlist is empty</h4>
            <p className="text-xs text-zinc-400 mt-1">Explore delicious food options and save your favorites here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerWishlist;
