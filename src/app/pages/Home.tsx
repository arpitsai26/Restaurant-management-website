import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Star, ArrowRight, ChevronLeft, ChevronRight, Heart, Clock, Leaf, Flame, Quote, TrendingUp, Award, Users, UtensilsCrossed } from "lucide-react";
import { menuItems, testimonials, chefs, stats, galleryImages } from "../data/mockData";
import { useApp } from "../context/AppContext";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
      <div className="w-1.5 h-1.5 bg-primary rotate-45" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex flex-col items-center gap-1 mb-3">
      <p className="text-xs tracking-[0.4em] uppercase text-primary font-medium">{children}</p>
      <GoldDivider />
    </div>
  );
}

export default function Home() {
  const [testimIdx, setTestimIdx] = useState(0);
  const { toggleFavorite, isFavorite } = useApp();
  const heroRef = useRef<HTMLDivElement>(null);

  const featured = menuItems.filter(m => m.isFeatured).slice(0, 3);
  const popular = menuItems.filter(m => m.isPopular).slice(0, 8);
  const chefSpecial = menuItems.find(m => m.isChefSpecial);
  const galleryPreview = galleryImages.filter(g => g.category === "Food" || g.category === "Interior").slice(0, 6);

  const prevTestim = () => setTestimIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const nextTestim = () => setTestimIdx(i => (i + 1) % testimonials.length);

  useEffect(() => {
    const id = setInterval(nextTestim, 5000);
    return () => clearInterval(id);
  }, []);

  const whyUs = [
    { icon: "🏆", title: "Michelin Recognised", desc: "Celebrated by international culinary guides for exceptional cuisine and service." },
    { icon: "🌿", title: "Farm to Table", desc: "Every ingredient is sourced directly from trusted farms and artisan producers." },
    { icon: "👨‍🍳", title: "World-Class Chefs", desc: "Our kitchen is led by chefs trained at Le Cordon Bleu and Michelin-starred kitchens." },
    { icon: "✨", title: "Unforgettable Ambiance", desc: "An intimate, candlelit dining room designed to make every meal a cherished memory." },
  ];

  return (
    <div className="bg-[#0a0a0a]">
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1414235048-3b47-4f0f-b5a3-b8b4c4c8b4c4?w=1920&h=1080&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <span className="text-xs tracking-[0.5em] uppercase text-primary font-medium">
              Est. 2013 · Bhubaneswar, Odisha
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-['Playfair_Display'] text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight mb-6"
          >
            A Culinary<br />
            <span className="text-primary italic">Journey</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#c8b89a] text-lg sm:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed"
          >
            Where ancient Indian tradition meets modern artistry. Every dish is a story. Every visit, a memory.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="px-8 py-4 bg-primary text-[#0a0a0a] font-semibold tracking-wide rounded-lg hover:bg-[#d4a843] transition-all duration-300 shadow-[0_0_30px_rgba(200,155,60,0.4)]"
            >
              Reserve Your Table
            </Link>
            <Link
              to="/menu"
              className="px-8 py-4 border border-[rgba(200,155,60,0.5)] text-[#f0ebe0] font-medium rounded-lg hover:border-primary hover:text-primary transition-all duration-300 backdrop-blur-sm"
            >
              Explore The Menu
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#5a5040]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
          />
        </div>
      </section>

      {/* ── Introduction ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0] mb-6 leading-tight">
              Where Every Dish Tells a Story
            </h2>
            <p className="text-[#7a7065] leading-relaxed mb-6">
              Founded in 2013 by Chef Arjun Kapoor, Grill & Thrill was born from a singular obsession — to present the extraordinary depth of Indian culinary heritage through the lens of contemporary fine dining. Over twelve years, we have earned international recognition while remaining true to the soul of our cooking.
            </p>
            <p className="text-[#7a7065] leading-relaxed mb-8">
              Our kitchen sources ingredients from trusted farms in Kerala, the Punjab, and Miyazaki — marrying the finest raw materials with classical technique. The result is a menu that is at once familiar and astonishing.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/about" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-200">
                Discover Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#141414]">
              <img
                src="https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=700&h=875&fit=crop&auto=format"
                alt="Grill & Thrill kitchen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent" />
            </div>
            {/* Floating award card */}
            <div className="absolute -bottom-6 -left-6 bg-[#141414] border border-[rgba(200,155,60,0.3)] rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-lg">★</div>
                <div>
                  <p className="text-xs text-[#7a7065] uppercase tracking-wider">Recognition</p>
                  <p className="text-[#f0ebe0] font-semibold text-sm">Michelin ★★</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Dishes ── */}
      <section className="py-24 bg-[#0d0d0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <SectionLabel>Signature Creations</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0]">
              Featured Dishes
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(200,155,60,0.35)] transition-all duration-400"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a14]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-4 right-4 w-9 h-9 bg-[#0a0a0a]/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-[rgba(200,155,60,0.2)] hover:border-primary transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(item.id) ? "fill-primary text-primary" : "text-[#c8b89a]"}`} />
                  </button>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium tracking-wide ${item.type === "veg" ? "bg-green-900/80 text-green-400" : "bg-red-900/80 text-red-400"}`}>
                      {item.type === "veg" ? <Leaf className="w-2.5 h-2.5 inline mr-1" /> : <Flame className="w-2.5 h-2.5 inline mr-1" />}
                      {item.type === "veg" ? "Veg" : "Non-Veg"}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-primary tracking-wider uppercase">{item.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                      <span className="text-xs text-[#c8b89a] font-medium">{item.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#f0ebe0] mb-2">{item.name}</h3>
                  <p className="text-sm text-[#7a7065] leading-relaxed mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">₹{item.price.toLocaleString("en-IN")}</span>
                    <div className="flex items-center gap-1 text-xs text-[#5a5040]">
                      <Clock className="w-3 h-3" /> {item.prepTime}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-[#0a0a0a] transition-all duration-300"
            >
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Chef's Special ── */}
      {chefSpecial && (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#141414]">
                <img
                  src={chefSpecial.image}
                  alt={chefSpecial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-primary rounded-full flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(200,155,60,0.5)]">
                <span className="text-[10px] text-[#5a3a00] font-bold tracking-wider uppercase leading-tight">Chef's<br />Special</span>
                <Star className="w-4 h-4 fill-[#5a3a00] text-[#5a3a00] mt-1" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel>Tonight's Signature</SectionLabel>
              <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0] mb-4 leading-tight">
                {chefSpecial.name}
              </h2>
              <p className="text-[#7a7065] leading-relaxed mb-6 text-lg">{chefSpecial.description}</p>
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <p className="text-xs text-[#5a5040] uppercase tracking-wider mb-1">Price</p>
                  <p className="text-3xl font-bold text-primary">₹{chefSpecial.price.toLocaleString("en-IN")}</p>
                </div>
                <div className="w-px h-12 bg-[rgba(200,155,60,0.2)]" />
                <div>
                  <p className="text-xs text-[#5a5040] uppercase tracking-wider mb-1">Rating</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(chefSpecial.rating) ? "fill-primary text-primary" : "text-[#3a3025]"}`} />
                    ))}
                  </div>
                </div>
                <div className="w-px h-12 bg-[rgba(200,155,60,0.2)]" />
                <div>
                  <p className="text-xs text-[#5a5040] uppercase tracking-wider mb-1">Prep Time</p>
                  <p className="text-[#c8b89a] font-medium">{chefSpecial.prepTime}</p>
                </div>
              </div>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#d4a843] transition-all duration-300 shadow-[0_0_30px_rgba(200,155,60,0.3)]"
              >
                Book to Experience This <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Popular Menu ── */}
      <section className="py-24 bg-[#0d0d0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <SectionLabel>Crowd Favourites</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0]">Popular Picks</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popular.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group flex gap-4 p-4 bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-xl hover:border-[rgba(200,155,60,0.3)] transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#1a1a14]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-[#f0ebe0] truncate mb-1">{item.name}</h4>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-xs text-[#7a7065]">{item.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-primary font-bold text-sm">₹{item.price.toLocaleString("en-IN")}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <SectionLabel>What They Say</SectionLabel>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0]">Voices of Our Guests</h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-2xl p-8 lg:p-12 text-center"
            >
              <Quote className="w-10 h-10 text-primary/30 mx-auto mb-6" />
              <p className="font-['Playfair_Display'] text-xl lg:text-2xl italic text-[#c8b89a] leading-relaxed mb-8">
                "{testimonials[testimIdx].review}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[testimIdx].avatar}
                  alt={testimonials[testimIdx].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                />
                <div className="text-left">
                  <p className="font-semibold text-[#f0ebe0]">{testimonials[testimIdx].name}</p>
                  <p className="text-sm text-[#7a7065]">{testimonials[testimIdx].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prevTestim} className="w-10 h-10 border border-[rgba(200,155,60,0.3)] rounded-full flex items-center justify-center text-[#c8b89a] hover:border-primary hover:text-primary transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimIdx(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === testimIdx ? "bg-primary w-6" : "bg-[#3a3025]"}`} />
              ))}
            </div>
            <button onClick={nextTestim} className="w-10 h-10 border border-[rgba(200,155,60,0.3)] rounded-full flex items-center justify-center text-[#c8b89a] hover:border-primary hover:text-primary transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ── */}
      <section className="py-24 bg-[#0d0d0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <SectionLabel>Visual Feast</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0]">A Glimpse of Grill & Thrill</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryPreview.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-xl bg-[#141414] ${i === 0 ? "sm:row-span-2 sm:col-span-1" : ""}`}
                style={{ aspectRatio: i === 0 ? "auto" : "1" }}
              >
                <img src={img.image} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 min-h-[160px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-sm font-medium text-[#f0ebe0]">{img.title}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/gallery" className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-[#0a0a0a] transition-all duration-300">
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <SectionLabel>Why Grill & Thrill</SectionLabel>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0]">The Grill & Thrill Difference</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-8 bg-[#0d0d0b] border border-[rgba(200,155,60,0.1)] rounded-2xl hover:border-[rgba(200,155,60,0.3)] transition-all duration-300 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#f0ebe0] mb-3">{item.title}</h3>
              <p className="text-sm text-[#7a7065] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-primary/5 border-y border-[rgba(200,155,60,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, value: stats.michelin, label: "Michelin Stars" },
              { icon: UtensilsCrossed, value: stats.dishesServed, label: "Dishes Served" },
              { icon: Users, value: stats.happyGuests, label: "Happy Guests" },
              { icon: TrendingUp, value: `${stats.yearsOfExcellence}+`, label: "Years of Excellence" },
            ].map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="font-['Playfair_Display'] text-4xl font-bold text-primary mb-1">{value}</p>
                <p className="text-sm text-[#7a7065] uppercase tracking-wider">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Chefs ── */}
      <section className="py-24 bg-[#0d0d0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <SectionLabel>The Culinary Team</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#f0ebe0]">Our Master Chefs</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chefs.map((chef, i) => (
              <motion.div
                key={chef.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#141414] mb-4">
                  <img src={chef.image} alt={chef.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-xs text-primary tracking-wider uppercase">{chef.speciality}</span>
                  </div>
                </div>
                <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#f0ebe0]">{chef.name}</h3>
                <p className="text-sm text-[#7a7065]">{chef.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reservation CTA ── */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1550966871-3ed3cccb7197?w=1920&h=600&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <SectionLabel>Begin Your Experience</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
              Reserve Your Table at Grill & Thrill
            </h2>
            <p className="text-[#c8b89a] text-lg mb-10 leading-relaxed">
              Join us for an evening of extraordinary flavours, impeccable service and memories that will last a lifetime. Available Wednesday through Sunday.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="px-10 py-4 bg-primary text-[#0a0a0a] font-bold tracking-wide rounded-lg hover:bg-[#d4a843] transition-all duration-300 shadow-[0_0_40px_rgba(200,155,60,0.5)]">
                Make a Reservation
              </Link>
              <a href="tel:+917890123456" className="px-10 py-4 border border-[rgba(200,155,60,0.5)] text-[#f0ebe0] font-medium rounded-lg hover:border-primary hover:text-primary transition-all duration-300">
                Call +91 78901 23456
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
