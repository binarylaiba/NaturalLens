import { PHOTOGRAPHERS, TIMELINE } from "../types";
import { ShieldCheck, HeartPulse, Globe2, Compass, Award, Shield, Eye } from "lucide-react";
import { motion } from "motion/react";
import SafeImage from "./SafeImage";

export default function AboutSection() {
  const impactStats = [
    { value: "48,000+", label: "Acres Protected", desc: "Acquired or co-managed with global habitat funds." },
    { value: "350+", label: "Field Workshops", desc: "Local community camera training drives coordinate tracking." },
    { value: "15%", label: "Revenue Pledged", desc: "Of all print sales directly support endangered rescue reserves." },
    { value: "1.2M", label: "Monthly Learners", desc: "Active citizens engaging in our biological data feeds." }
  ];

  const team = [
    {
      name: "Dr. Alistair Finch",
      role: "Executive Director & Founder",
      bio: "An eminent conservation biologist with 20+ years of reserve-creation experience across the African Rift Valley.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. Ramona Flores",
      role: "Director of Biological Research",
      bio: "Focusses on cloud forest canopy ecosystems, studying bird population patterns using advanced focal captures.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Sanjay Patel",
      role: "Community & Policy Director",
      bio: "Coordinates community tracking groups, ensuring policy-makers receive accurate photographic telemetry.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* 1. Conservation Mission / Hero */}
      <section id="about-hero" className="py-24 bg-sage-bg dark:bg-[#0E140F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mission Content */}
            <div>
              <span className="uppercase text-xs font-bold tracking-[0.3em] text-[#795548] dark:text-earth-light mb-3 block">
                Our Living Creed
              </span>
              <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-forest-dark dark:text-neutral-50 tracking-tight leading-tight">
                Documenting to Defend <br />
                the Natural Biosphere
              </h1>
              <div className="w-16 h-0.5 bg-[#2E7D32] dark:bg-emerald-500 mt-4 mb-8 rounded-full" />

              <p className="font-sans font-light text-sage-text dark:text-neutral-300 leading-relaxed mb-6">
                NatureLens was born from a fundamental, shared realization: <strong className="text-[#2E7D32] dark:text-emerald-400 font-semibold">people protect what they love, and they love what they can see and understand.</strong> In an era of rapid biodiversity loss, high-fidelity wildlife photography is not merely decoration; it is vital biological testimony.
              </p>
              <p className="font-sans font-light text-sage-text dark:text-neutral-300 leading-relaxed">
                By capturing the intricate patterns of a nesting Kingfisher, the alert focus of a Snow Leopard, or the deep coordination of gorilla troops, we bridge the gap between abstract ecological data and visceral human empathy. Every pixel we render serves to celebrate, understand, and shield our wild biomes.
              </p>

              {/* Bullet highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-forest dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-[#5D6D5E] dark:text-neutral-300 font-semibold">100% Ethical Field Tactics</span>
                </div>
                <div className="flex items-start gap-3">
                  <HeartPulse className="w-5 h-5 text-forest dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-[#5D6D5E] dark:text-neutral-300 font-semibold">Direct Conservation Funding</span>
                </div>
                <div className="flex items-start gap-3">
                  <Globe2 className="w-5 h-5 text-forest dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-[#5D6D5E] dark:text-neutral-300 font-semibold">Global Tracker Support Network</span>
                </div>
                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-forest dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-[#5D6D5E] dark:text-neutral-300 font-semibold">Citizen-Science Collaborations</span>
                </div>
              </div>
            </div>

            {/* Collage Area */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] z-10 border border-white/20">
                <SafeImage
                  src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800"
                  alt="Dappled sunlight forest"
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Back Accent circle */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-forest/10 rounded-full filter blur-2xl -z-10" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#795548]/5 rounded-full filter blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Timeline Milestones Section */}
      <section id="about-timeline" className="py-24 bg-white/40 dark:bg-[#1B251D]/40 border-y border-white/20 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="uppercase text-xs font-bold tracking-[0.3em] text-[#795548] dark:text-earth-light mb-3 block">
              Our Journey
            </span>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-forest-dark dark:text-neutral-50 tracking-tight">
              Milestones in the Canopy
            </h2>
            <div className="w-16 h-0.5 bg-[#2E7D32] dark:bg-emerald-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center spine */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#795548]/15 dark:bg-neutral-800" />

            <div className="space-y-12">
              {TIMELINE.map((evt, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={evt.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`relative flex flex-col sm:flex-row items-stretch ${
                      isEven ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Node point */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#2E7D32] dark:bg-emerald-500 border-4 border-[#F1F3F0] dark:border-neutral-950 flex items-center justify-center shadow-md z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Timeline Card */}
                    <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-white/20 dark:border-neutral-850 hover:shadow-md transition-shadow">
                        <span className="font-serif font-extrabold text-2xl text-[#2E7D32] dark:text-emerald-400 block mb-2">
                          {evt.year}
                        </span>
                        <h4 className="font-serif font-bold text-lg text-forest-dark dark:text-white">
                          {evt.title}
                        </h4>
                        <p className="font-sans font-light text-sm text-sage-text dark:text-neutral-400 mt-2 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>
                    </div>

                    {/* Empty placeholder column to balance grid */}
                    <div className="hidden sm:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Impact Statistics */}
      <section id="about-impact" className="py-24 bg-sage-bg dark:bg-[#0E140F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="uppercase text-xs font-bold tracking-[0.3em] text-[#795548] dark:text-earth-light mb-3 block">
              Measurable Outcomes
            </span>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-forest-dark dark:text-neutral-50 tracking-tight">
              Our Conservation Footprint
            </h2>
            <div className="w-16 h-0.5 bg-[#2E7D32] dark:bg-emerald-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-[#1B251D]/50 p-6 rounded-2xl border border-white/20 dark:border-neutral-800 text-center shadow-sm"
              >
                <span className="font-serif font-extrabold text-3xl sm:text-4xl text-[#2E7D32] dark:text-emerald-400 block mb-2">
                  {stat.value}
                </span>
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-forest-dark dark:text-neutral-100 block mb-1">
                  {stat.label}
                </span>
                <p className="font-sans font-light text-xs text-sage-text dark:text-neutral-400 leading-relaxed mt-2">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Leadership Team */}
      <section id="about-team" className="py-24 bg-white/40 dark:bg-[#1B251D]/40 border-t border-white/20 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="uppercase text-xs font-bold tracking-[0.3em] text-[#795548] dark:text-earth-light mb-3 block">
              Founding Trustees
            </span>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-forest-dark dark:text-neutral-50 tracking-tight">
              Behind the Lens
            </h2>
            <div className="w-16 h-0.5 bg-[#2E7D32] dark:bg-emerald-500 mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-sage-text dark:text-neutral-400 font-sans font-light">
              The team of biological researchers and environmental strategists guiding NatureLens' field investments and gallery campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-white/20 dark:border-neutral-850 shadow-sm hover:shadow-lg transition-all text-center group"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-2 border-[#2E7D32]/15 group-hover:border-[#2E7D32] transition-colors shadow-inner">
                  <SafeImage
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-serif font-bold text-lg text-forest-dark dark:text-white leading-tight">
                  {member.name}
                </h3>
                <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#795548] dark:text-earth-light block mt-2 mb-4">
                  {member.role}
                </span>
                <p className="font-sans font-light text-sm text-[#5D6D5E] dark:text-neutral-400 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
