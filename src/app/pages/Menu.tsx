import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Star, Heart, Clock, Leaf, Flame, SlidersHorizontal, X, ChefHat } from "lucide-react";
import { menuItems, menuCategories } from "../data/mockData";
import type { MenuCategory } from "../data/mockData";
import { useApp } from "../context/AppContext";

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
      <div className="w-1.5 h-1.5 bg-primary rotate-45" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [priceMax, setPriceMax] = useState(3500);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");
  const [showFilters, setShowFilters] = useState(false);
  const { toggleFavorite, isFavorite, menuItems: contextMenuItems } = useApp();

  const displayItems = useMemo(() => {
    let items = [...contextMenuItems];

    if (activeCategory !== "All") items = items.filter(i => i.category === activeCategory);
    if (typeFilter !== "all") items = items.filter(i => i.type === typeFilter);
    if (search) items = items.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase())
    );
    items = items.filter(i => i.price <= priceMax);

    if (sortBy === "price-asc") items.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") items.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") items.sort((a, b) => b.rating - a.rating);

    return items;
  }, [contextMenuItems, activeCategory, search, typeFilter, priceMax, sortBy]);

  return (
    <div className="bg-[#0a0a0a] pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative h-64 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504674900-67893bce14c3?w=1920&h=400&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-2">Crafted With Passion</p>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-6xl font-bold text-white">The Menu</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7065]" />
            <input
              type="text"
              placeholder="Search dishes, ingredients..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-xl text-[#f0ebe0] placeholder:text-[#5a5040] focus:outline-none focus:border-primary transition-colors text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a5040] hover:text-[#c8b89a]">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-3 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-xl text-[#c8b89a] text-sm focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-sm transition-all duration-200 ${
                showFilters ? "border-primary text-primary bg-primary/5" : "border-[rgba(200,155,60,0.15)] text-[#c8b89a]"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-5 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-xl flex flex-col sm:flex-row gap-6">
                <div>
                  <p className="text-xs text-[#7a7065] uppercase tracking-wider mb-3">Dietary</p>
                  <div className="flex gap-2">
                    {(["all", "veg", "non-veg"] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setTypeFilter(t)}
                        className={`px-4 py-2 text-xs rounded-lg border transition-all duration-200 capitalize ${
                          typeFilter === t ? "border-primary bg-primary/10 text-primary" : "border-[rgba(200,155,60,0.15)] text-[#7a7065]"
                        }`}
                      >
                        {t === "all" ? "All" : t === "veg" ? "🌿 Vegetarian" : "🔥 Non-Veg"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#7a7065] uppercase tracking-wider mb-3">
                    Max Price: <span className="text-primary font-bold">₹{priceMax}</span>
                  </p>
                  <input
                    type="range"
    min={0}
    max={3500}
                    value={priceMax}
                    onChange={e => setPriceMax(Number(e.target.value))}
                    className="w-full accent-[#C89B3C] cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-[#5a5040] mt-1">
                    <span>₹0</span><span>₹3,500</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-none">
          {(["All", ...menuCategories] as (MenuCategory | "All")[]).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 font-medium flex-shrink-0 ${
                activeCategory === cat
                  ? "bg-primary text-[#0a0a0a] shadow-[0_0_20px_rgba(200,155,60,0.3)]"
                  : "bg-[#141414] border border-[rgba(200,155,60,0.15)] text-[#7a7065] hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#5a5040]">
            Showing <span className="text-primary font-medium">{displayItems.length}</span> dishes
            {activeCategory !== "All" && <span> in <span className="text-[#c8b89a]">{activeCategory}</span></span>}
          </p>
          {(search || typeFilter !== "all" || priceMax < 100) && (
            <button
              onClick={() => { setSearch(""); setTypeFilter("all"); setPriceMax(100); setActiveCategory("All"); }}
              className="text-xs text-[#7a7065] hover:text-primary flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Clear all filters
            </button>
          )}
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="popLayout">
          {displayItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[#5a5040] text-lg font-['Playfair_Display']">No dishes match your filters.</p>
              <p className="text-sm text-[#3a3025] mt-2">Try adjusting your search or filters.</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {displayItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.4) }}
                  className="group bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(200,155,60,0.35)] transition-all duration-400"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a14]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium inline-flex items-center gap-1 ${
                        item.type === "veg" ? "bg-green-950/90 text-green-400 border border-green-800/40" : "bg-red-950/90 text-red-400 border border-red-800/40"
                      }`}>
                        {item.type === "veg" ? <Leaf className="w-2.5 h-2.5" /> : <Flame className="w-2.5 h-2.5" />}
                        {item.type === "veg" ? "Veg" : "Non-Veg"}
                      </span>
                      {item.isChefSpecial && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium inline-flex items-center gap-1 bg-primary/90 text-[#0a0a0a]">
                          <ChefHat className="w-2.5 h-2.5" /> Chef's Special
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-[#0a0a0a]/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-[rgba(200,155,60,0.2)] hover:border-primary transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFavorite(item.id) ? "fill-primary text-primary" : "text-[#c8b89a]"}`} />
                    </button>

                    {!item.available && (
                      <div className="absolute inset-0 bg-[#0a0a0a]/60 flex items-center justify-center">
                        <span className="text-sm font-medium text-[#5a5040] bg-[#141414] px-3 py-1 rounded-full border border-[rgba(200,155,60,0.2)]">
                          Unavailable
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-primary tracking-wider uppercase">{item.category}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-xs text-[#7a7065]">{item.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h3 className="font-['Playfair_Display'] text-base font-semibold text-[#f0ebe0] mb-1.5 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-[#5a5040] leading-relaxed mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">₹{item.price.toLocaleString("en-IN")}</span>
                      <div className="flex items-center gap-1 text-xs text-[#3a3025]">
                        <Clock className="w-3 h-3" /> {item.prepTime}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
