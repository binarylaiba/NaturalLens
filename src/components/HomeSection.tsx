import React, { useState } from "react";
import { FEATURED_BIRDS, PHOTOGRAPHERS } from "../types";
import { ArrowRight, Flame, ShieldAlert, Heart, Globe, Users, Trophy, Leaf, Send, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import SafeImage from "./SafeImage";

interface HomeSectionProps {
  onNavigate: (tab: string) => void;
}

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const stats = [
    { value: "15,400+", label: "Protected Species", icon: <Leaf className="w-6 h-6 text-emerald-500" /> },
    { value: "128", label: "Global Sanctuaries", icon: <Globe className="w-6 h-6 text-blue-500" /> },
    { value: "$4.8M+", label: "Funds Donated", icon: <Trophy className="w-6 h-6 text-amber-500" /> },
    { value: "45k+", label: "Citizen Rangers", icon: <Users className="w-6 h-6 text-rose-500" /> }
  ];

  const coreValues = [
    {
      icon: <Globe className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
      title: "Ecosystem Stability",
      desc: "Every species, from small insects to apex predators, plays a pivotal role in maintaining the biological balance of air, water, and food loops."
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
      title: "Climatic Resiliency",
      desc: "Healthy forests, wetlands, and grasslands act as vital carbon sinks, heavily regulated and protected by native wildlife actions."
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
      title: "Preserving Heritage",
      desc: "Allowing bio-abundance to decline degrades our cultural identity and breaks the natural evolutionary lines we have inherited."
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero Section */}
      <section
        id="hero-section"
        className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=1600")`
        }}
      >
        {/* Parallax Overlay and visual styling */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-900/30 to-neutral-900/80 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-6"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Empowering Biodiversity Conservation
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif font-extrabold text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-[0.95] mb-6"
          >
            Discover the <br />
            <span className="text-[#81C784] italic font-serif font-medium">Beauty</span> of <br />
            Wildlife
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-sans text-lg sm:text-xl text-neutral-200 font-light max-w-2xl mb-10 leading-relaxed drop-shadow-sm"
          >
            Explore breathtaking bird photography and discover amazing animal species from around the world through our curated professional lens.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-cta-ai"
              onClick={() => onNavigate("ai")}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-sm shadow-lg shadow-emerald-900/30 uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 group focus:outline-none"
            >
              <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span>Try AI Naturalist</span>
            </button>
            <button
              id="hero-cta-gallery"
              onClick={() => onNavigate("gallery")}
              className="px-8 py-4 bg-forest hover:bg-forest-dark text-white rounded-full font-bold text-sm shadow-lg shadow-green-900/20 uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 group focus:outline-none"
            >
              Explore Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-cta-species"
              onClick={() => onNavigate("species")}
              className="px-8 py-4 border-2 border-white hover:bg-white hover:text-[#1B5E20] text-white rounded-full font-bold text-sm uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 focus:outline-none"
            >
              View Species
            </button>
          </motion.div>
        </div>

        {/* Bottom Decorative Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sage-bg dark:from-[#0E140F] to-transparent pointer-events-none" />
      </section>

      {/* 2. Featured Bird Photography Section */}
      <section id="featured-birds" className="py-24 bg-sage-bg dark:bg-[#0E140F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="uppercase text-xs font-bold tracking-[0.3em] text-[#795548] dark:text-earth-light mb-3 block">
              Premium Wildlife Collective
            </span>
            <h2 className="font-serif font-extrabold text-3xl sm:text-5xl text-forest-dark dark:text-neutral-50 tracking-tight">
              Featured Bird Photography
            </h2>
            <div className="w-16 h-0.5 bg-[#2E7D32] dark:bg-emerald-500 mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-sage-text dark:text-neutral-400 font-sans font-light text-base leading-relaxed">
              Explore breathtaking bird photography and discover amazing animal species from around the world through our curated professional lens.
            </p>
          </div>

          <div id="bird-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_BIRDS.map((bird, idx) => (
              <motion.div
                key={bird.name}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-md hover:shadow-xl border border-white/25 dark:border-neutral-800 transition-all flex flex-col h-full group transform ${
                  idx % 2 === 0 ? "rotate-1" : "-rotate-1"
                } hover:rotate-0`}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/3] rounded-xl bg-neutral-100 dark:bg-neutral-800">
                  <SafeImage
                    src={bird.image}
                    alt={bird.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#1B5E20]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                    {bird.habitat.split(",")[0]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-3">
                    <h3 className="font-serif font-bold text-lg text-forest-dark dark:text-white leading-tight group-hover:text-forest transition-colors">
                      {bird.name}
                    </h3>
                    <p className="font-serif italic text-xs text-[#795548] dark:text-earth-light mt-1">
                      {bird.scientificName}
                    </p>
                  </div>
                  <p className="font-sans font-light text-sm text-[#5D6D5E] dark:text-neutral-300 leading-relaxed flex-grow">
                    {bird.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-xs">
                    <span className="font-medium text-neutral-400 dark:text-neutral-500">Habitat:</span>
                    <span className="font-semibold text-forest dark:text-emerald-400">{bird.habitat}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Naturalist Feature Banner */}
      <section id="ai-naturalist-promo" className="py-20 bg-gradient-to-br from-emerald-950 via-neutral-900 to-forest text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-xs tracking-wider uppercase border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Next-Gen Field Intelligence</span>
              </div>
              <h2 className="font-serif font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
                Identify Wildlife Instantly &amp; Chat with AI Naturalists
              </h2>
              <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
                Upload any nature photograph or choose from our species catalog to receive instant biological taxonomy, conservation status, field identification traits, EXIF photo critique, and atmospheric expedition journal logs.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate("ai")}
                  className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch AI Naturalist Suite</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Leaf className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-white">Species Recognition</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Identify flora, fauna, and birds from any photo with biological accuracy.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-white">Naturalist Q&amp;A</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Chat with an AI biologist on ecology, tracking, and camera settings.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Trophy className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-white">EXIF &amp; Photo Review</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Get aperture, shutter, and composition feedback for wildlife shots.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-white">Expedition Journal</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Synthesize field notes with acoustic and behavioral observations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Wildlife Matters Section */}
      <section id="why-wildlife-matters" className="py-24 bg-white dark:bg-[#121B14] relative overflow-hidden border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square"
            >
              <img
                src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800"
                alt="Dappled sunlight in dynamic forest"
                referrerPolicy="no-referrer"
                className="object-cover w-full h-full animate-pulse-slow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <p className="font-serif text-lg font-bold italic">"In nature, nothing exists alone."</p>
                <p className="font-sans text-xs text-neutral-200 mt-1 uppercase tracking-wider">— Rachel Carson, Silent Spring</p>
              </div>
            </motion.div>

            {/* Explanatory side */}
            <div>
              <span className="uppercase text-xs font-bold tracking-[0.3em] text-[#795548] dark:text-earth-light mb-3 block">
                Ecosystem Balance
              </span>
              <h2 className="font-serif font-extrabold text-3xl sm:text-5xl text-forest-dark dark:text-neutral-50 tracking-tight leading-tight">
                Why Wildlife Matters <br />
                to Our Survival
              </h2>
              <div className="w-16 h-0.5 bg-[#2E7D32] mt-4 mb-8 rounded-full" />

              <p className="font-sans font-light text-[#5D6D5E] dark:text-neutral-300 leading-relaxed mb-10 text-base">
                Every living creature holds a biological assignment. Over millions of years, species have woven a delicate, self-stabilizing web of chemical exchanges and resource feedback loops that secure our air, clean water courses, crop pollination, and seasonal predictability.
              </p>

              <div className="space-y-6">
                {coreValues.map((val, idx) => (
                  <motion.div
                    key={val.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="flex gap-4 p-4 rounded-2xl hover:bg-sage-bg/50 dark:hover:bg-[#1B251D] border border-transparent hover:border-white/10 transition-all"
                  >
                    <div className="flex-shrink-0 mt-1">{val.icon}</div>
                    <div>
                      <h4 className="font-serif font-bold text-lg text-forest-dark dark:text-white">
                        {val.title}
                      </h4>
                      <p className="font-sans font-light text-sm text-[#5D6D5E] dark:text-neutral-400 mt-1 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Wildlife Statistics Panel */}
      <section id="wildlife-statistics" className="py-24 bg-[#1B5E20] text-white relative">
        {/* Elegant organic leaves pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
            <path d="M0 100C30 80 70 80 100 100V0H0V100Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center flex flex-col items-center bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/15 shadow-xl"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 shadow-inner text-white">
                  {stat.icon}
                </div>
                <span className="font-serif font-extrabold text-3xl sm:text-4xl block mb-1">
                  {stat.value}
                </span>
                <span className="font-sans text-xs uppercase tracking-widest text-white/70">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Photographers Section */}
      <section id="featured-photographers" className="py-24 bg-sage-bg dark:bg-[#0E140F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="uppercase text-xs font-bold tracking-[0.3em] text-[#795548] dark:text-earth-light mb-3 block">
              Visionaries in the Wild
            </span>
            <h2 className="font-serif font-extrabold text-3xl sm:text-5xl text-forest-dark dark:text-neutral-50 tracking-tight">
              Featured Photographers
            </h2>
            <div className="w-16 h-0.5 bg-[#2E7D32] mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-sage-text dark:text-neutral-400 font-sans font-light">
              Meet the skilled biological explorers who spend weeks tracking, waiting, and protecting local systems to capture these frames.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PHOTOGRAPHERS.map((photographer, idx) => (
              <motion.div
                key={photographer.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-white/20 dark:border-neutral-800 shadow-md flex flex-col items-center text-center group hover:shadow-xl transition-shadow"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-[#2E7D32]/20 group-hover:border-[#2E7D32] transition-colors">
                  <img
                    src={photographer.image}
                    alt={photographer.name}
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-serif font-bold text-xl text-forest-dark dark:text-white">
                  {photographer.name}
                </h3>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#795548] dark:text-earth-light bg-[#795548]/10 px-3 py-1 rounded-full mt-2">
                  {photographer.role}
                </span>
                <p className="font-sans font-light text-sm text-[#5D6D5E] dark:text-neutral-300 mt-4 leading-relaxed">
                  {photographer.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Newsletter Subscription */}
      <section id="newsletter" className="py-24 bg-white dark:bg-[#121B14] relative overflow-hidden border-t border-white/10">
        {/* Graphic decoration */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-forest/5 dark:bg-emerald-500/5 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-sage-bg dark:bg-[#1B251D] rounded-3xl p-8 sm:p-12 border border-white/25 dark:border-neutral-800 shadow-xl text-center">
            <div className="w-12 h-12 bg-[#2E7D32]/10 text-[#2E7D32] dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="font-serif font-bold text-3xl text-forest-dark dark:text-white mb-2">
              Subscribe to the Field Briefing
            </h2>
            <p className="font-sans font-light text-sm text-[#5D6D5E] dark:text-neutral-300 max-w-lg mx-auto mb-8 leading-relaxed">
              Get bi-weekly updates on rare species trackers, conservation statistics, behind-the-scenes camera guides, and pristine high-res wallpaper bundles.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                id="newsletter-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow px-5 py-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-forest dark:focus:ring-emerald-500 shadow-inner"
              />
              <button
                id="newsletter-submit-button"
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] cursor-pointer focus:outline-none"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <motion.div
                id="newsletter-success-alert"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 inline-flex items-center gap-2 text-[#2E7D32] dark:text-emerald-400 text-sm font-semibold"
              >
                <Leaf className="w-4 h-4" />
                Thank you! You have been successfully subscribed to our field briefings.
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
