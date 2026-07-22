import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "../data/mockData";
import type { GalleryImage } from "../data/mockData";

type GalleryCategory = "All" | GalleryImage["category"];
const categories: GalleryCategory[] = ["All", "Food", "Interior", "Chefs", "Events"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };
  const prev = () => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : 0);
  const next = () => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : 0);

  return (
    <div className="bg-[#0a0a0a] pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative h-56 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1550966871-3ed3cccb7197?w=1920&h=400&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-1">Visual Stories</p>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white">Gallery</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-[#0a0a0a] shadow-[0_0_15px_rgba(200,155,60,0.3)]"
                  : "bg-[#141414] border border-[rgba(200,155,60,0.15)] text-[#7a7065] hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
              <span className="ml-2 text-[10px] opacity-60">
                ({cat === "All" ? galleryImages.length : galleryImages.filter(g => g.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3"
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => openLightbox(i)}
                className="group relative rounded-xl overflow-hidden cursor-pointer break-inside-avoid bg-[#141414] mb-3"
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 4 === 0 ? "4/3" : "1" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30">
                      <ZoomIn className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-primary uppercase tracking-wider">{img.category}</span>
                    <p className="text-sm font-medium text-[#f0ebe0] mt-0.5">{img.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#141414] border border-[rgba(200,155,60,0.2)] flex items-center justify-center text-[#c8b89a] hover:text-primary transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#141414] border border-[rgba(200,155,60,0.2)] flex items-center justify-center text-[#c8b89a] hover:text-primary transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#141414] border border-[rgba(200,155,60,0.2)] flex items-center justify-center text-[#c8b89a] hover:text-primary transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              className="max-w-4xl max-h-[85vh] mx-auto px-14"
              onClick={e => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  <img
                    src={filtered[lightboxIndex].image}
                    alt={filtered[lightboxIndex].title}
                    className="max-h-[75vh] max-w-full object-contain rounded-xl mx-auto block"
                  />
                  <div className="mt-4 text-center">
                    <span className="text-xs text-primary uppercase tracking-wider">{filtered[lightboxIndex].category}</span>
                    <p className="text-[#f0ebe0] font-medium mt-1">{filtered[lightboxIndex].title}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#5a5040]">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
