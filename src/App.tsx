import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import SpeciesSection from "./components/SpeciesSection";
import AINaturalistSection from "./components/AINaturalistSection";
import GallerySection from "./components/GallerySection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import { ArrowUp, Camera, Heart, Instagram, Facebook, Twitter, Youtube, Compass, ShieldCheck, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or default to light theme
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark";
    }
    return false;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Apply dark mode styling classes to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Handle loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Elegant preloading state
    return () => clearTimeout(timer);
  }, []);

  // Monitor scroll for Back-To-Top trigger
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Select matching active section
  const renderActiveSection = () => {
    switch (activeTab) {
      case "home":
        return <HomeSection onNavigate={setActiveTab} />;
      case "species":
        return <SpeciesSection />;
      case "ai":
        return <AINaturalistSection />;
      case "gallery":
        return <GallerySection />;
      case "about":
        return <AboutSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HomeSection onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sage-bg dark:bg-[#0E140F] text-forest-dark dark:text-neutral-100 transition-colors duration-350 select-none antialiased">
      {/* 1. Preloader Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="global-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-neutral-900 flex flex-col items-center justify-center gap-4 text-white"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-t-emerald-400 border-r-emerald-400 border-b-transparent border-l-transparent flex items-center justify-center"
            >
              <Camera className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="font-serif font-extrabold text-2xl tracking-[0.2em]">NATURELENS</h2>
              <p className="font-sans text-[10px] text-neutral-400 mt-2 uppercase tracking-[0.3em]">Synchronizing Canopy Feeds...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Primary Layout Elements */}
      {!loading && (
        <>
          {/* Header & Sticky Nav */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />

          {/* Master View Wrapper */}
          <main className="flex-grow pt-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Global Footer */}
          <footer id="global-footer" className="bg-neutral-900 text-neutral-400 pt-20 pb-8 border-t border-neutral-800 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-80 bg-forest/5 rounded-full filter blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                {/* Branding Block */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center shadow-lg">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-white">
                      Nature<span className="text-emerald-400">Lens</span>
                    </span>
                  </div>
                  <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                    A premium wildlife collaborative dedicated to tracking biodiversity parameters and creating rich visual testimonies that empower localized habitat conservation programs worldwide.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-900/35 px-4 py-2 rounded-2xl w-fit">
                    <ShieldCheck className="w-4 h-4" />
                    100% Ethical Field Clearances Guaranteed
                  </div>
                </div>

                {/* Navigation Links Column */}
                <div className="lg:col-span-3 lg:col-start-6 space-y-4">
                  <h4 className="font-serif font-bold text-sm text-white tracking-wide uppercase">
                    Taxonomy Portal
                  </h4>
                  <ul className="space-y-2.5 text-sm font-medium">
                    {["home", "species", "ai", "gallery", "about", "contact"].map((tab) => (
                      <li key={tab}>
                        <button
                          onClick={() => {
                            setActiveTab(tab);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`hover:text-emerald-400 transition-colors capitalize cursor-pointer focus:outline-none ${
                            activeTab === tab ? "text-emerald-400 font-bold" : "text-neutral-400"
                          }`}
                        >
                          {tab === "home" ? "Home Directory" : tab === "ai" ? "AI Naturalist Suite" : `${tab} profile`}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Communications / Socials */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white tracking-wide uppercase mb-4">
                      Satellite Dispatch
                    </h4>
                    <span className="font-sans text-sm block text-neutral-300">HQ: San Francisco, California</span>
                    <a href="mailto:field@naturelens.org" className="font-sans text-sm text-emerald-400 hover:underline block mt-1.5">
                      field@naturelens.org
                    </a>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-[10px] text-neutral-450 tracking-widest uppercase mb-3">
                      Follow Canopy Feeds
                    </h4>
                    <div className="flex items-center gap-3">
                      <a href="#instagram" className="p-2.5 rounded-xl bg-neutral-800 hover:bg-forest hover:text-white transition-all border border-neutral-750" aria-label="Instagram">
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a href="#facebook" className="p-2.5 rounded-xl bg-neutral-800 hover:bg-forest hover:text-white transition-all border border-neutral-750" aria-label="Facebook">
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a href="#twitter" className="p-2.5 rounded-xl bg-neutral-800 hover:bg-forest hover:text-white transition-all border border-neutral-750" aria-label="Twitter">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="#youtube" className="p-2.5 rounded-xl bg-neutral-800 hover:bg-forest hover:text-white transition-all border border-neutral-750" aria-label="YouTube">
                        <Youtube className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Copyright Row */}
              <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                <span>
                  &copy; {new Date().getFullYear()} NatureLens Foundation. All Rights Reserved. Photographed with ethical field guidelines.
                </span>
                <div className="flex items-center gap-1 text-neutral-500">
                  <span>Securing biodiversity with</span>
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>and focus.</span>
                </div>
              </div>
            </div>
          </footer>

          {/* Floating Controls: Theme Switcher & Scroll-To-Top */}
          <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
            <button
              id="floating-theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="px-3.5 py-2.5 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-100 shadow-xl border border-neutral-200/80 dark:border-neutral-700/80 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-xs font-bold cursor-pointer backdrop-blur-md"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  id="back-to-top"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  onClick={handleScrollToTop}
                  className="p-3 rounded-full bg-forest text-white shadow-xl hover:shadow-2xl hover:bg-forest-dark dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all cursor-pointer focus:outline-none"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
