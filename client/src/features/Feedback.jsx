import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  MessageSquare, Send, User, Mail, CheckCircle, 
  AlertCircle, Loader2, Bug, Lightbulb, HelpCircle,
  ArrowUp 
} from "lucide-react";
import { 
  motion, 
  AnimatePresence, 
  useScroll // Added for home page sync
} from "framer-motion";

// --- 1. THE MOVING BACKGROUND PARTICLES ---
const BackgroundParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100vh", x: Math.random() * 100 + "vw" }}
          animate={{ y: "-10vh" }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          className="absolute w-px h-16 bg-gradient-to-t from-sky-500 to-transparent"
        />
      ))}
    </div>
  );
};

// --- 2. TYPEWRITER COMPONENT ---
const TypewriterText = ({ text }) => {
  const characters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <motion.span
      className="flex flex-wrap justify-center"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {characters.map((char, index) => (
        <motion.span 
          key={index} 
          variants={child}
          style={{ display: "inline-block", minWidth: char === " " ? "0.3em" : "auto" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Feedback = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", type: "feature" });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // --- EXACT HOME PAGE SCROLL LOGIC ---
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll(); // Same as Home

  useEffect(() => {
    const toggle = () => window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false);
    window.addEventListener("scroll", toggle);
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("scroll", toggle);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const feedbackTypes = [
    { id: "bug", label: "Bug Report", icon: <Bug size={16} />, active: "text-red-400 border-red-500/50 bg-red-500/10" },
    { id: "feature", label: "Idea", icon: <Lightbulb size={16} />, active: "text-sky-400 border-sky-500/50 bg-sky-500/10" },
    { id: "other", label: "Question", icon: <HelpCircle size={16} />, active: "text-purple-400 border-purple-500/50 bg-purple-500/10" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });
    if (!formData.name || !formData.email || !formData.message) {
      return setStatus({ type: "error", msg: "Please fill out all fields." });
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/feedback", formData);
      setStatus({ type: "success", msg: "Message beamed to our servers! Thanks for the help." });
      setFormData({ name: "", email: "", message: "", type: "feature" });
    } catch (err) {
      setStatus({ type: "error", msg: "Transmission failed. Is the server online?" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-300 flex items-center justify-center p-4 md:p-8 relative overflow-hidden pt-32 pb-20">
      
      {/* GLOBAL ANIMATION LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundParticles />
        <motion.div 
          animate={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.08), transparent 70%)` }}
          className="absolute inset-0"
        />
        <motion.div 
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-sky-500/10 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
        />
      </div>

      {/* --- FIXED: EXACT HOME PAGE STYLE SCROLL TO TOP --- */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-10 right-10 z-[100] cursor-pointer"
          >
            <div className="relative w-14 h-14 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-full">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                <motion.circle 
                  cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2" fill="transparent"
                  style={{ pathLength: scrollYProgress }} 
                  className="text-sky-500" 
                />
              </svg>
              <ArrowUp size={20} className="text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl w-full z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="inline-flex p-4 rounded-3xl bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-8"
          >
            <MessageSquare size={40} />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 flex flex-col items-center leading-none italic">
            <TypewriterText text="Level Up" />
            <span className="text-sky-400">
               <TypewriterText text="TrackFit" />
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-slate-400 font-black uppercase tracking-[0.2em] max-w-md mx-auto text-[11px] mt-6"
          >
            Your insights drive our engineering. <br />
            <span className="text-white italic">Help us optimize the ecosystem.</span>
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ perspective: "1200px" }}
          className="bg-slate-900/40 backdrop-blur-2xl p-8 md:p-14 rounded-[3.5rem] shadow-2xl border border-white/5 relative"
        >
          {/* Feedback Type Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {feedbackTypes.map((type, i) => (
              <motion.button
                key={type.id}
                type="button"
                onClick={() => setFormData({...formData, type: type.id})}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all font-black text-[10px] uppercase tracking-[0.15em] ${
                  formData.type === type.id 
                  ? type.active 
                  : "border-slate-800 text-slate-500 hover:border-slate-700 hover:bg-slate-800/50"
                }`}
              >
                {type.icon} {type.label}
              </motion.button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group">
                <User className="absolute left-5 top-5 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-950/50 border border-slate-800 p-5 pl-14 rounded-2xl focus:ring-2 focus:ring-sky-500/40 focus:outline-none transition-all text-white placeholder:text-slate-700 font-black uppercase tracking-widest text-[11px]"
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-5 top-5 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-950/50 border border-slate-800 p-5 pl-14 rounded-2xl focus:ring-2 focus:ring-sky-500/40 focus:outline-none transition-all text-white placeholder:text-slate-700 font-black uppercase tracking-widest text-[11px]"
                />
              </div>
            </div>

            <div className="relative group">
              <textarea
                name="message"
                placeholder="What's on your mind? Be as descriptive as possible..."
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-slate-950/50 border border-slate-800 p-6 rounded-[2rem] focus:ring-2 focus:ring-sky-500/40 focus:outline-none transition-all text-white placeholder:text-slate-700 font-bold resize-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 text-slate-950 font-black p-6 rounded-2xl hover:bg-sky-400 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.25em] text-sm shadow-2xl shadow-sky-500/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Transmit Data</>}
            </motion.button>

            {status.msg && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex items-center gap-4 p-6 rounded-2xl border font-black text-[11px] uppercase tracking-widest ${
                  status.type === "success" 
                  ? "bg-sky-500/10 border-sky-500/30 text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.1)]" 
                  : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                {status.type === "success" ? <CheckCircle size={24}/> : <AlertCircle size={24}/>}
                {status.msg}
              </motion.div>
            )}
          </form>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 text-center text-slate-700 text-xs font-black uppercase tracking-[0.4em]"
        >
          Secure Protocol // End-to-End Encryption
        </motion.p>
      </div>
    </div>
  );
};

export default Feedback;