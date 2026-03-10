import React, { useMemo } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Check, Flame, Zap, Target } from 'lucide-react';

export default function MiniCalendar() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleString('default', { month: 'short' });
  const currentYear = today.getFullYear();
  
  // 1. Human-Standard Date Logic: Handles month rollovers accurately
  const weekDates = useMemo(() => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      
      return {
        fullDate: d,
        date: d.getDate(),
        isToday: d.toDateString() === today.toDateString(),
        isPast: d < today && d.toDateString() !== today.toDateString(),
        dayLabel: days[i],
        // 2. Simulated Data: In a real app, this comes from your activity DB
        completion: d < today ? Math.floor(Math.random() * (100 - 60 + 1)) + 60 : 0,
        activityType: i % 3 === 0 ? "Strength" : "Cardio"
      };
    });
  }, []);

  return (
    <section className="p-8 bg-[#0B0F1A] border border-slate-800/60 rounded-[3rem] shadow-2xl relative group overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -left-10 -bottom-10 h-32 w-32 bg-sky-500/5 blur-[60px] rounded-full pointer-events-none" />

      {/* Header Area */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Target size={22} className="group-hover:rotate-12 transition-transform duration-500" />
          </div>
          <div>
            <h3 className="font-black text-xl text-white tracking-tighter italic uppercase leading-none">Weekly Pulse</h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Streak Status</span>
              <div className="flex items-center gap-1 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                <Flame size={10} className="text-orange-500 fill-orange-500" />
                <span className="text-[9px] font-black text-orange-500">7 DAYS</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/40 px-4 py-2 rounded-xl border border-slate-700/50 backdrop-blur-md">
          <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.2em]">
            {currentMonth} <span className="text-slate-500">{currentYear}</span>
          </span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex justify-between items-end gap-2 relative z-10">
        <LayoutGroup>
          {weekDates.map((item, i) => (
            <div key={i} className="flex flex-col items-center flex-1 min-w-0">
              <span className={`text-[10px] font-black mb-4 uppercase tracking-tighter italic transition-colors
                ${item.isToday ? 'text-sky-400' : 'text-slate-600'}`}>
                {item.dayLabel}
              </span>

              <motion.div 
                whileHover={{ y: -8 }}
                className={`relative w-full aspect-[4/5] rounded-[1.25rem] flex flex-col items-center justify-center transition-all duration-500 cursor-pointer border
                  ${item.isToday 
                    ? 'bg-sky-500 border-sky-300 text-slate-950 shadow-2xl shadow-sky-500/40 scale-105 z-20' 
                    : item.isPast 
                      ? 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800/60' 
                      : 'bg-slate-900/20 border-slate-800/50 text-slate-600 hover:border-slate-700'}
                `}
              >
                {/* 3. Progress Ring: Visualizes the "intensity" of past workouts */}
                {item.isPast && (
                   <svg className="absolute inset-0 w-full h-full -rotate-90 p-1 opacity-20">
                     <circle
                       cx="50%" cy="50%" r="40%"
                       fill="none" stroke="currentColor" strokeWidth="2"
                       strokeDasharray="100"
                       strokeDashoffset={100 - item.completion}
                     />
                   </svg>
                )}

                <span className="text-lg font-black tabular-nums tracking-tighter relative z-10">{item.date}</span>
                
                {item.isPast && (
                  <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-slate-950 rounded-lg p-1 shadow-lg ring-4 ring-[#0B0F1A]">
                    <Check size={8} strokeWidth={6} />
                  </div>
                )}

                {item.isToday && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute bottom-2 w-1.5 h-1.5 bg-slate-950 rounded-full"
                  />
                )}
              </motion.div>

              {/* Status Indicators */}
              <div className="mt-4 h-1.5 w-full flex justify-center">
                {item.isToday ? (
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(dot => (
                      <motion.div 
                        key={dot}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: dot * 0.2 }}
                        className="h-1 w-1 rounded-full bg-sky-400"
                      />
                    ))}
                  </div>
                ) : (
                  <div className={`h-1 w-1 rounded-full transition-all duration-700 
                    ${item.isPast ? 'bg-sky-500/40' : 'bg-slate-800'}`} 
                  />
                )}
              </div>
            </div>
          ))}
        </LayoutGroup>
      </div>
    </section>
  );
}