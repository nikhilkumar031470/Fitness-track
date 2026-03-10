import React, { useRef } from 'react';
import { ShieldCheck, Zap, BarChart3, Users, Target, Rocket } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const KineticCard = ({ f, index }) => {
  const cardRef = useRef(null);

  // Mouse coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-response spring physics for that "magnetic" feel
  const springConfig = { damping: 20, stiffness: 150 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Layer 1: The Base Rotation (The "Plate")
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Layer 2: Icon Float (Moves more than the plate)
  const iconX = useTransform(mouseXSpring, [-0.5, 0.5], [-25, 25]);
  const iconY = useTransform(mouseYSpring, [-0.5, 0.5], [-25, 25]);

  // Layer 3: Text Float (Moves slightly less than the icon)
  const textX = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);
  const textY = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-[450px] w-full bg-slate-900/40 rounded-[3rem] border border-white/5 hover:border-sky-500/40 transition-colors duration-700 cursor-none"
    >
      {/* BACKGROUND DEPTH: The "Glass" Shine */}
      <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
        <motion.div 
          style={{
            x: useTransform(mouseXSpring, [-0.5, 0.5], ["-20%", "20%"]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], ["-20%", "20%"]),
          }}
          className="absolute inset-[-50%] bg-[radial-gradient(circle_at_center,_#38bdf810_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      {/* CENTER CONTENT CONTAINER */}
      <div className="relative h-full w-full p-10 flex flex-col justify-between items-start z-10">
        
        {/* TOP LAYER: Floating Icon */}
        <motion.div 
          style={{ x: iconX, y: iconY, translateZ: 100 }}
          className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl text-sky-400 shadow-2xl border border-white/10 group-hover:shadow-sky-500/20 transition-shadow"
        >
          {React.cloneElement(f.icon, { size: 40, strokeWidth: 1.5 })}
        </motion.div>

        {/* MIDDLE LAYER: Floating Text Content */}
        <motion.div style={{ x: textX, y: textY, translateZ: 50 }}>
          <h3 className="text-3xl font-black text-white mb-4 leading-none tracking-tighter uppercase italic">
            {f.title}
          </h3>
          <p className="text-slate-400 font-medium text-lg leading-snug max-w-[250px]">
            {f.desc}
          </p>
        </motion.div>

        {/* BOTTOM LAYER: Animated Status Bar */}
        <div className="w-full">
           <div className="flex justify-between items-center mb-2">
             <span className="text-[10px] font-bold text-sky-500 tracking-[0.3em]">SYSTEM ACTIVE</span>
             <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
           </div>
           <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
             <motion.div 
               initial={{ x: "-100%" }}
               whileInView={{ x: "100%" }}
               transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
               className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-sky-500 to-transparent"
             />
           </div>
        </div>
      </div>

      {/* CUSTOM CURSOR (Spotlight that follows mouse) */}
      <motion.div 
         style={{ 
           x: useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]),
           y: useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]),
         }}
         className="absolute top-0 left-0 w-4 h-4 bg-sky-400 rounded-full blur-sm opacity-0 group-hover:opacity-100 pointer-events-none z-50"
      />
    </motion.div>
  );
};

const Cards = () => {
  const features = [
    { title: "Real-time Sync", desc: "Instant biometrics data transfer.", icon: <Zap /> },
    { title: "Neural Privacy", desc: "End-to-end encrypted progress.", icon: <ShieldCheck /> },
    { title: "Visual Logic", desc: "Advanced body metric charts.", icon: <BarChart3 /> },
    { title: "Global Nexus", desc: "Connect with elite athletes.", icon: <Users /> },
    { title: "Apex Goals", desc: "Milestones for true evolution.", icon: <Target /> },
    { title: "Hyper MERN", desc: "Zero-latency performance.", icon: <Rocket /> }
  ];

  return (
    <div className="bg-[#0f172a] py-32 px-8 perspective-[2000px]">
      <div className="container mx-auto">
        <div className="mb-24 flex flex-col items-center">
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-1 w-20 bg-sky-500 mb-8" 
            />
            <h2 className="text-6xl md:text-8xl font-black text-white text-center tracking-tighter uppercase">
               The <span className="text-sky-500">Engine</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((f, index) => (
            <KineticCard key={index} f={f} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;