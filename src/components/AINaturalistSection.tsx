import { useState, useRef, ChangeEvent } from "react";
import {
  Sparkles,
  Camera,
  Search,
  Upload,
  MessageSquare,
  BookOpen,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Compass,
  Info,
  Shield,
  Zap,
  Sliders,
  Copy,
  Check,
  RefreshCw,
  Image as ImageIcon,
  ChevronRight,
  Feather,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SafeImage from "./SafeImage";
import {
  AIIdentificationResult,
  AIPhotoCritiqueResult,
  AIFieldNotesResult,
} from "../types";

interface AINaturalistSectionProps {
  initialTab?: "identify" | "chat" | "critique" | "journal";
  initialSpecies?: string;
  initialImageUrl?: string;
}

const PRESET_SAMPLE_IMAGES = [
  {
    name: "Cheetah",
    url: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&q=80&w=800",
    category: "Mammals",
  },
  {
    name: "Common Kingfisher",
    url: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?auto=format&fit=crop&q=80&w=800",
    category: "Birds",
  },
  {
    name: "Scarlet Macaw",
    url: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&q=80&w=800",
    category: "Birds",
  },
  {
    name: "Axolotl Salamander",
    url: "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&q=80&w=800",
    category: "Amphibians",
  },
  {
    name: "Atlantic Puffin",
    url: "https://images.unsplash.com/photo-1516681100942-f7d87ee2650b?auto=format&fit=crop&q=80&w=800",
    category: "Birds",
  },
  {
    name: "Red Fox",
    url: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=800",
    category: "Mammals",
  },
];

const CHAT_STARTERS = [
  "What camera settings are best for fast-moving birds in flight?",
  "How do Axolotls regenerate lost limbs and internal organs?",
  "Explain the keystone ecological role of apex predators like wolves.",
  "What ethical rules should wildlife photographers follow near nesting birds?",
  "How can I track elusive wildlife without disturbing their habitat?",
];

export default function AINaturalistSection({
  initialTab = "identify",
  initialSpecies = "",
  initialImageUrl = "",
}: AINaturalistSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    "identify" | "chat" | "critique" | "journal"
  >(initialTab);

  // 1. Species Identifier State
  const [selectedImage, setSelectedImage] = useState<string>(
    initialImageUrl || PRESET_SAMPLE_IMAGES[0].url
  );
  const [customImageBase64, setCustomImageBase64] = useState<string>("");
  const [imageUrlInput, setImageUrlInput] = useState<string>("");
  const [promptHint, setPromptHint] = useState<string>("");
  const [identifying, setIdentifying] = useState<boolean>(false);
  const [identifyError, setIdentifyError] = useState<string | null>(null);
  const [identifyResult, setIdentifyResult] =
    useState<AIIdentificationResult | null>(null);

  // 2. Chat Naturalist State
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: "user" | "ai"; text: string; time: string }>
  >([
    {
      sender: "ai",
      text: "Greetings, fellow explorer! I am NatureLens AI Naturalist. Ask me anything about animal behavior, plant species, ecological dynamics, camera techniques, or wildlife tracking ethics.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  // 3. Photo Critique State
  const [critiqueImage, setCritiqueImage] = useState<string>(
    initialImageUrl || PRESET_SAMPLE_IMAGES[1].url
  );
  const [critiqueSpecies, setCritiqueSpecies] = useState<string>(initialSpecies);
  const [critiquing, setCritiquing] = useState<boolean>(false);
  const [critiqueError, setCritiqueError] = useState<string | null>(null);
  const [critiqueResult, setCritiqueResult] = useState<AIPhotoCritiqueResult | null>(
    null
  );

  // 4. Field Journal State
  const [journalSpecies, setJournalSpecies] = useState<string>(
    initialSpecies || "Snow Leopard"
  );
  const [journalLocation, setJournalLocation] = useState<string>(
    "Himalayan High Plateaus"
  );
  const [generatingJournal, setGeneratingJournal] = useState<boolean>(false);
  const [journalError, setJournalError] = useState<string | null>(null);
  const [journalResult, setJournalResult] = useState<AIFieldNotesResult | null>(
    null
  );

  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setIdentifyError("File size exceeds 10MB limit. Please choose a smaller photo.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCustomImageBase64(base64);
        setSelectedImage(base64);
        setIdentifyError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run AI Identification
  const handleIdentify = async () => {
    setIdentifying(true);
    setIdentifyError(null);
    try {
      const response = await fetch("/api/ai/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: customImageBase64 ? undefined : selectedImage,
          imageBase64: customImageBase64 || undefined,
          promptHint: promptHint.trim() || undefined,
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to identify species from image.");
      }

      setIdentifyResult(json.data);
    } catch (err: any) {
      setIdentifyError(err.message || "An unexpected error occurred.");
    } finally {
      setIdentifying(false);
    }
  };

  // Send Chat Message
  const handleSendChat = async (promptToSend?: string) => {
    const textToSubmit = promptToSend || chatInput;
    if (!textToSubmit.trim() || chatLoading) return;

    const userMsg = {
      sender: "user" as const,
      text: textToSubmit,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!promptToSend) setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSubmit }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to query AI Naturalist.");
      }

      const aiMsg = {
        sender: "ai" as const,
        text: json.text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg = {
        sender: "ai" as const,
        text: `⚠️ Error: ${err.message || "Unable to reach NatureLens AI. Please verify your connection."}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  // Run Photo Critique
  const handleCritique = async () => {
    setCritiquing(true);
    setCritiqueError(null);
    try {
      const response = await fetch("/api/ai/critique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: critiqueImage,
          speciesContext: critiqueSpecies.trim() || undefined,
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to analyze photo.");
      }

      setCritiqueResult(json.data);
    } catch (err: any) {
      setCritiqueError(err.message || "Photo critique failed.");
    } finally {
      setCritiquing(false);
    }
  };

  // Generate Field Journal
  const handleGenerateJournal = async () => {
    if (!journalSpecies.trim()) return;
    setGeneratingJournal(true);
    setJournalError(null);

    try {
      const response = await fetch("/api/ai/field-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          speciesName: journalSpecies,
          location: journalLocation,
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to generate field notes.");
      }

      setJournalResult(json.data);
    } catch (err: any) {
      setJournalError(err.message || "Expedition note generation failed.");
    } finally {
      setGeneratingJournal(false);
    }
  };

  // Helper copy to clipboard
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-naturalist-section" className="py-12 bg-sage-bg dark:bg-[#0E140F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase mb-3 border border-emerald-500/20"
          >
            <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>Powered by Gemini 3.6 Multimodal AI</span>
          </motion.div>

          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-forest-dark dark:text-white tracking-tight">
            NatureLens <span className="text-forest dark:text-emerald-400">AI Naturalist</span>
          </h2>
          <p className="font-sans text-sm text-sage-text dark:text-neutral-300 mt-2 leading-relaxed">
            Instant wildlife identification, expert field biology Q&A, EXIF photo analysis, and atmospheric expedition journal synthesis.
          </p>
        </div>

        {/* AI Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 bg-white/60 dark:bg-neutral-900/60 p-2 rounded-2xl border border-white/40 dark:border-white/10 shadow-sm max-w-3xl mx-auto">
          {[
            { id: "identify", label: "Species Identifier", icon: Search },
            { id: "chat", label: "Ask Naturalist", icon: MessageSquare },
            { id: "critique", label: "Photo Review & EXIF", icon: Camera },
            { id: "journal", label: "Field Journaler", icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`ai-tab-${tab.id}`}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer focus:outline-none ${
                  isActive
                    ? "bg-forest text-white shadow-md dark:bg-emerald-600"
                    : "text-sage-text dark:text-neutral-300 hover:bg-white/80 dark:hover:bg-neutral-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content 1: SPECIES IDENTIFIER */}
        {activeSubTab === "identify" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Column */}
            <div className="lg:col-span-5 space-y-6 bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <h3 className="font-serif font-bold text-lg text-forest-dark dark:text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-forest dark:text-emerald-400" />
                  Select or Upload Photo
                </h3>
                <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                  Vision Mode
                </span>
              </div>

              {/* Main Preview Box */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 group">
                <SafeImage
                  src={selectedImage}
                  alt="Wildlife preview"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />

                {identifying && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-3">
                    <motion.div
                      animate={{ y: [-40, 40, -40] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-0.5 bg-emerald-400 shadow-[0_0_15px_#10b981]"
                    />
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                      Analyzing Species Morphology...
                    </span>
                  </div>
                )}
              </div>

              {/* Preset Selection Strip */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
                  Sample Photographs
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {PRESET_SAMPLE_IMAGES.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImage(sample.url);
                        setCustomImageBase64("");
                        setIdentifyError(null);
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImage === sample.url && !customImageBase64
                          ? "border-forest dark:border-emerald-400 scale-105 shadow-md"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      title={sample.name}
                    >
                      <SafeImage
                        src={sample.url}
                        alt={sample.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload & URL Inputs */}
              <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Your Photo</span>
                  </button>
                </div>

                {/* Optional Hint */}
                <div>
                  <input
                    type="text"
                    placeholder="Optional details (e.g. 'Found in Amazon rainforest', 'Diving bird')"
                    value={promptHint}
                    onChange={(e) => setPromptHint(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-forest dark:focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Analyze CTA */}
              <button
                id="btn-ai-identify"
                onClick={handleIdentify}
                disabled={identifying}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-bold text-xs uppercase tracking-wider shadow-lg dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all cursor-pointer disabled:opacity-50"
              >
                {identifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Identifying Species...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Identify Wildlife Specimen</span>
                  </>
                )}
              </button>

              {identifyError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{identifyError}</span>
                </div>
              )}
            </div>

            {/* Results Column */}
            <div className="lg:col-span-7">
              {identifyResult ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-6"
                >
                  {/* Header result row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-5">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-forest dark:text-emerald-400">
                        {identifyResult.category} Taxonomy
                      </span>
                      <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-forest-dark dark:text-white mt-1">
                        {identifyResult.speciesName}
                      </h3>
                      <p className="font-serif italic text-sm text-neutral-500 dark:text-neutral-400">
                        {identifyResult.scientificName}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          identifyResult.conservationStatus.includes("Endangered")
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                            : identifyResult.conservationStatus.includes("Vulnerable")
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                        }`}
                      >
                        {identifyResult.conservationStatus}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>AI Confidence: {identifyResult.confidenceScore}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Grid details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-center gap-2 text-forest dark:text-emerald-400 font-bold text-xs uppercase mb-1">
                        <Compass className="w-4 h-4" />
                        <span>Habitat & Range</span>
                      </div>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {identifyResult.habitat}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-center gap-2 text-forest dark:text-emerald-400 font-bold text-xs uppercase mb-1">
                        <Zap className="w-4 h-4" />
                        <span>Dietary Habits</span>
                      </div>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {identifyResult.diet}
                      </p>
                    </div>
                  </div>

                  {/* Field identification traits */}
                  <div>
                    <h4 className="font-serif font-bold text-sm text-forest-dark dark:text-white uppercase tracking-wider mb-2.5">
                      Key Field Identification Traits
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {identifyResult.fieldTraits.map((trait, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-xs text-neutral-800 dark:text-neutral-200"
                        >
                          <Feather className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{trait}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interesting facts */}
                  <div>
                    <h4 className="font-serif font-bold text-sm text-forest-dark dark:text-white uppercase tracking-wider mb-2.5">
                      Fascinating Biological Facts
                    </h4>
                    <ul className="space-y-2">
                      {identifyResult.interestingFacts.map((fact, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-forest dark:bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ethical Observation */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                    <div className="flex items-center gap-2 font-bold uppercase text-[11px] text-amber-800 dark:text-amber-400">
                      <Shield className="w-4 h-4" />
                      <span>Ethical Observation Protocol</span>
                    </div>
                    <p className="leading-relaxed">{identifyResult.ethicalFieldAdvice}</p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() =>
                        handleCopyText(
                          `${identifyResult.speciesName} (${identifyResult.scientificName})\nHabitat: ${identifyResult.habitat}\nStatus: ${identifyResult.conservationStatus}`
                        )
                      }
                      className="flex items-center gap-1.5 text-xs font-semibold text-forest dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? "Copied to Clipboard" : "Copy Species Summary"}</span>
                    </button>

                    <button
                      onClick={() => {
                        setJournalSpecies(identifyResult.speciesName);
                        setActiveSubTab("journal");
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest/10 text-forest dark:bg-emerald-500/10 dark:text-emerald-400 hover:bg-forest/20 text-xs font-bold transition-all cursor-pointer"
                    >
                      <span>Write Field Notes</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white dark:bg-neutral-900 p-8 sm:p-12 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 text-center flex flex-col items-center justify-center min-h-[420px] text-neutral-400">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-forest-dark dark:text-white mb-1">
                    Ready to Identify Wildlife
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm">
                    Select one of our preset sample photographs or upload your own field photograph to trigger AI species recognition.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 2: NATURALIST CHAT */}
        {activeSubTab === "chat" && (
          <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col h-[650px]">
            {/* Chat Top Banner */}
            <div className="p-4 sm:p-6 bg-forest text-white dark:bg-neutral-850 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">NatureLens Naturalist Assistant</h3>
                  <p className="text-[11px] text-emerald-300">Powered by Gemini 3.6 Flash &bull; Online</p>
                </div>
              </div>
              <button
                onClick={() =>
                  setChatMessages([
                    {
                      sender: "ai",
                      text: "Conversation reset. What wildlife topics shall we explore next?",
                      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    },
                  ])
                }
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1"
                title="Reset Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* Chat Message Scroll Box */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-sage-bg/30 dark:bg-neutral-950/40">
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-forest text-white dark:bg-emerald-600 rounded-tr-none shadow-md"
                        : "bg-white dark:bg-neutral-850 text-neutral-800 dark:text-neutral-100 rounded-tl-none border border-neutral-100 dark:border-neutral-800 shadow-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-1 px-1">{msg.time}</span>
                </motion.div>
              ))}

              {chatLoading && (
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 p-2">
                  <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                  <span>AI Naturalist is writing...</span>
                </div>
              )}
            </div>

            {/* Quick Starters */}
            <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 overflow-x-auto flex gap-2">
              {CHAT_STARTERS.map((starter, i) => (
                <button
                  key={i}
                  onClick={() => handleSendChat(starter)}
                  disabled={chatLoading}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 hover:bg-forest hover:text-white dark:hover:bg-emerald-600 text-neutral-600 dark:text-neutral-300 text-[11px] font-medium border border-neutral-200 dark:border-neutral-700 transition-all shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {starter}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Ask about species behavior, tracking, conservation or photography..."
                className="flex-1 px-4 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 border border-transparent focus:border-forest dark:focus:border-emerald-400 focus:outline-none"
              />
              <button
                onClick={() => handleSendChat()}
                disabled={chatLoading || !chatInput.trim()}
                className="p-3 rounded-2xl bg-forest hover:bg-forest-dark dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab Content 3: PHOTO CRITIQUE & EXIF */}
        {activeSubTab === "critique" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 space-y-5">
              <h3 className="font-serif font-bold text-lg text-forest-dark dark:text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-forest dark:text-emerald-400" />
                Photo to Analyze
              </h3>

              <div className="aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <SafeImage
                  src={critiqueImage}
                  alt="Critique sample"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 block mb-2">
                  Select Preset or Paste URL
                </label>
                <div className="grid grid-cols-6 gap-2 mb-3">
                  {PRESET_SAMPLE_IMAGES.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCritiqueImage(sample.url)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer ${
                        critiqueImage === sample.url
                          ? "border-forest dark:border-emerald-400 scale-105"
                          : "border-transparent opacity-70"
                      }`}
                    >
                      <SafeImage src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Optional species context e.g. 'Kingfisher diving'"
                  value={critiqueSpecies}
                  onChange={(e) => setCritiqueSpecies(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none"
                />
              </div>

              <button
                onClick={handleCritique}
                disabled={critiquing}
                className="w-full py-3.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-bold text-xs uppercase tracking-wider dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {critiquing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Composition & EXIF...</span>
                  </>
                ) : (
                  <>
                    <Sliders className="w-4 h-4" />
                    <span>Generate Editorial Critique</span>
                  </>
                )}
              </button>

              {critiqueError && (
                <p className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl">
                  {critiqueError}
                </p>
              )}
            </div>

            <div className="lg:col-span-7">
              {critiqueResult ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 space-y-6"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-widest">
                      Editorial Review
                    </span>
                    <h3 className="font-serif font-extrabold text-2xl text-forest-dark dark:text-white mt-1">
                      {critiqueResult.photoTitle}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 italic leading-relaxed">
                      "{critiqueResult.editorialCaption}"
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-800 dark:text-emerald-400">
                      <Camera className="w-4 h-4" />
                      <span>Recommended EXIF & Camera Settings</span>
                    </div>
                    <p className="text-xs text-neutral-800 dark:text-neutral-200 font-mono">
                      {critiqueResult.suggestedCameraSettings}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-sm text-forest-dark dark:text-white uppercase tracking-wider mb-2">
                      Composition & Lighting Assessment
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {critiqueResult.compositionAnalysis}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-sm text-forest-dark dark:text-white uppercase tracking-wider mb-2">
                      Conservation & Habitat Context
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {critiqueResult.conservationStory}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {critiqueResult.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[11px] font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 text-center flex flex-col items-center justify-center min-h-[380px] text-neutral-400">
                  <Camera className="w-10 h-10 text-emerald-500 mb-3" />
                  <p className="text-xs max-w-sm">
                    Select a photograph and click "Generate Editorial Critique" to produce magazine-quality captions and camera settings.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 4: FIELD JOURNALER */}
        {activeSubTab === "journal" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-forest-dark dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-forest dark:text-emerald-400" />
                Synthesize Field Journal Entry
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
                    Species Name
                  </label>
                  <input
                    type="text"
                    value={journalSpecies}
                    onChange={(e) => setJournalSpecies(e.target.value)}
                    placeholder="e.g. Snow Leopard, Blue Whale, Kingfisher"
                    className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
                    Expedition Region / Habitat
                  </label>
                  <input
                    type="text"
                    value={journalLocation}
                    onChange={(e) => setJournalLocation(e.target.value)}
                    placeholder="e.g. Serengeti Plains, Pacific Trench, Scandinavian Taiga"
                    className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateJournal}
                disabled={generatingJournal || !journalSpecies.trim()}
                className="w-full py-3.5 rounded-2xl bg-forest hover:bg-forest-dark text-white font-bold text-xs uppercase tracking-wider dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {generatingJournal ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Writing Expedition Log...</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    <span>Generate Authentic Field Notes</span>
                  </>
                )}
              </button>

              {journalError && (
                <p className="text-xs text-rose-500 bg-rose-50 p-3 rounded-xl">{journalError}</p>
              )}
            </div>

            {journalResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50/50 dark:bg-neutral-900 p-8 rounded-3xl border border-amber-200/60 dark:border-neutral-800 shadow-sm space-y-6 text-neutral-800 dark:text-neutral-200"
              >
                <div className="border-b border-amber-200/60 dark:border-neutral-800 pb-4 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 dark:text-emerald-400">
                      NatureLens Field Journal Entry
                    </span>
                    <h3 className="font-serif font-extrabold text-2xl text-forest-dark dark:text-white mt-1">
                      {journalResult.journalTitle}
                    </h3>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 bg-amber-100/80 dark:bg-neutral-800 rounded-lg text-amber-900 dark:text-neutral-300">
                    {journalResult.expeditionDate}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white/80 dark:bg-neutral-850 border border-amber-100 dark:border-neutral-800">
                    <span className="font-bold text-amber-900 dark:text-emerald-400 block mb-1">
                      Weather & Terrain
                    </span>
                    <p>{journalResult.weatherAndTerrain}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/80 dark:bg-neutral-850 border border-amber-100 dark:border-neutral-800">
                    <span className="font-bold text-amber-900 dark:text-emerald-400 block mb-1">
                      Acoustic & Behavioral Signals
                    </span>
                    <p>{journalResult.acousticSignals}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-forest-dark dark:text-white uppercase tracking-wider mb-1">
                    Observation Notes
                  </h4>
                  <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {journalResult.behavioralObservation}
                  </p>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-forest-dark dark:text-white uppercase tracking-wider mb-1">
                    Conservation Assessment
                  </h4>
                  <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {journalResult.threatsAndConservation}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Pro Field Photography Tip</span>
                    <p>{journalResult.proPhotographyTip}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
