// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Play, Clock, Flame, ArrowLeft, CheckCircle2,
//   Dumbbell, Zap, PlayCircle, Info, Activity, Trophy, ShieldCheck
// } from 'lucide-react';

// const WORKOUT_DATA = {
//   id: 'iron-core',
//   title: 'Iron Core & Abs',
//   description: 'A high-intensity core strengthening session designed to build functional stability and shredded abdominal muscles.',
//   time: '20m',
//   cal: '250',
//   level: 'Elite',
//   instructor: 'Coach Sarah',
//   videoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200',
//   muscles: ['Abs', 'Lower Back', 'Obliques'],
//   steps: [
//     { title: 'Plank Holds', duration: '60s', desc: 'Maintain a straight line from head to heels. Engage your glutes and core.' },
//     { title: 'Russian Twists', duration: '45s', desc: 'Keep your core engaged and feet elevated. Rotate your torso fully.' },
//     { title: 'Mountain Climbers', duration: '45s', desc: 'Drive your knees toward your chest rapidly while keeping hips level.' },
//     { title: 'Leg Raises', duration: '60s', desc: 'Lower your legs slowly without touching the ground. Keep lower back flat.' }
//   ]
// };

// export default function WorkoutDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(0);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-12 pb-24 selection:bg-sky-500/30"
//     >
//       <header className="flex flex-col gap-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="group flex items-center gap-4 text-slate-500 hover:text-sky-400 font-black text-xs uppercase tracking-[0.3em] transition-all w-fit"
//         >
//           <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 group-hover:bg-sky-500 group-hover:text-slate-950 transition-all shadow-xl">
//             <ArrowLeft size={18} strokeWidth={3} />
//           </div>
//           Exit Session
//         </button>

//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
//           <div className="max-w-4xl">
//             <div className="flex flex-wrap gap-4 mb-8">
//               <span className="bg-sky-500 text-slate-950 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic shadow-lg shadow-sky-500/20">
//                 {WORKOUT_DATA.level} Intensity
//               </span>
//               <span className="bg-slate-800 text-slate-400 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-slate-700">
//                 Tactical Core
//               </span>
//             </div>
//             <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-[0.85] mb-8">
//               {WORKOUT_DATA.title}
//             </h1>
//             <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
//               {WORKOUT_DATA.description}
//             </p>
//           </div>

//           <div className="flex gap-6 w-full lg:w-auto">
//              <MetricCard icon={<Clock className="text-sky-400" />} label="Duration" value={WORKOUT_DATA.time} />
//              <MetricCard icon={<Flame className="text-rose-500" />} label="Est. Burn" value={`${WORKOUT_DATA.cal}`} unit="KCAL" />
//           </div>
//         </div>
//       </header>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">

//         {/* Left Column: Visuals */}
//         <div className="xl:col-span-2 space-y-12">
//           {/* Tactical Video Player */}
//           <div className="group relative aspect-video rounded-[4rem] overflow-hidden bg-slate-950 shadow-3xl border-[12px] border-slate-900 shadow-sky-500/5">
//             <img src={WORKOUT_DATA.videoUrl} className="w-full h-full object-cover opacity-60 grayscale-[0.2] transition-all duration-1000 group-hover:scale-105" alt="" />

//             <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 group-hover:bg-slate-950/40 transition-all backdrop-blur-[2px]">
//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: 5 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="h-32 w-32 bg-sky-500 text-slate-950 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-sky-500/40"
//               >
//                 <Play size={48} fill="currentColor" className="ml-2" />
//               </motion.button>
//             </div>

//             <div className="absolute top-10 left-10 flex items-center gap-4 bg-slate-950/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10">
//                <div className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
//                <p className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Bio-Feedback Active</p>
//             </div>
//           </div>

//           {/* Muscle & Coaching Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="p-12 bg-slate-900 rounded-[3.5rem] border border-slate-800 relative overflow-hidden group">
//               <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4 italic uppercase tracking-tighter">
//                 <Dumbbell className="text-sky-400" size={28} /> Target Zones
//               </h3>
//               <div className="flex flex-wrap gap-4 relative z-10">
//                 {WORKOUT_DATA.muscles.map((m, i) => (
//                   <span key={i} className="px-7 py-4 rounded-2xl bg-slate-800 text-xs font-black text-slate-300 uppercase tracking-[0.15em] border border-slate-700 group-hover:border-sky-500/30 transition-colors">
//                     {m}
//                   </span>
//                 ))}
//               </div>
//               <Activity className="absolute -right-12 -bottom-12 text-sky-500/5 rotate-12" size={240} />
//             </div>

