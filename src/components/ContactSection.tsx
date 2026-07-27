import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Compass, Plus, Minus, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(3); // Illustrated map zoom simulation

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 6000);
    }
  };

  // illustrated grid markers
  const markers = [
    { name: "Svalbard Outpost", x: 120, y: 40, coord: "78.22° N, 15.65° E" },
    { name: "NatureLens Central", x: 260, y: 150, coord: "37.77° N, 122.41° W", primary: true },
    { name: "Amazon Camp", x: 180, y: 280, coord: "3.46° S, 62.21° W" },
    { name: "Rift Valley Station", x: 380, y: 240, coord: "0.02° S, 36.90° E" }
  ];

  return (
    <section id="contact-section-container" className="py-24 bg-sage-bg dark:bg-[#0E140F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="uppercase text-xs font-bold tracking-[0.3em] text-[#795548] dark:text-earth-light mb-3 block">
            Connect With Us
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-forest-dark dark:text-neutral-50 tracking-tight leading-tight">
            Initiate a Biological Inquiry
          </h1>
          <div className="w-16 h-0.5 bg-[#2E7D32] dark:bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sage-text dark:text-neutral-400 font-sans font-light">
            Whether you are coordinating a field mission, purchasing fine-art prints, or submitting research photographs, our team is standing by.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-md border border-white/20 dark:border-neutral-850 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-[#2E7D32] dark:text-emerald-400" />
                <h3 className="font-serif font-bold text-xl text-forest-dark dark:text-white">
                  Field Communications Desk
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#795548] dark:text-earth-light">
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Dr. Jane Goodall"
                          className="w-full px-4 py-3 bg-[#F1F3F0] dark:bg-[#0E140F] border border-white/10 dark:border-neutral-800 rounded-xl text-xs text-forest-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32] dark:focus:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#795548] dark:text-earth-light">
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="jane@conservation.org"
                          className="w-full px-4 py-3 bg-[#F1F3F0] dark:bg-[#0E140F] border border-white/10 dark:border-neutral-800 rounded-xl text-xs text-forest-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32] dark:focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#795548] dark:text-earth-light">
                        Inquiry Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Print Acquisition / Field Cooperation"
                        className="w-full px-4 py-3 bg-[#F1F3F0] dark:bg-[#0E140F] border border-white/10 dark:border-neutral-800 rounded-xl text-xs text-forest-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32] dark:focus:ring-emerald-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#795548] dark:text-earth-light">
                        Message Body
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Describe your inquiry or field research parameters..."
                        className="w-full px-4 py-3 bg-[#F1F3F0] dark:bg-[#0E140F] border border-white/10 dark:border-neutral-800 rounded-xl text-xs text-forest-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32] dark:focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      id="contact-submit-button"
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                    >
                      Dispatch Message
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 flex flex-col items-center justify-center h-full"
                  >
                    <div className="w-16 h-16 bg-[#F1F3F0] dark:bg-[#0E140F] text-[#2E7D32] dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-inner animate-pulse">
                      <Send className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-forest-dark dark:text-white">
                      Inquiry Dispatched!
                    </h3>
                    <p className="font-sans font-light text-sm text-sage-text dark:text-neutral-400 max-w-sm mt-3 leading-relaxed">
                      Thank you, <strong className="text-forest-dark dark:text-white font-semibold">{formData.name}</strong>. Your message regarding "<em>{formData.subject || "Field Inquiry"}</em>" has been securely routed to our team. We will respond within 24 field-hours.
                    </p>
                    <button
                      id="reset-form-button"
                      onClick={() => setSubmitted(false)}
                      className="mt-8 px-6 py-2.5 bg-[#795548]/10 hover:bg-[#795548]/15 text-[#795548] dark:bg-neutral-800 dark:hover:bg-neutral-750 dark:text-neutral-300 rounded-full font-bold text-xs uppercase tracking-wider transition-colors focus:outline-none cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Map/Contact Info Side */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            {/* Interactive illustrated satellite Map */}
            <div className="bg-[#1B251D] text-white rounded-3xl p-6 shadow-xl border border-white/5 flex-grow relative overflow-hidden flex flex-col justify-between aspect-square lg:aspect-auto">
              {/* Radar grids overlay */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

              {/* Map Title Header */}
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <h4 className="font-serif font-bold text-sm tracking-wide text-neutral-200 uppercase">
                    NatureLens Coordinate Grid
                  </h4>
                  <span className="font-sans text-[10px] text-neutral-400 font-mono">
                    ACTIVE TELEMETRY MAP V4.2
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#2E7D32]/25 border border-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-400 text-[9px] font-mono font-bold uppercase animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live Sync
                </div>
              </div>

              {/* Map Simulator Canvas Area */}
              <div className="relative flex-grow my-6 bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden flex items-center justify-center">
                {/* Simulated topographical contour concentric circles */}
                <div
                  className="absolute rounded-full border border-neutral-900 transition-all duration-300"
                  style={{
                    width: `${200 * zoomLevel}px`,
                    height: `${200 * zoomLevel}px`,
                  }}
                />
                <div
                  className="absolute rounded-full border border-neutral-900 transition-all duration-300"
                  style={{
                    width: `${350 * zoomLevel}px`,
                    height: `${350 * zoomLevel}px`,
                  }}
                />
                <div
                  className="absolute rounded-full border border-neutral-900 transition-all duration-300"
                  style={{
                    width: `${500 * zoomLevel}px`,
                    height: `${500 * zoomLevel}px`,
                  }}
                />

                {/* Compass HUD */}
                <div className="absolute bottom-4 right-4 text-neutral-650">
                  <Compass className="w-16 h-16 animate-spin-slow opacity-25" />
                </div>

                {/* Simulated Land masses and markers */}
                <div className="absolute inset-0">
                  {markers.map((mark) => (
                    <motion.div
                      key={mark.name}
                      style={{
                        left: `${mark.x}px`,
                        top: `${mark.y}px`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group/marker cursor-pointer"
                    >
                      {/* Ring pulse */}
                      <span className={`absolute -inset-2 rounded-full border opacity-50 animate-ping ${
                        mark.primary ? "border-emerald-400" : "border-neutral-500"
                      }`} />
                      {/* Pin point */}
                      <div className={`w-3 h-3 rounded-full relative z-10 ${
                        mark.primary ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" : "bg-neutral-400"
                      }`} />

                      {/* Floating tag on hover / standard */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 text-[10px] rounded px-2 py-1 whitespace-nowrap shadow-md pointer-events-none opacity-0 group-hover/marker:opacity-100 transition-opacity">
                        <strong className="block text-white leading-none">{mark.name}</strong>
                        <span className="text-neutral-400 font-mono text-[8px] mt-0.5 block">{mark.coord}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Zoom Controller */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(z + 0.5, 5))}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white cursor-pointer focus:outline-none"
                    aria-label="Zoom In Map"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(z - 0.5, 1))}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white cursor-pointer focus:outline-none"
                    aria-label="Zoom Out Map"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Center marker info */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md border border-neutral-850 rounded-lg p-2 max-w-[200px]">
                  <p className="font-serif font-bold text-[10px] text-white">NatureLens Sanctuary HQ</p>
                  <p className="font-sans text-[8px] text-neutral-450 mt-0.5 leading-tight">
                    Bay Area Conservation Ridge, Suite 200, San Francisco, CA
                  </p>
                </div>
              </div>

              {/* Coordinates display footer */}
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-450 relative z-10 border-t border-neutral-800 pt-4">
                <span>LAT: 37° 47' 29.6" N</span>
                <span>LNG: 122° 25' 09.8" W</span>
              </div>
            </div>

            {/* Direct Details Card */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-md border border-white/20 dark:border-neutral-850 flex flex-col gap-4">
              <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F1F3F0] dark:hover:bg-neutral-850 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/10 dark:bg-emerald-500/10 text-[#2E7D32] dark:text-emerald-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-sans text-[9px] text-[#795548] font-bold uppercase tracking-wider block">
                    Electronic Inboxes
                  </span>
                  <a href="mailto:field@naturelens.org" className="font-sans text-sm font-semibold text-forest-dark dark:text-neutral-100 hover:text-[#2E7D32] dark:hover:text-emerald-400 transition-colors">
                    field@naturelens.org
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F1F3F0] dark:hover:bg-neutral-850 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/10 dark:bg-emerald-500/10 text-[#2E7D32] dark:text-emerald-400 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-sans text-[9px] text-[#795548] font-bold uppercase tracking-wider block">
                    Satellite Dispatch
                  </span>
                  <a href="tel:+18005559453" className="font-sans text-sm font-semibold text-forest-dark dark:text-neutral-100 hover:text-[#2E7D32] dark:hover:text-emerald-400 transition-colors">
                    +1 (800) 555-WILD
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F1F3F0] dark:hover:bg-neutral-850 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/10 dark:bg-emerald-500/10 text-[#2E7D32] dark:text-emerald-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-sans text-[9px] text-[#795548] font-bold uppercase tracking-wider block">
                    Ground Headquarters
                  </span>
                  <span className="font-sans text-sm font-semibold text-forest-dark dark:text-neutral-100">
                    San Francisco, California, USA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
