import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
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
import { Link } from "react-router-dom";

const CHART_THEME = {
  grid: "#1e293b",
  text: "#64748b",
  primary: "#0ea5e9",
  danger: "#f43f5e",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#0f172a] border border-slate-800 shadow-2xl p-4 rounded-2xl backdrop-blur-md">
      <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">
        {label}
      </p>

      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />

          <p className="text-sm font-black text-white">
            {entry.value.toLocaleString()}

            <span className="text-[10px] text-slate-400 ml-1 italic lowercase">
              {entry.name === "burn" ? "kcal" : "bpm"}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default function Analytics() {
  const [progressData, setProgressData] = useState([]);
  const [nutritionData, setNutritionData] = useState([]);

  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchProgress = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/fetch-progress");

      const allProgress = res.data.progress || [];

      const userProgress = allProgress.filter(
        (item) => String(item.userID) === String(loggedUser?._id),
      );

      setProgressData(userProgress);
    } catch (err) {
      console.log("Progress Fetch Error", err);

      setProgressData([]);
    }
  };

  const fetchNutrition = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/fetch-nutrition");

      const allMeals = res.data.nutritiondata || [];

      const userMeals = allMeals.filter(
        (meal) => String(meal.userID) === String(loggedUser?._id),
      );

      setNutritionData(userMeals);
    } catch (err) {
      console.log("Nutrition Fetch Error", err);

      setNutritionData([]);
    }
  };

  useEffect(() => {
    fetchProgress();
    fetchNutrition();
  }, []);

  const totalCalories = nutritionData.reduce(
    (sum, meal) => sum + Number(meal.calories || 0),
    0,
  );

  const DATA = useMemo(() => {
    const sortedProgress = [...progressData].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    return sortedProgress.map((item) => ({
      day: new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short",
      }),

      burn:
        (Number(item.liftWeight) || 0) * 8 +
        (Number(item.runTime) || 0) * 15 +
        totalCalories / 7,

      heart: (Number(item.runTime) || 0) * 10,
    }));
  }, [progressData, totalCalories]);

  const stats = useMemo(() => {
    if (!DATA.length) return { peak: 0, avg: 0 };

    const burns = DATA.map((d) => d.burn);

    return {
      peak: Math.max(...burns),
      avg: Math.round(burns.reduce((a, b) => a + b, 0) / burns.length),
    };
  }, [DATA]);

  const activeDays = progressData.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 p-1"
    >
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
            Performance
          </h2>

          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
            Biometric Protocol // v3.0
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/dashboard/add-progress"
            className="flex items-center gap-2 px-8 py-4 bg-sky-500 border border-slate-950 rounded-xl text-xs font-black uppercase"
          >
            Add Progress
          </Link>

          <button className="p-4.5 bg-sky-500 text-slate-950 rounded-xl">
            <Download size={18} />
          </button>
        </div>
      </header>

      <section className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-sm shadow-inner">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 rounded-xl">
              <TrendingUp size={20} className="text-sky-400" />
            </div>

            <div>
              <h3 className="font-black text-white uppercase text-sm">
                Caloric Expenditure
              </h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase">
                Daily burn rate
              </p>
            </div>
          </div>

          <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="text-[10px] font-black text-emerald-400 uppercase italic">
              Peak Log: {stats.peak.toLocaleString()} kcal
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer>
            <AreaChart data={DATA}>
              <defs>
                <linearGradient id="burnGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="6 6"
                vertical={false}
                stroke="#1e293b"
                opacity={0.45}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11, fontWeight: 900 }}
                dy={14}
              />

              <YAxis hide />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#0ea5e9", strokeWidth: 1 }}
              />

              <Area
                type="natural"
                dataKey="burn"
                name="burn"
                stroke="#0ea5e9"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#burnGradient)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem]">
          <div className="flex items-center gap-3 mb-8">
            <Activity size={18} className="text-sky-400" />
            <h3 className="font-black text-white uppercase text-sm">
              Heart Rate Intensity
            </h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={DATA}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 10, fontWeight: 800 }}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />

                <Bar dataKey="heart" radius={[6, 6, 6, 6]} barSize={24}>
                  {DATA.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.heart > 110 ? "#f43f5e" : "#0ea5e9"}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <aside className="bg-[#0f172a] border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-between shadow-2xl">
          <div>
            <h3 className="font-black text-white uppercase text-sm border-l-4 border-sky-500 pl-4 mb-8">
              Insight Summary
            </h3>

            <div className="space-y-6">
              <SummaryItem
                label="Max Daily Burn"
                value={stats.peak.toLocaleString()}
                unit="kcal"
                color="text-sky-400"
              />
              <SummaryItem
                label="Avg Cardio Load"
                value="Aerobic"
                color="text-rose-400"
              />
              <SummaryItem
                label="Recovery Score"
                value="92"
                unit="%"
                color="text-emerald-400"
              />
              <SummaryItem
                label="Active Streak"
                value={activeDays}
                unit="days"
                color="text-orange-400"
              />
            </div>
          </div>
          <button className="w-full mt-10 py-4 bg-white/5 hover:bg-sky-500 hover:text-slate-950 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all">
            Generate Intelligence Report
          </button>
          x
        </aside>
      </div>
    </motion.div>
  );
}

function SummaryItem({ label, value, unit, color }) {
  return (
    <div>
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
        {label}
      </p>

      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-black italic ${color}`}>{value}</span>

        {unit && (
          <span className="text-[10px] font-bold text-slate-600 uppercase">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
