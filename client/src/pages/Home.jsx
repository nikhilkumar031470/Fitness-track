import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Dumbbell,
  Utensils,
  LineChart,
  Zap,
  Activity,
  Play,
  Terminal,
  ArrowUp,
} from "lucide-react";

import Cards from "../features/Cards";
import About from "../features/About";
import FitnessLoader from "../features/FitnessLoader";



const BackgroundParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: "100vh", x: `${Math.random() * 100}vw` }}
        animate={{ y: "-10vh" }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 10,
        }}
        className="absolute w-px h-12 bg-gradient-to-t from-sky-500 to-transparent"
      />
    ))}
  </div>
);

const MagneticButton = ({ children, className, to }) => {
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouse = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.3);
    y.set((clientY - (top + height / 2)) * 0.3);
  };

  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Link to={to} className={className}>
        {children}
      </Link>
    </motion.div>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
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
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-white/5"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                style={{ pathLength: scrollYProgress }}
                className="text-sky-500"
              />
            </svg>
            <ArrowUp size={20} className="text-white" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StatChip = ({ icon, text, delay, position }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.8 }}
    style={position}
    className="absolute hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-2xl z-40"
  >
    <div className="text-sky-400 animate-pulse">{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">
      {text}
    </span>
  </motion.div>
);


const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Dumbbell />,
      title: "Precision Logs",
      desc: "Biometric-synced workout tracking for maximal volume optimization.",
    },
    {
      icon: <Utensils />,
      title: "Macro Intel",
      desc: "Automated nutrient density mapping and metabolic indexing.",
    },
    {
      icon: <LineChart />,
      title: "Neural Trends",
      desc: "Predictive analytics on your strength and recovery curves.",
    },
  ];

  if (isLoading) return <FitnessLoader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#020617] min-h-screen text-slate-200 overflow-x-hidden"
    >
      <section className="relative h-screen flex items-center justify-center px-6">
        <BackgroundParticles />

        <motion.div
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-sky-500/20 z-10 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
        />

        <div className="absolute inset-0 pointer-events-none z-40">
          <StatChip
            icon={<Zap size={14} />}
            text="Intensity: 94%"
            delay={1.5}
            position={{ top: "25%", left: "12%" }}
          />
          <StatChip
            icon={<Activity size={14} />}
            text="Live Biometrics"
            delay={1.7}
            position={{ bottom: "25%", right: "12%" }}
          />
        </div>

        <div className="container mx-auto relative z-30 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-10 h-px bg-sky-500" />
              <span className="text-sky-400 text-[10px] font-black uppercase tracking-[0.8em]">
                Neural Protocol Activated
              </span>
              <div className="w-10 h-px bg-sky-500" />
            </div>

            <h1 className="text-[12vw] md:text-[10rem] font-black mb-6 tracking-[-0.05em] uppercase italic leading-none text-white">
              LIMITLESS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-sky-600 bg-[length:200%_auto] animate-gradient-flow">
                EVOLUTION
              </span>
            </h1>

            <p className="text-slate-500 text-sm md:text-xl mb-16 max-w-2xl mx-auto uppercase tracking-[0.5em] font-light">
              Precision{" "}
              <span className="text-white font-bold">Performance</span>{" "}
              Ecosystem
            </p>

            <div className="flex flex-col sm:flex-row gap-8 mt-12 justify-center items-center">
              <MagneticButton to="/register" className="group relative">
                <div className="absolute -inset-1 bg-sky-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
                <button className="relative bg-white text-black px-12 py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
                  Get Started <Play size={14} fill="black" />
                </button>
              </MagneticButton>

              <Link to="/login" className="group relative">
                <button className="relative px-10 py-5 bg-slate-950/50 backdrop-blur-md border border-slate-800 rounded-xl flex items-center gap-3 transition-all hover:border-sky-500/50 hover:bg-slate-900/80">
                  <Terminal size={14} className="text-sky-500" />
                  <span className="font-black text-[11px] uppercase tracking-[0.3em] text-slate-400 group-hover:text-white transition-colors">
                    Login
                  </span>
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-700 group-hover:border-sky-500 transition-all" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-700 group-hover:border-sky-500 transition-all" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-40 container mx-auto px-8 relative z-40">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-32"
        >
          <h2 className="text-7xl md:text-9xl font-black text-white text-center uppercase italic tracking-tighter">
            Core <span className="text-sky-500">Forge</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="group p-12 rounded-[4rem] bg-slate-900/20 border border-slate-800/50 hover:bg-slate-900/40 hover:border-sky-500/50 transition-all duration-700">
                <div className="text-sky-400 mb-10 w-20 h-20 flex items-center justify-center rounded-3xl bg-slate-950 border border-white/5 group-hover:scale-110 transition-transform">
                  {React.cloneElement(item.icon, { size: 36 })}
                </div>
                <h3 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="pb-24">
        <Cards />
        <About />
      </div>
      <ScrollToTop />
    </motion.div>
  );
};

export default Home;
