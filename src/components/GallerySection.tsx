import React, { useState, useMemo } from "react";
import { GALLERY_ITEMS, GalleryItem } from "../types";
import { X, ChevronLeft, ChevronRight, Eye, User, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SafeImage from "./SafeImage";

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Birds", "Mammals", "Forest", "Ocean", "Mountains"];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const openLightbox = (id: string) => {
    const idx = GALLERY_ITEMS.findIndex((item) => item.id === id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev! - 1));
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev! + 1));
    }
  };

  const activeImage: GalleryItem | null = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section id="gallery-section-container" className="py-24 bg-sage-bg dark:bg-[#0E140F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="uppercase text-xs font-bold tracking-[0.3em] text-[#795548] dark:text-earth-light mb-3 block">
            The Wild Canopy
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-forest-dark dark:text-neutral-50 tracking-tight leading-tight">
            Curated Wildlife Gallery
          </h1>
          <div className="w-16 h-0.5 bg-[#2E7D32] dark:bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sage-text dark:text-neutral-400 font-sans font-light">
            Explore breathtaking moments from the field. Click on any photograph to activate the Cinema Lightbox for immersive, full-screen study.
          </p>
        </div>

        {/* Category Pills Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`gallery-filter-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer focus:outline-none ${
                  isActive
                    ? "bg-[#2E7D32] text-white shadow-md dark:bg-emerald-600"
                    : "bg-white/40 text-[#795548] border border-white/20 hover:bg-white/60 dark:bg-neutral-900/50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-850"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry-Style Column Layout */}
        <motion.div
          id="gallery-masonry-grid"
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                id={`gallery-item-${item.id}`}
                onClick={() => openLightbox(item.id)}
                className="break-inside-avoid relative rounded-3xl overflow-hidden shadow-sm hover:shadow-lg bg-white dark:bg-neutral-900 border border-white/20 dark:border-neutral-800 cursor-zoom-in group"
              >
                {/* Lazy-loaded Image */}
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  containerClassName="w-full"
                  className="w-full object-cover rounded-3xl group-hover:scale-[1.03] transition-all duration-500"
                />

                {/* Ambient dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                {/* Floating Lens/Eye Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/25 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-5 h-5" />
                </div>

                {/* Caption Detail overlay (appears on hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-300 bg-emerald-400/20 px-2 py-0.5 rounded border border-emerald-400/20">
                    {item.category}
                  </span>
                  <h3 className="font-serif font-bold text-lg leading-tight mt-3">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-neutral-300">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.photographer}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div id="gallery-empty" className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl max-w-lg mx-auto border border-dashed border-neutral-200 dark:border-neutral-800">
            <ImageIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="font-serif font-bold text-lg text-forest-dark dark:text-white">
              No Photos in Category
            </h3>
            <p className="font-sans font-light text-sm text-[#5D6D5E] dark:text-neutral-400 mt-2 px-6">
              We currently do not have any visual documents under "{selectedCategory}" category. Check back later or explore other sections!
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Cinema Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            id="lightbox-cinema-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
          >
            {/* Close Button */}
            <button
              id="lightbox-close"
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Button */}
            <button
              id="lightbox-prev"
              onClick={prevImage}
              className="absolute left-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all focus:outline-none cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Button */}
            <button
              id="lightbox-next"
              onClick={nextImage}
              className="absolute right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all focus:outline-none cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            >
              <SafeImage
                src={activeImage.image}
                alt={activeImage.title}
                containerClassName="max-w-full max-h-[70vh] flex items-center justify-center"
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/5"
              />

              {/* Bottom Caption Block */}
              <div className="mt-6 text-center text-white max-w-lg">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/20">
                  {activeImage.category}
                </span>
                <h2 className="font-serif font-bold text-xl sm:text-2xl mt-4 leading-snug">
                  {activeImage.title}
                </h2>
                <p className="font-sans text-sm text-neutral-400 mt-2 flex items-center justify-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-400" />
                  Captured by <span className="text-neutral-200 font-semibold">{activeImage.photographer}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
