import React, { useState, useEffect } from 'react';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Plus, MoreHorizontal, Zap, Check } from 'lucide-react';
import { Link } from "react-router-dom";

// ReminderCard Component
const ReminderCard = ({ reminder }) => {
  const isCompleted = reminder.completed;

  const theme = isCompleted
    ? { text: 'text-emerald-500', bg: 'bg-emerald-500', light: 'bg-emerald-500/10', shadow: 'shadow-emerald-500/20', glow: 'group-hover:shadow-emerald-500/10' }
    : { text: 'text-blue-600', bg: 'bg-blue-600', light: 'bg-blue-600/10', shadow: 'shadow-blue-600/20', glow: 'group-hover:shadow-blue-500/10' };

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
          <div className={`p-3 rounded-xl transition-all duration-500 ${theme.light} ${theme.text} group-hover:scale-110 group-hover:rotate-3`}>
            <Zap size={20} />
          </div>

          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">
              {reminder.category}
            </p>

            <div className="flex items-center gap-1.5">
              <div className={`h-1 w-1 rounded-full animate-pulse ${theme.bg}`} />
              <p className="text-[9px] font-bold text-blue-500/60 uppercase tracking-tighter">
                Alert: {reminder.alertLevel}
              </p>
            </div>
          </div>
        </div>

        <button className="text-gray-300 hover:text-blue-600 dark:hover:text-white transition-all hover:rotate-90">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <h3 className="text-lg font-black dark:text-white uppercase italic tracking-tight mb-2 group-hover:text-blue-600 transition-colors relative z-10">
        {reminder.title}
      </h3>

      {/* Date & Time */}
      <div className="flex items-center gap-4 mb-2 relative z-10 text-[10px] font-black uppercase tracking-tighter">
        <div className="flex items-center gap-1 text-gray-500 bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded-md">
          <Clock size={12} className={theme.text} /> {reminder.targetDate}
        </div>

        <div className="flex items-center gap-1 text-gray-500 bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded-md">
          <Clock size={12} className={theme.text} /> {reminder.targetTime}
        </div>
      </div>

      {/* Notes */}
      {reminder.notes && (
        <p className="text-xs text-gray-400 mt-2 mb-3 border-t border-gray-200 dark:border-white/10 pt-2">
          {reminder.notes}
        </p>
      )}

      {/* Progress */}
      <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden relative z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${reminder.progress}%` }}
          transition={{ duration: 1.5 }}
          className={`h-full ${theme.bg}`}
        />
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

// Main Page
export default function RemindersPage() {

  const [reminders, setReminders] = useState([]);
  const [filter, setFilter] = useState('all');

  // FETCH REMINDERS (same structure as workouts)
  const fetchReminders = async () => {
    try {

      const response = await axios.get("http://localhost:3000/api/fetch-reminder");

      console.log(response.data.reminderdata);

      setReminders(response.data.reminderdata);

    } catch (err) {

      console.log("Error Fetching Reminders", err);

    }
  };

  useEffect(() => {

    fetchReminders();

  }, []);

  const filteredReminders = reminders.filter(r => {
    if (filter === 'active') return !r.completed;
    if (filter === 'done') return r.completed;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 selection:bg-blue-600 selection:text-white">

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-6xl font-black italic tracking-tighter dark:text-white uppercase leading-none">
            REMINDERS <span className="text-blue-600">& ALERTS</span>
          </h1>
        </motion.div>

        <div className="flex flex-wrap items-center gap-4">

          <div className="flex bg-gray-100 dark:bg-white/5 p-1.5 rounded-[1.5rem] border border-gray-200 dark:border-white/5">

            {['all', 'active', 'done'].map(t => (

              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                  filter === t
                    ? 'bg-white dark:bg-blue-600 shadow-xl text-blue-600 dark:text-white'
                    : 'text-gray-500'
                }`}
              >
                {t}
              </button>

            ))}

          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest"
          >
            <Plus size={18} strokeWidth={3} />
            <Link to={"/dashboard/add-reminders"}>NEW REMINDER</Link>
          </motion.button>

        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">

        <AnimatePresence mode="popLayout">

          {filteredReminders.map((reminder) => (

            <ReminderCard key={reminder._id} reminder={reminder} />

          ))}

        </AnimatePresence>

      </div>

    </div>
  );
}