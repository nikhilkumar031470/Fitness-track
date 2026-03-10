import React, { useState, useEffect } from 'react';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Clock, Plus, MoreHorizontal, Check } from 'lucide-react';
import { Link } from "react-router-dom";

const GoalCard = ({ goal }) => {

  const isCompleted = goal.progress === 100;

  const theme = isCompleted
    ? {
        text: 'text-emerald-500',
        bg: 'bg-emerald-500',
        light: 'bg-emerald-500/10',
        shadow: 'shadow-emerald-500/20',
        glow: 'group-hover:shadow-emerald-500/10'
      }
    : {
        text: 'text-blue-600',
        bg: 'bg-blue-600',
        light: 'bg-blue-600/10',
        shadow: 'shadow-blue-600/20',
        glow: 'group-hover:shadow-blue-500/10'
      };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className={`relative p-6 bg-white dark:bg-[#0A0C12] border border-gray-100 dark:border-white/5 rounded-[2rem] shadow-sm hover:shadow-2xl ${theme.glow} transition-all duration-500 group overflow-hidden`}
    >

      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 ${theme.bg}`} />

      <div className="flex justify-between items-start mb-5 relative z-10">

        <div className="flex items-center gap-3">

          <div className={`p-3 rounded-xl ${theme.light} ${theme.text}`}>
            <Target size={20} />
          </div>

          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">
              {goal.category}
            </p>

            <div className="flex items-center gap-1.5">
              <div className={`h-1 w-1 rounded-full animate-pulse ${theme.bg}`} />
              <p className="text-[9px] font-bold text-blue-500/60 uppercase tracking-tighter">
                Unit: {goal.id}
              </p>
            </div>

          </div>

        </div>

        <button className="text-gray-300 hover:text-blue-600 transition-all hover:rotate-90">
          <MoreHorizontal size={18} />
        </button>

      </div>

      <h3 className="text-lg font-black dark:text-white uppercase italic tracking-tight mb-5 group-hover:text-blue-600 transition-colors relative z-10">
        {goal.title}
      </h3>

{/* Notes */}
        {goal.notes && (
          <p className="text-xs text-gray-400 border-l-2 border-blue-500 pl-3 pb-2">
            {goal.notes}
          </p>
        )}
        
      <div className="space-y-3 relative z-10 pt-1">

        {/* Deadline + Progress */}
        <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-tighter">

          <div className="flex items-center gap-2 text-gray-500 bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded-md">
            <Clock size={12} className={theme.text} />
            {goal.deadline}
          </div>

          <span className={`${theme.text} text-xs italic tracking-widest`}>
            {goal.progress}%
          </span>

        </div>

        

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${goal.progress}%` }}
            transition={{ duration: 1.5 }}
            className={`h-full ${theme.bg}`}
          />

        </div>

        {/* Current & Target Weight */}
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Current: {goal.currentweight} kg</span>
          <span>Target: {goal.targetweight} kg</span>
        </div>

      </div>

      {isCompleted && (
        <div className="absolute top-4 right-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`bg-emerald-500 text-white p-1 rounded-full shadow-lg ${theme.shadow}`}
          >
            <Check size={10} strokeWidth={4} />
          </motion.div>
        </div>
      )}

    </motion.div>
  );
};

export default function Goals() {

  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchGoals = async () => {

    try {

      const response = await axios.get("http://localhost:3000/api/fetch-goals");

      const formattedGoals = response.data.goalsdata.map((g) => {

        let progress = 0;

        if (g.targetweight && g.currentweight) {
          progress = Math.round((g.currentweight / g.targetweight) * 100);
        }

        return {
          _id: g._id,
          id: g.goalType,
          title: g.goalType,
          category: g.goalType,
          progress: progress,
          deadline: new Date(g.deadline).toLocaleDateString(),
          targetweight: g.targetweight,
          currentweight: g.currentweight,
          notes: g.notes
        };

      });

      setGoals(formattedGoals);

    } catch (err) {
      console.log("Error Fetching Goals", err);
    }

  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const filteredGoals = goals.filter((g) => {
    if (filter === "active") return g.progress < 100;
    if (filter === "done") return g.progress === 100;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 selection:bg-blue-600 selection:text-white">

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">

        <div>
          <h1 className="text-6xl font-black italic tracking-tighter dark:text-white uppercase leading-none">
            TOTAL <span className="text-blue-600">COMMAND</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4">

          <div className="flex bg-gray-100 dark:bg-white/5 p-1.5 rounded-[1.5rem]">

            {["all", "active", "done"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase ${
                  filter === t
                    ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white"
                    : "text-gray-500"
                }`}
              >
                {t}
              </button>
            ))}

          </div>

          <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black uppercase text-[10px]">

            <Plus size={18} />

            <Link to="/dashboard/add-goals">
              NEW GOALS
            </Link>

          </button>

        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <AnimatePresence>

          {filteredGoals.map((goal) => (
            <GoalCard key={goal._id} goal={goal} />
          ))}

        </AnimatePresence>

      </div>

    </div>
  );
}