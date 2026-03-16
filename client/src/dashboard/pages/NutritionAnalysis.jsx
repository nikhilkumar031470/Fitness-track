import React, { useMemo, useState, useEffect } from "react";
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

import {
  Zap,
  ShieldCheck,
  Activity,
  Pill,
  Droplets,
  Wind,
  Info,
} from "lucide-react";

import { motion } from "framer-motion";

const THEME = {
  bg: "#01060D",
  card: "#0A0F16",
  accentBlue: "#0B80FB",
  accentTeal: "#0CBABA",
  textGray: "#71717A",
  grid: "rgba(11,128,251,0.03)",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#0A0F16]/90 border border-[#0B80FB]/30 shadow-lg p-4 rounded-xl">
      <p className="text-xs text-sky-400 mb-2">{label}</p>

      {payload.map((entry, i) => (
        <div key={i} className="flex justify-between text-xs">
          <span>{entry.name}</span>
          <span>
            {entry.value} {entry.name === "intake" ? "KCAL" : "G"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function NutritionAnalysis() {
  const [nutritionData, setNutritionData] = useState([]);

  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/fetch-nutrition",
        );

        const userMeals = res.data.nutritiondata.filter(
          (meal) => String(meal.userID) === String(loggedUser?._id),
        );

        setNutritionData(userMeals);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNutrition();
  }, [loggedUser?._id]);

  const NUTRITION_CHART_DATA = useMemo(() => {
    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const grouped = {};

    nutritionData.forEach((meal) => {
      const day = weekDays[new Date(meal.date).getDay()];

      if (!grouped[day]) grouped[day] = { intake: 0, protein: 0, carbs: 0 };

      grouped[day].intake += Number(meal.calories || 0);
      grouped[day].protein += Number(meal.protein || 0);
      grouped[day].carbs += Number(meal.carbs || 0);
    });

    return weekDays.map((day) => ({
      day,
      intake: grouped[day]?.intake || 0,
      protein: grouped[day]?.protein || 0,
      carbs: grouped[day]?.carbs || 0,
    }));
  }, [nutritionData]);

  const stats = useMemo(() => {
    const intakes = NUTRITION_CHART_DATA.map((d) => d.intake);

    return {
      peak: Math.max(...intakes, 0),
      avg: Math.round(
        intakes.reduce((a, b) => a + b, 0) / (intakes.length || 1),
      ),
    };
  }, [NUTRITION_CHART_DATA]);

  const coreMetrics = useMemo(() => {
    const totalProtein = nutritionData.reduce(
      (sum, meal) => sum + Number(meal.protein || 0),
      0,
    );

    const totalCarbs = nutritionData.reduce(
      (sum, meal) => sum + Number(meal.carbs || 0),
      0,
    );

    const totalCalories = nutritionData.reduce(
      (sum, meal) => sum + Number(meal.calories || 0),
      0,
    );

    const proteinDensity = totalCalories
      ? Math.round(((totalProtein * 4) / totalCalories) * 100)
      : 0;

    const carbEfficiency = totalCalories
      ? Math.round(((totalCarbs * 4) / totalCalories) * 100)
      : 0;

    const hydrationLevel = Math.min(100, Math.round(nutritionData.length * 10));

    const lipidBalance = 100 - carbEfficiency;

    const targetScore = Math.round(
      (proteinDensity + carbEfficiency + hydrationLevel + lipidBalance) / 4,
    );

    return {
      proteinDensity,
      carbEfficiency,
      hydrationLevel,
      lipidBalance,
      targetScore,
    };
  }, [nutritionData]);

  return (
    <div className="min-h-screen bg-[#01060D] text-white p-10 space-y-10">
      <div>
        <p className="text-xs text-teal-400 tracking-widest mb-2">
          BIO-FLOW SYNCED
        </p>

        <h1 className="text-6xl font-black">
          FUEL <span className="text-sky-400">LOGIC.</span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-gradient-to-br from-[#0B80FB] to-[#0866cc] rounded-[3rem] p-10">
          <div className="flex justify-between">
            <div className="bg-white text-black rounded-[2rem] p-8 text-center">
              <p className="text-xs uppercase mb-1">Target</p>
              <p className="text-5xl font-black">{coreMetrics.targetScore}%</p>
            </div>

            <div className="text-right">
              <h2 className="text-4xl font-black leading-tight">
                INGESTION
                <br />
                INTELLIGENCE
              </h2>

              <div className="inline-flex items-center gap-2 mt-4 bg-[#01060D]/30 px-4 py-2 rounded-xl text-xs">
                <Wind size={14} />
                Daily Protocol Active
              </div>
            </div>
          </div>

          <div className="h-64 mt-10">
            <ResponsiveContainer>
              <AreaChart data={NUTRITION_CHART_DATA}>
                <defs>
                  <linearGradient id="colorIntake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="white" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="white" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="day" hide />
                <YAxis hide />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="intake"
                  stroke="white"
                  strokeWidth={5}
                  fill="url(#colorIntake)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-[#0A0F16] rounded-[3rem] p-10">
          <div className="flex justify-between mb-8">
            <h3 className="text-xs uppercase text-gray-400">Core Metrics</h3>
            <Info size={14} />
          </div>

          <AttributeBar
            label="Protein Density"
            value={coreMetrics.proteinDensity}
            icon={<Pill size={14} />}
          />

          <AttributeBar
            label="Lipid Balance"
            value={coreMetrics.lipidBalance}
            icon={<ShieldCheck size={14} />}
          />

          <AttributeBar
            label="Hydration Level"
            value={coreMetrics.hydrationLevel}
            icon={<Droplets size={14} />}
          />

          <AttributeBar
            label="Carb Efficiency"
            value={coreMetrics.carbEfficiency}
            icon={<Zap size={14} />}
          />

          <button className="w-full mt-10 bg-white text-black py-3 rounded-xl text-xs font-bold">
            RESET BIOMETRICS
          </button>
        </div>

        <div className="lg:col-span-12 bg-[#0A0F16] rounded-[3rem] p-10">
          <div className="flex justify-between mb-8">
            <h2 className="text-xl font-bold">Macro Dynamic Stream</h2>

            <div className="flex gap-6">
              <StatBadge label="Peak Intake" value={`${stats.peak} KCAL`} />
              <StatBadge label="Avg Intake" value={`${stats.avg} KCAL`} />
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={NUTRITION_CHART_DATA}>
                <CartesianGrid strokeDasharray="10 10" vertical={false} />

                <XAxis dataKey="day" />

                <Tooltip content={<CustomTooltip />} />

                <Bar dataKey="protein" fill="#0B80FB" />
                <Bar dataKey="carbs" fill="#0CBABA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttributeBar({ label, value, icon }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs mb-2">
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>

        <span>{value}%</span>
      </div>

      <div className="w-full h-2 bg-gray-800 rounded-full">
        <div
          className="h-full bg-sky-400 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StatBadge({ label, value }) {
  return (
    <div className="text-right">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}
