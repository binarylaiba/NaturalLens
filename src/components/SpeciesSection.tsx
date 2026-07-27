import { useState, useMemo } from "react";
import { ANIMALS, Animal } from "../types";
import { Search, Compass, SlidersHorizontal, Eye, ShieldAlert, Heart, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SafeImage from "./SafeImage";

export default function SpeciesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Mammals", "Birds", "Reptiles", "Amphibians", "Fish"];

  const filteredAnimals = useMemo(() => {
    return ANIMALS.filter((animal) => {
      const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            animal.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            animal.habitat.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || animal.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Color mappings for conservation status
  const getStatusColorClass = (status: Animal["status"]) => {
    switch (status) {
      case "Critically Endangered":
        return "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900";
      case "Endangered":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-900";
      case "Vulnerable":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900";
      case "Near Threatened":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-300 dark:border-yellow-900";
      case "Least Concern":
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900";
    }
  };

  return (
    <section id="species-section-container" className="py-24 bg-sage-bg dark:bg-[#0E140F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="uppercase text-xs font-bold tracking-[0.3em] text-[#795548] dark:text-earth-light mb-3 block">
            Taxonomy Directory
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-forest-dark dark:text-neutral-50 tracking-tight leading-tight">
            Wildlife Species Database
          </h1>
          <div className="w-16 h-0.5 bg-[#2E7D32] dark:bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sage-text dark:text-neutral-400 font-sans font-light">
            Search, filter, and discover comprehensive biological parameters and ecological survival statuses of species from all corners of the globe.
          </p>
        </div>

        {/* Filter & Search Bar Panel */}
        <div className="bg-white/40 dark:bg-[#1B251D]/50 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/20 dark:border-white/10 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Box */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-text dark:text-neutral-400" />
              <input
                id="species-search-input"
                type="text"
                placeholder="Search species, scientific names, or habitats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0E140F] text-forest-dark dark:text-neutral-100 border border-white/20 dark:border-white/10 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-forest dark:focus:ring-emerald-500 transition-all shadow-sm"
              />
            </div>

            {/* Category pills list */}
            <div className="no-scrollbar overflow-x-auto w-full lg:w-auto flex items-center gap-2 py-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    id={`filter-pill-${cat.toLowerCase()}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all whitespace-nowrap focus:outline-none ${
                      isActive
                        ? "bg-[#2E7D32] text-white shadow-md dark:bg-emerald-600"
                        : "bg-[#795548]/10 hover:bg-[#795548]/15 text-[#795548] dark:bg-neutral-800 dark:hover:bg-neutral-750 dark:text-neutral-300"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <motion.div
          id="species-cards-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredAnimals.map((animal) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                key={animal.name}
                id={`species-card-${animal.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-md border border-white/20 dark:border-neutral-800 flex flex-col h-full group hover:shadow-xl hover:border-[#2E7D32]/20 dark:hover:border-emerald-500/20 transition-all"
              >
                {/* Image Area */}
                <div className="relative overflow-hidden aspect-[4/3] bg-neutral-100 dark:bg-neutral-950">
                  <SafeImage
                    src={animal.image}
                    alt={animal.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Category overlay */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#1B5E20]/90 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider rounded-full">
                    {animal.category}
                  </div>
                  {/* Status overlay */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColorClass(animal.status)}`}>
                    {animal.status}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Name header */}
                  <div className="mb-4">
                    <h3 className="font-serif font-bold text-xl text-forest-dark dark:text-neutral-100 group-hover:text-forest transition-colors">
                      {animal.name}
                    </h3>
                    <p className="font-serif italic text-xs text-[#795548] dark:text-earth-light mt-1">
                      {animal.scientificName}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="font-sans font-light text-sm text-[#5D6D5E] dark:text-neutral-300 leading-relaxed flex-grow">
                    {animal.description}
                  </p>

                  {/* Specification items */}
                  <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-3 text-xs">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-forest dark:text-emerald-400" />
                      <span className="font-sans font-medium text-neutral-400 dark:text-neutral-500 w-16">Habitat:</span>
                      <span className="font-sans font-semibold text-forest-dark dark:text-neutral-200 truncate flex-grow">
                        {animal.habitat}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#795548]" />
                      <span className="font-sans font-medium text-neutral-400 dark:text-neutral-500 w-16">Diet:</span>
                      <span className="font-sans font-semibold text-forest-dark dark:text-neutral-200 truncate">
                        {animal.diet}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#2E7D32]" />
                      <span className="font-sans font-medium text-neutral-400 dark:text-neutral-500 w-16">Lifespan:</span>
                      <span className="font-sans font-semibold text-forest-dark dark:text-neutral-200">
                        {animal.lifespan}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search State */}
        {filteredAnimals.length === 0 && (
          <div id="species-empty-state" className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 max-w-lg mx-auto">
            <Eye className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="font-serif font-bold text-lg text-forest-dark dark:text-white">
              No Wildlife Found
            </h3>
            <p className="font-sans text-sm text-[#5D6D5E] dark:text-neutral-400 mt-2 px-6">
              We couldn't find any species matching "{searchQuery}" in our {selectedCategory !== "All" ? `${selectedCategory} directory` : "database"}. Try checking spelling or resetting filters.
            </p>
            <button
              id="clear-filters-button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 px-6 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-colors focus:outline-none"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
