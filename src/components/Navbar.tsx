import { useState, useEffect } from "react";
import { Camera, Sun, Moon, Menu, X, Compass, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ activeTab, setActiveTab, darkMode, toggleDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "species", label: "Species" },
    { id: "ai", label: "AI Naturalist", isAi: true },
    { id: "gallery", label: "Gallery" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background shift
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/90 dark:bg-[#0E140F]/85 shadow-sm py-4 border-b border-neutral-200/80 dark:border-neutral-800"
          : "bg-transparent py-6"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 dark:bg-black/20">
        <motion.div
          className="h-full bg-forest dark:bg-emerald-500"
          style={{ scaleX: scrollProgress }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Camera className="w-4 h-4 text-white" />
              <motion.div
                className="absolute inset-0 rounded-full border border-forest opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span className="font-serif font-extrabold text-2xl tracking-tight text-forest-dark dark:text-neutral-50 flex items-center gap-1">
              Nature<span className="text-forest dark:text-emerald-400">Lens</span>
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id} className="relative">
                    <button
                      id={`nav-link-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`font-sans text-xs font-bold uppercase tracking-widest transition-colors py-2 focus:outline-none cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? "text-forest dark:text-emerald-400 font-bold border-b-2 border-forest dark:border-emerald-400"
                          : "text-sage-text hover:text-forest dark:text-neutral-300 dark:hover:text-emerald-400"
                      }`}
                    >
                      {item.isAi && <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />}
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Dark/Light Mode Switcher and CTA */}
            <div className="flex items-center gap-3 pl-4 border-l border-neutral-200/60 dark:border-neutral-800">
              <div 
                id="desktop-dark-mode-toggle"
                onClick={toggleDarkMode}
                className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300/60 dark:border-neutral-700/60 cursor-pointer select-none transition-all"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all ${!darkMode ? "bg-white text-forest shadow-sm" : "text-neutral-400 hover:text-neutral-200"}`}>
                  <Sun className={`w-3.5 h-3.5 ${!darkMode ? "text-amber-500 fill-amber-400" : ""}`} />
                  <span>Light</span>
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all ${darkMode ? "bg-emerald-600 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}>
                  <Moon className={`w-3.5 h-3.5 ${darkMode ? "text-emerald-200 fill-emerald-200" : ""}`} />
                  <span>Dark</span>
                </div>
              </div>

              <button
                id="nav-cta-button"
                onClick={() => handleNavClick("gallery")}
                className="px-5 py-2 bg-forest text-white rounded-full font-bold text-xs hover:bg-forest-dark dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-md shadow-green-900/10 hover:shadow-lg uppercase tracking-widest transition-all focus:outline-none cursor-pointer"
              >
                Explore Gallery
              </button>
            </div>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="mobile-dark-mode-toggle"
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-neutral-600" />}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-50 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-sans text-base font-medium transition-colors ${
                      isActive
                        ? "bg-forest/10 text-forest dark:bg-emerald-500/10 dark:text-emerald-400 font-semibold"
                        : "text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                <div 
                  id="mobile-drawer-dark-mode-toggle"
                  onClick={toggleDarkMode}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 cursor-pointer"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                    Display Theme
                  </span>
                  <div className="flex items-center gap-1">
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${!darkMode ? "bg-white text-forest shadow-sm" : "text-neutral-400"}`}>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Light</span>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${darkMode ? "bg-emerald-600 text-white shadow-sm" : "text-neutral-400"}`}>
                      <Moon className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Dark</span>
                    </div>
                  </div>
                </div>

                <button
                  id="mobile-nav-cta"
                  onClick={() => handleNavClick("contact")}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-forest text-white hover:bg-forest-dark dark:bg-emerald-600 dark:hover:bg-emerald-500 font-medium text-sm transition-all shadow-md"
                >
                  <Compass className="w-4 h-4" />
                  Get in Touch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
