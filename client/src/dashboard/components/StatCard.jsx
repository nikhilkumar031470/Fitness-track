import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

// 1. Externalized Theme Config: Keeps the component logic clean and readable
const CARD_VARIANTS = {
  blue: {
    bg: "bg-sky-500/10",
    icon: "text-sky-400",
    bar: "bg-sky-400",
    glow: "bg-sky-500/20",
  },
  red: {
    bg: "bg-rose-500/10",
    icon: "text-rose-400",
    bar: "bg-rose-500",
    glow: "bg-rose-500/20",
  },
  green: {
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
    bar: "bg-emerald-500",
    glow: "bg-emerald-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    icon: "text-orange-400",
    bar: "bg-orange-500",
    glow: "bg-orange-500/20",
  },
};

export function StatCard({
  title,
  value,
  unit,
  icon,
  trend,
  variant = "blue",
  progress = 70,
}) {
  const theme = CARD_VARIANTS[variant] || CARD_VARIANTS.blue;

  // 2. Human-friendly Trend Logic
  const getTrendStyles = () => {
    if (!trend) return null;
    if (trend.includes("+")) return { color: "bg-emerald-500/10 text-emerald-400", Icon: TrendingUp };
    if (trend.includes("-")) return { color: "bg-rose-500/10 text-rose-400", Icon: TrendingDown };
    return { color: "bg-white/5 text-slate-500", Icon: null };
  };

  const trendData = getTrendStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="relative p-7 bg-[#0B0F1A] rounded-[2.5rem] border border-white/5 shadow-2xl group overflow-hidden"
    >
      {/* Visual Polish: Background Glow */}
      <div className={`absolute -right-4 -top-4 h-32 w-32 rounded-full opacity-0 group-hover:opacity-40 blur-3xl transition-opacity duration-700 ${theme.glow}`} />

      <div className="flex justify-between items-start mb-6">
        {/* Icon Wrapper */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${theme.bg} ${theme.icon}`}>
          {React.cloneElement(icon, { size: 22, strokeWidth: 2.5 })}
        </div>

        {/* Trend Indicator */}
        {trendData && (
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black tracking-tighter ${trendData.color}`}>
            {trendData.Icon && <trendData.Icon size={12} />}
            {trend}
          </div>
        )}
      </div>

      {/* Main Stats */}
      <div className="space-y-1">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
          {title}
        </p>
        <div className="flex items-baseline gap-1.5">
          <h4 className="text-3xl font-black text-white tracking-tight tabular-nums">
            {value}
          </h4>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
            {unit}
          </span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Goal Progress</span>
          <span className="text-[10px] font-black text-white italic">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className={`h-full rounded-full shadow-lg ${theme.bar}`}
          />
        </div>
      </div>
    </motion.div>
  );
}