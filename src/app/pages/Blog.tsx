import { useState } from "react";
import { motion } from "motion/react";
import { Clock, Tag, ArrowRight, Search } from "lucide-react";
import { blogPosts } from "../data/mockData";

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))];

  const filtered = blogPosts.filter(p => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const [featured, ...rest] = filtered;

  return (
    <div className="bg-[#0a0a0a] pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative h-56 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1920&h=400&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-1">Stories & Insights</p>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white">The Journal</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7065]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-xl text-[#f0ebe0] placeholder:text-[#5a5040] focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  activeCategory === cat
                    ? "bg-primary text-[#0a0a0a]"
                    : "bg-[#141414] border border-[rgba(200,155,60,0.15)] text-[#7a7065] hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#5a5040] font-['Playfair_Display'] text-xl">No articles found.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group grid lg:grid-cols-2 gap-0 bg-[#141414] border border-[rgba(200,155,60,0.15)] rounded-2xl overflow-hidden mb-8 hover:border-[rgba(200,155,60,0.35)] transition-all duration-400 cursor-pointer"
              >
                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#1a1a14]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs px-3 py-1.5 bg-primary text-[#0a0a0a] rounded-full font-semibold">Featured</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs text-primary uppercase tracking-wider mb-2">{featured.category}</span>
                  <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#f0ebe0] mb-3 leading-tight">{featured.title}</h2>
                  <p className="text-[#7a7065] text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-[#5a5040] mb-6">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                    <span>{featured.author}</span>
                    <span>{featured.date}</span>
                  </div>
                  <button className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-4 transition-all duration-200">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Article Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-[#141414] border border-[rgba(200,155,60,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(200,155,60,0.35)] transition-all duration-400 cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1a14]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-primary uppercase tracking-wider">{post.category}</span>
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#f0ebe0] mt-2 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-[#5a5040] leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-[#3a3025]">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
