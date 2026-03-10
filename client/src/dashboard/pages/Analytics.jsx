import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Calendar, Download, TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";

// 1. Externalized Theme: The "Human" way to keep a consistent UI
const CHART_THEME = {
  grid: "#1e293b",
  text: "#64748b",
  primary: "#0ea5e9",
  danger: "#f43f5e",
  fontFamily: "inherit"
};

const DATA = [
  { day: "Mon", burn: 2100, heart: 72 },
  { day: "Tue", burn: 2800, heart: 85 },
  { day: "Wed", burn: 1900, heart: 78 },
  { day: "Thu", burn: 3200, heart: 110 },
  { day: "Fri", burn: 2500, heart: 95 },
  { day: "Sat", burn: 4100, heart: 125 },
  { day: "Sun", burn: 3500, heart: 90 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#0f172a] border border-slate-800 shadow-2xl p-4 rounded-2xl backdrop-blur-md">
      <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <p className="text-sm font-black text-white">
            {entry.value.toLocaleString()} 
            <span className="text-[10px] text-slate-400 font-normal italic ml-1 lowercase">
              {entry.name === 'burn' ? 'kcal' : 'bpm'}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default function Analytics() {
  // 2. Memoized values: Prevents unnecessary recalculations
  const stats = useMemo(() => {
    const burns = DATA.map(d => d.burn);
    return {
      peak: Math.max(...burns),
      avg: Math.round(burns.reduce((a, b) => a + b, 0) / burns.length)
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 p-1"
    >
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Performance</h2>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Biometric Protocol // v3.0</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-black text-slate-400 uppercase tracking-tighter hover:border-sky-500/30 transition-all">
            <Calendar size={14} /> Week View
          </button>
          <button className="p-2.5 bg-sky-500 text-slate-950 rounded-xl hover:bg-sky-400 shadow-lg shadow-sky-500/20 transition-all active:scale-90" aria-label="Download Report">
            <Download size={18} />
          </button>
        </div>
      </header>

      {/* Main Metabolic Chart */}
      <section className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-sm shadow-inner">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 rounded-xl">
              <TrendingUp size={20} className="text-sky-400" />
            </div>
            <div>
              <h3 className="font-black text-white uppercase tracking-tight text-sm">Caloric Expenditure</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Daily burn rate</p>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="text-[10px] font-black text-emerald-400 uppercase italic">
              Peak Log: {stats.peak.toLocaleString()} kcal
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA}>
              <defs>
                <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_THEME.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_THEME.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="6 6" vertical={false} stroke={CHART_THEME.grid} opacity={0.5} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: CHART_THEME.text, fontSize: 11, fontWeight: 900}}
                dy={15}
              />
              <YAxis hide domain={[0, 'auto']} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: CHART_THEME.primary, strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="burn"
                name="burn"
                stroke={CHART_THEME.primary}
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorBurn)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Secondary Metrics Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem]">
          <div className="flex items-center gap-3 mb-8">
            <Activity size={18} className="text-sky-400" />
            <h3 className="font-black text-white uppercase tracking-tight text-sm">Heart Rate Intensity</h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: CHART_THEME.text, fontSize: 10, fontWeight: 800}}
                />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.03)'}} />
                <Bar dataKey="heart" name="heart" radius={[6, 6, 6, 6]} barSize={24}>
                  {DATA.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.heart > 110 ? CHART_THEME.danger : CHART_THEME.primary}
                      fillOpacity={0.8}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insight Panel */}
        <aside className="bg-[#0f172a] border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-between shadow-2xl">
          <div>
            <h3 className="font-black text-white uppercase tracking-tight mb-8 text-sm border-l-4 border-sky-500 pl-4">Insight Summary</h3>
            <div className="space-y-6">
              <SummaryItem label="Max Daily Burn" value={stats.peak.toLocaleString()} unit="kcal" color="text-sky-400" />
              <SummaryItem label="Avg Cardio Load" value="Aerobic" color="text-rose-400" />
              <SummaryItem label="Recovery Score" value="92" unit="%" color="text-emerald-400" />
              <SummaryItem label="Active Streak" value="12" unit="days" color="text-orange-400" />
            </div>
          </div>
          
          <button className="w-full mt-10 py-4 bg-white/5 hover:bg-sky-500 hover:text-slate-950 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all">
            Generate Intelligence Report
          </button>
        </aside>
      </div>
    </motion.div>
  );
}

function SummaryItem({ label, value, unit, color }) {
  return (
    <div className="group cursor-default">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-sky-500/50 transition-colors">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-black italic tracking-tighter ${color}`}>{value}</span>
        {unit && <span className="text-[10px] font-bold text-slate-600 uppercase">{unit}</span>}
      </div>
    </div>
  );
}