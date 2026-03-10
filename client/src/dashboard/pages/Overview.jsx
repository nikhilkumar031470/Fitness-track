import React from 'react';
import { Play, Flame, Footprints, Clock, ArrowRight, Zap, Target, Activity, Trophy, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

export default function Overview() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' 
  });

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12 pb-16 selection:bg-sky-500/30 font-sans"
    >
      {/* 1. Tactical Command Center (Hero) */}
      <section className="relative overflow-hidden rounded-[3.5rem] bg-slate-900 border border-slate-800/60 p-10 md:p-16 lg:p-20 text-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]">
        {/* Animated Background Atmosphere */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex flex-wrap items-center gap-4">
               <span className="rounded-2xl bg-sky-500/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 border border-sky-500/20 backdrop-blur-md">
                 {today}
               </span>
               <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 border border-white/10">
                  <Sparkles size={12} className="text-sky-400" />
                  Primary Objective: Hypertrophy
               </div>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter italic uppercase">
              Command <br/>
              <span className="text-sky-500 not-italic">The Day,</span> <br/>
              Sameer.
            </h1>
            
            <div className="flex items-start gap-5 max-w-lg">
              <div className="mt-2 h-12 w-1.5 bg-sky-500 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                Recovery index is <span className="text-white font-black italic underline decoration-sky-500 decoration-4 underline-offset-8">94% (PEAK)</span>. 
                Neural readiness supports max-load training.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <button className="group flex items-center gap-6 rounded-[2rem] bg-sky-500 px-12 py-7 text-sm font-black text-slate-950 shadow-2xl shadow-sky-500/30 transition-all hover:bg-sky-400 active:scale-95 uppercase tracking-[0.2em]">
                Initialize HIIT <Play size={20} fill="currentColor" className="group-hover:scale-125 transition-transform" />
              </button>
              <button className="rounded-[2rem] bg-slate-800/40 px-12 py-7 text-sm font-black text-white border border-white/5 backdrop-blur-xl hover:bg-slate-800 transition-all uppercase tracking-[0.2em]">
                View Protocol
              </button>
            </div>
          </motion.div>

          {/* Elite Tier Visualizer */}
          <motion.div variants={itemVariants} className="hidden lg:flex justify-end relative">
            <div className="relative bg-slate-900/50 backdrop-blur-3xl border border-white/5 p-12 rounded-[4rem] text-center w-80 shadow-3xl ring-1 ring-white/10">
                <div className="relative inline-flex items-center justify-center mb-10">
                  <svg className="w-52 h-52 transform -rotate-90">
                    <circle cx="104" cy="104" r="94" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                    <motion.circle 
                        cx="104" cy="104" r="94" stroke="currentColor" strokeWidth="14" fill="transparent" 
                        strokeDasharray="590" 
                        initial={{ strokeDashoffset: 590 }}
                        animate={{ strokeDashoffset: 590 - (590 * 0.75) }}
                        transition={{ duration: 2.5, ease: "circOut" }}
                        className="text-sky-500 drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]" 
                        strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-6xl font-black italic tracking-tighter tabular-nums text-white">75<span className="text-2xl text-slate-500">%</span></span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">Week Load</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 text-sky-400 mb-3">
                    <Trophy size={18} />
                    <span className="text-[11px] font-black uppercase tracking-widest italic">Level 16 Elite</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full w-2/3 bg-sky-500" 
                  />
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Real-time Biometrics Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <StatCard 
          title="Metabolic Flux" 
          value="1,240" 
          unit="kcal" 
          trend="+12% VS AVG" 
          colorClass="text-rose-500 bg-rose-500/10"
          icon={<Flame size={28} strokeWidth={2.5} />} 
        />
        <StatCard 
          title="Step Geometry" 
          value="8,432" 
          unit="steps" 
          trend="84% TARGET"
          colorClass="text-sky-400 bg-sky-400/10"
          icon={<Footprints size={28} strokeWidth={2.5} />} 
        />
        <StatCard 
          title="Sync Quality" 
          value="92" 
          unit="bpm" 
          trend="STABLE"
          colorClass="text-emerald-400 bg-emerald-400/10"
          icon={<Activity size={28} strokeWidth={2.5} />} 
        />
      </div>

      {/* 3. Personalized Recommendation */}
      <section className="space-y-10">
        <div className="flex items-center justify-between px-6">
           <div className="space-y-1">
             <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase flex items-center gap-4 leading-none">
                Bio-Suggested Protocol
             </h2>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Engineered for your DNA</p>
           </div>
           <button className="group flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] hover:text-sky-500 transition-all">
             Protocol Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        <motion.div 
          whileHover={{ y: -8 }}
          className="group relative flex flex-col xl:flex-row gap-12 items-center bg-slate-900/40 backdrop-blur-sm p-12 rounded-[4rem] border border-slate-800/80 transition-all shadow-3xl overflow-hidden ring-1 ring-white/5"
        >
          <div className="relative overflow-hidden rounded-[3rem] w-full xl:w-110 h-80 shrink-0 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Elite Workout"
            />
            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/10 transition-colors duration-500" />
            <div className="absolute top-8 left-8 bg-sky-500 px-6 py-2.5 rounded-2xl shadow-2xl">
                <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.3em] italic">Tier 1 Session</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-8 text-center xl:text-left">
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4">
              <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.3em] bg-sky-400/10 px-5 py-2.5 rounded-xl border border-sky-400/20">Metabolic Conditioning</span>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">
                <Clock size={14} /> 45 MIN • <Zap size={14} className="text-orange-500" /> HIGH INTENSITY
              </div>
            </div>
            
            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.85] italic uppercase">Elite Full-Body <br/>Oxidation Blast</h3>
            
            <p className="text-slate-400 font-medium leading-relaxed text-lg max-w-2xl">
              Glucose levels and circadian data indicate your EPOC capacity is at its 24-hour peak. 
              Executing this now will optimize thermogenesis through the sleep cycle.
            </p>
            
            <div className="pt-6 flex flex-wrap items-center justify-center xl:justify-start gap-12">
              <button className="flex items-center gap-4 bg-white text-slate-950 px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] shadow-2xl transition-all hover:bg-sky-400 hover:text-slate-950 active:scale-95">
                Execute Plan <ArrowRight size={20} strokeWidth={4} />
              </button>
              <div className="flex items-center gap-5">
                <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                    <img key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 shadow-xl" src={`https://i.pravatar.cc/150?u=${i+10}`} alt="user" />
                    ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-white uppercase italic tracking-tighter">+14,204 Active</span>
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Training Now</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

function StatCard({ title, value, unit, trend, icon, colorClass }) {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -10 }}
      className="relative rounded-[3.5rem] border border-slate-800/80 bg-slate-900 p-12 shadow-2xl transition-all hover:border-sky-500/30 group overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        {React.cloneElement(icon, { size: 120 })}
      </div>

      <div className="relative z-10">
        <div className="mb-12 flex items-center justify-between">
          <div className={`flex h-20 w-20 items-center justify-center rounded-[1.75rem] shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${colorClass}`}>
            {icon}
          </div>
          <div className="text-right">
             <span className="text-[10px] font-black text-sky-400 bg-sky-400/10 px-5 py-2.5 rounded-2xl uppercase tracking-[0.15em] border border-sky-400/10 font-mono">
              {trend}
            </span>
          </div>
        </div>
        
        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-500 mb-4 italic leading-none">{title}</p>
        <div className="flex items-baseline gap-3">
          <h4 className="text-6xl font-black text-white tracking-tighter tabular-nums italic">{value}</h4>
          <span className="text-sm font-black text-slate-600 uppercase tracking-widest">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
}