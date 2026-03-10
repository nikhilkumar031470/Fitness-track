import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Zap, Star, Flame, ChevronRight, Target, Trophy, 
  ArrowUpRight, Fingerprint, ShieldCheck, Activity, BarChart3, Clock,
  Waves, BrainCircuit
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Progress() {
  const activityDots = useMemo(() => Array.from({ length: 28 }, () => ({
    level: Math.floor(Math.random() * 4), 
  })), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#020202] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-blue-500/30 tracking-tight">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 pt-8 pb-20 space-y-12"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-end px-1 border-b border-slate-100 dark:border-white/5 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] tracking-[0.5em] uppercase italic">
              <Activity size={12} className="animate-pulse" /> Biometric Sync Active
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8] dark:text-white">
              User <span className="text-blue-600 drop-shadow-sm">Evolution</span>
            </h1>
          </div>
          <div className="hidden md:block text-right font-mono opacity-40">
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Archive_Ref: v5.0.2</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Status: Optimized</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-8 space-y-10 flex flex-col">
            
            <motion.div 
              variants={itemVariants} 
              whileHover={{ scale: 1.01 }}
              className="relative p-10 bg-blue-600 rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-blue-600/30 ring-1 ring-white/10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <motion.div 
                  initial={{ rotate: -10 }}
                  animate={{ rotate: -3 }}
                  className="h-32 w-32 bg-white rounded-[2rem] flex flex-col items-center justify-center text-blue-600 shadow-2xl transition-transform shrink-0"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none opacity-60">Level</span>
                  <span className="text-6xl font-black italic tracking-tighter">08</span>
                </motion.div>
                <div className="text-center md:text-left space-y-5 text-white">
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none tracking-[-0.05em]">Elite Protocolist</h2>
                  <div className="bg-white/15 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] shadow-inner">
                    <Flame size={14} className="fill-current text-orange-400 animate-pulse" /> 14 Day Streak
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-8 opacity-80">Protocol Consistency</h3>
              <div className="grid grid-cols-7 md:grid-cols-14 gap-2.5">
                {activityDots.map((dot, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    className={`aspect-square rounded-md border shadow-sm transition-colors cursor-crosshair ${
                      dot.level === 3 ? 'bg-blue-600 border-blue-400 shadow-blue-500/20' :
                      dot.level === 2 ? 'bg-blue-600/60 border-blue-500/20' :
                      dot.level === 1 ? 'bg-blue-600/20 border-blue-500/10' : 'bg-slate-50 dark:bg-white/5 opacity-30 border-transparent'
                    }`} 
                  />
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { title: 'The Awakening', date: 'Jan 12', icon: ShieldCheck, color: 'text-emerald-500', glow: 'group-hover:shadow-emerald-500/10' },
                { title: 'Neural Flow', date: 'Feb 05', icon: Fingerprint, color: 'text-blue-500', glow: 'group-hover:shadow-blue-500/10' },
              ].map((m, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }}
                  className={`p-6 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 rounded-[2.5rem] flex items-center gap-5 group shadow-sm transition-all hover:shadow-xl ${m.glow}`}
                >
                  <div className={`h-14 w-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center ${m.color} shrink-0 transition-transform group-hover:scale-110 shadow-inner`}>
                    <m.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-md font-black dark:text-white uppercase italic tracking-tighter leading-none">{m.title}</h4>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2.5 opacity-60 font-mono">{m.date} // ACTIVE</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div whileHover={{ y: -5 }} className="p-7 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 rounded-[2.5rem] flex flex-col justify-between shadow-sm h-44 hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500"><Waves size={22} /></div>
                  <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-sm">+4.2%</span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-50">Bio-Recovery</p>
                  <h3 className="text-4xl font-black italic tracking-tighter dark:text-white">82%</h3>
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="p-7 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 rounded-[2.5rem] flex flex-col justify-between shadow-sm h-44 hover:shadow-xl transition-all group">
                <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500 shadow-inner w-fit group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500"><BrainCircuit size={22} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-50">Focus Depth</p>
                  <h3 className="text-4xl font-black italic tracking-tighter dark:text-white">4.2h<span className="text-sm ml-1.5 opacity-30 font-bold uppercase not-italic tracking-normal">Avg/Day</span></h3>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex flex-col h-full gap-8">
        
            <motion.div variants={itemVariants} className="p-8 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 rounded-[2.5rem] space-y-10 shadow-sm ring-1 ring-black/[0.02]">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 opacity-80">Evolution Bar</h3>
              {[
                { label: 'Strength', val: 88, color: 'bg-blue-600' },
                { label: 'Endurance', val: 72, color: 'bg-blue-600/60' },
                { label: 'Cognitive', val: 94, color: 'bg-emerald-500' }
              ].map((stat, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em]">
                    <span className="opacity-50">{stat.label}</span>
                    <span className="text-blue-600 font-mono font-bold tracking-tight">{stat.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-0.5 ring-1 ring-slate-200/50 dark:ring-white/5">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${stat.val}%` }} 
                      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} 
                      className={`h-full ${stat.color} rounded-full shadow-[0_0_12px_rgba(37,99,235,0.2)]`} 
                    />
                  </div>
                </div>
              ))}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all shadow-lg active:shadow-inner"
              >
                <Link to={"/dashboard/add-progress"}>Add Progrss</Link>
              </motion.button>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              whileHover={{ scale: 1.02 }}
              className="p-9 bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] relative overflow-hidden group shadow-sm flex-grow flex flex-col justify-end ring-1 ring-emerald-500/10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)]" />
              <Trophy className="absolute -right-4 top-4 size-32 text-emerald-500 opacity-[0.03] -rotate-12 group-hover:rotate-0 group-hover:opacity-[0.07] transition-all duration-700 ease-out" />
              <div className="space-y-6 relative z-10">
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-14 w-14 bg-emerald-500 text-white rounded-[1.25rem] flex items-center justify-center shadow-xl shadow-emerald-500/30"
                >
                  <Trophy size={26} fill="currentColor" />
                </motion.div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-black dark:text-white uppercase italic tracking-tighter leading-none">Next Milestone</h4>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed opacity-80">
                    Reach 30 days of clean nutrition to unlock <span className="text-emerald-500 font-black italic">"Zen Mode"</span> protocol.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
        <motion.footer variants={itemVariants} className="pt-12 flex flex-col md:flex-row gap-6 justify-between items-center border-t border-slate-100 dark:border-white/5 px-4">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] opacity-30 italic font-mono">
            <Clock size={14} className="text-blue-600 animate-spin-slow" />
            Operational_Session // 09:03:26
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.4em] opacity-50">
            <span className="hover:text-blue-600 cursor-pointer transition-colors hover:tracking-[0.5em] duration-300">Export_Data</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors hover:tracking-[0.5em] duration-300">Documentation</span>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}