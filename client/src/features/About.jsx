import React, { useState, useEffect } from "react";
import { 
  Activity, Target, HeartPulse, BarChart3, CheckCircle2, 
  Code2, Database, Globe, Server, ArrowUp 
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, AnimatePresence } from "framer-motion";

// --- 1. NEW BACKGROUND ANIMATIONS ---
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

// --- 2. ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// --- 3. TYPEWRITER COMPONENT ---
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
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
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

// --- 4. MAIN ABOUT PAGE ---
const About = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // --- EXACT HOME/FEEDBACK SCROLL LOGIC ---
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div className="bg-[#020617] min-h-screen text-slate-300 overflow-x-hidden pt-32 md:pt-48 pb-20 relative">
      
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

      {/* --- SCROLL TO TOP BUTTON (EXACT MATCH) --- */}
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

      <div className="max-w-6xl mx-auto p-6 md:p-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-24 relative">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-500/20 blur-[130px] rounded-full -z-10"
          ></motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 flex flex-col items-center">
            <TypewriterText text="The Science of" />
            <span className="text-sky-400">
               <TypewriterText text="Self-Improvement" />
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
            className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto font-bold uppercase tracking-widest leading-relaxed italic opacity-80"
          >
            Track Fitness is a precision-engineered ecosystem 
            designed to turn your daily efforts into visual success.
          </motion.p>
        </div>

        {/* Mission & Technical Stack Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-10 mb-24"
        >
          <motion.section 
            variants={fadeInUp}
            className="bg-slate-900/40 p-12 rounded-[3rem] border border-slate-800 flex flex-col justify-center backdrop-blur-md hover:border-sky-500/30 transition-all duration-500 group"
          >
            <div className="bg-sky-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-sky-400 mb-8 border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-black transition-all">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tight">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed text-lg font-bold">
              We bridge the gap between effort and insight. By providing 
              frictionless tracking tools, we empower users to master their 
              physiology through data and discipline.
            </p>
          </motion.section>

          <motion.section 
            variants={fadeInUp}
            className="bg-black/40 backdrop-blur-md p-12 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden group hover:border-sky-500/20 transition-all duration-500"
          >
            <h3 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.5em] mb-10">
              Technical Foundation
            </h3>
            <div className="grid grid-cols-2 gap-5">
              <TechItem icon={<Globe size={18}/>} label="React Frontend" />
              <TechItem icon={<Server size={18}/>} label="Node.js Runtime" />
              <TechItem icon={<Code2 size={18}/>} label="Express Framework" />
              <TechItem icon={<Database size={18}/>} label="MongoDB Atlas" />
            </div>
            <p className="mt-10 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Powered by the <strong className="text-white">MERN Stack</strong>
            </p>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-500/10 blur-[80px] rounded-full group-hover:bg-sky-500/20 transition-all"></div>
          </motion.section>
        </motion.div>

        {/* Feature Pillars */}
        <div className="text-center mb-12">
            <h2 className="text-xs font-black text-slate-600 uppercase tracking-[0.5em]">The Core Pillars</h2>
        </div>
        
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-24"
        >
          <FeatureCard icon={<Activity size={32} />} title="Dynamic Logging" desc="Intuitive workout entry system designed for speed between sets." />
          <FeatureCard icon={<HeartPulse size={32} />} title="Macro Precision" desc="Analyze protein, carbs, and fats to fuel your recovery properly." />
          <FeatureCard icon={<BarChart3 size={32} />} title="Visual Trends" desc="Interactive Chart.js implementation for weight and calorie history." />
        </motion.section>

        {/* Why Choose Us */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900/20 p-16 rounded-[4rem] border border-slate-800/50 mb-24 relative overflow-hidden backdrop-blur-sm"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Why Track Fitness?</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              className="h-1 bg-sky-500 mx-auto mt-6 rounded-full"
            ></motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-16">
            <Benefit text="Modern, Clutter-free UI" delay={0.1} />
            <Benefit text="JWT Secure Authentication" delay={0.2} />
            <Benefit text="Zero Latency Logging" delay={0.3} />
            <Benefit text="Scalable Cloud Architecture" delay={0.4} />
            <Benefit text="Mobile-Responsive View" delay={0.5} />
            <Benefit text="Production-Ready Performance" delay={0.6} />
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-sky-500 p-16 rounded-[4rem] text-center text-slate-950 shadow-2xl shadow-sky-500/20 group"
        >
          <div className="relative z-10">
            <h3 className="text-5xl font-black mb-6 uppercase tracking-tighter leading-none italic">
              Ready to Level Up?
            </h3>
            <p className="font-black uppercase tracking-widest text-slate-900/80 mb-10 max-w-lg mx-auto text-sm">
              Join a community dedicated to data-driven results and sustainable health.
            </p>
            <Link to={"/register"}>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#020617", color: "#fff" }}
                whileTap={{ scale: 0.95 }}
                className="bg-slate-950 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl transition-all"
              >
                Create Free Account
              </motion.button>
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-white/20 transition-all"></div>
        </motion.div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const TechItem = ({ icon, label }) => (
  <motion.div 
    whileHover={{ y: -5, borderColor: "#38bdf8" }}
    className="flex items-center gap-3 bg-[#020617] border border-slate-800 p-4 rounded-2xl transition-all group"
  >
    <div className="text-sky-500 group-hover:rotate-12 transition-transform">{icon}</div>
    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{label}</span>
  </motion.div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    variants={fadeInUp}
    whileHover={{ y: -12, borderColor: "rgba(56, 189, 248, 0.4)" }}
    className="bg-slate-900/30 backdrop-blur-sm p-10 rounded-[3rem] border border-slate-800 transition-all group"
  >
    <div className="text-sky-400 mb-8 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all">{icon}</div>
    <h3 className="font-black text-2xl mb-4 text-white uppercase tracking-tighter italic">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed font-bold uppercase tracking-wider">{desc}</p>
  </motion.div>
);

const Benefit = ({ text, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center gap-4 group"
  >
    <div className="bg-sky-500/10 p-2 rounded-lg group-hover:bg-sky-500 group-hover:text-black transition-all">
      <CheckCircle2 className="text-sky-500 group-hover:text-inherit shrink-0" size={18} />
    </div>
    <span className="font-black text-slate-300 tracking-[0.1em] text-[11px] uppercase group-hover:text-white transition-colors">{text}</span>
  </motion.div>
);

export default About;