//             <div className="p-12 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-[3.5rem] text-slate-950 shadow-xl shadow-sky-500/10 relative overflow-hidden">
//               <ShieldCheck className="mb-6 opacity-30" size={40} />
//               <h3 className="text-3xl font-black mb-4 tracking-tighter italic uppercase">Tactical Tip</h3>
//               <p className="text-lg font-bold leading-tight opacity-90 italic">
//                 "Speed is the enemy of stability. Control the descent, dominate the hold. Time under tension is your best friend."
//               </p>
//               <p className="mt-8 font-black text-xs uppercase tracking-[0.2em] bg-slate-950/10 w-fit px-4 py-1.5 rounded-lg">— {WORKOUT_DATA.instructor}</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Interactive Circuit */}
//         <aside className="space-y-10">
//           <div className="flex justify-between items-end px-6">
//             <div>
//               <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">The Circuit</h3>
//               <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Status: In Progress</p>
//             </div>
//             <div className="bg-sky-500/10 p-3 rounded-2xl border border-sky-500/20">
//                 <Zap className="text-sky-400" size={24} strokeWidth={2.5} />
//             </div>
//           </div>

//           <div className="space-y-5">
//             {WORKOUT_DATA.steps.map((step, i) => (
//               <motion.div
//                 key={i}
//                 layout
//                 onClick={() => setActiveStep(i)}
//                 className={`p-10 rounded-[3.5rem] border transition-all cursor-pointer relative overflow-hidden group
//                   ${activeStep === i
//                     ? 'bg-sky-500 border-sky-400 text-slate-950 shadow-2xl shadow-sky-500/20 translate-x-4'
//                     : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
//                   }`}
//               >
//                 <div className="flex justify-between items-start relative z-10">
//                   <div className="flex items-center gap-4">
//                     <span className={`text-xs font-black uppercase tracking-widest italic ${activeStep === i ? 'text-slate-900/60' : 'text-slate-600'}`}>
//                       {i + 1 < 10 ? `0${i + 1}` : i + 1}
//                     </span>
//                     <h4 className="text-2xl font-black tracking-tighter italic uppercase">{step.title}</h4>
//                   </div>
//                   {activeStep > i ? (
//                     <div className="bg-emerald-500 p-1.5 rounded-full shadow-lg">
//                         <CheckCircle2 size={20} className="text-slate-950" strokeWidth={3} />
//                     </div>
//                   ) : (
//                     <div className={`h-8 w-8 rounded-full border-2 transition-colors ${activeStep === i ? 'border-slate-950/20' : 'border-slate-800 group-hover:border-slate-600'}`} />
//                   )}
//                 </div>

//                 <div className="flex items-center gap-3 mt-4 relative z-10">
//                   <Clock size={16} strokeWidth={3} className={activeStep === i ? 'text-slate-900' : 'text-sky-500'} />
//                   <p className={`text-xs font-black uppercase tracking-[0.2em] font-mono ${activeStep === i ? 'text-slate-900' : 'text-slate-400'}`}>
//                     {step.duration}
//                   </p>
//                 </div>

//                 <AnimatePresence>
//                   {activeStep === i && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       className="mt-8 relative z-10"
//                     >
//                       <p className="text-sm font-bold leading-relaxed text-slate-900/80 mb-6 italic">
//                         {step.desc}
//                       </p>
//                       <div className="h-3 w-full bg-slate-950/10 rounded-full overflow-hidden p-1">
//                          <motion.div
//                            initial={{ width: 0 }}
//                            animate={{ width: '100%' }}
//                            transition={{ duration: 60, ease: "linear" }}
//                            className="h-full bg-slate-950 rounded-full"
//                          />
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Backlit Number Decoration */}
//                 <span className={`absolute -right-6 -bottom-8 text-9xl font-black opacity-[0.04] italic pointer-events-none select-none ${activeStep === i ? 'text-slate-950' : 'text-white'}`}>
//                   {i + 1}
//                 </span>
//               </motion.div>
//             ))}
//           </div>

//           <button className="group w-full py-8 bg-white text-slate-950 rounded-[3rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-sky-400 active:scale-95 flex items-center justify-center gap-4 mt-12 italic">
//             Terminate Session <Trophy size={22} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
//           </button>
//         </aside>
//       </div>
//     </motion.div>
//   );
// }

// function MetricCard({ icon, label, value, unit = "" }) {
//   return (
//     <div className="flex-1 lg:flex-none flex items-center gap-6 bg-slate-900 p-8 rounded-[3rem] border border-slate-800 min-w-[220px] shadow-xl">
//       <div className="h-14 w-14 rounded-2xl bg-slate-800 flex items-center justify-center shadow-inner">
//         {React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}
//       </div>
//       <div>
//         <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-2">{label}</p>
//         <div className="flex items-baseline gap-2">
//             <p className="text-3xl font-black text-white leading-none italic tabular-nums">{value}</p>
//             {unit && <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{unit}</span>}
//         </div>
//       </div>
//     </div>
//   );
// }
