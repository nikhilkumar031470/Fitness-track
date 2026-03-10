import React, { useState } from "react";
import { 
  Bell, 
  Calendar, 
  Clock, 
  ChevronRight, 
  PlusCircle, 
  StickyNote,
  Zap,
  Tag
} from "lucide-react";
import axios from "axios"; // Added axios

const Reminders = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Reminder");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("Workout");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reminderData = { title, type, date, time, category, notes };
    
    try {
      const response = await axios.post("http://localhost:3000/api/add-reminder", reminderData);
      console.log("Server Response:", response.data.message);

      // Reset all form fields
      setTitle("");
      setType("Reminder");
      setDate("");
      setTime("");
      setCategory("Workout");
      setNotes("");
    } catch (err) {
      console.error("Error adding reminder:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-5xl bg-[#0b0f14] rounded-2xl border border-gray-800/50 shadow-2xl p-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
              <Bell className="w-9 h-9 text-[#00a3ff]" />
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Reminders & Alerts</h2>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em]">Log New Notification Protocol</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#161b22] px-4 py-2 rounded-full border border-gray-800">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">System Sync // Active</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Row 1: Title and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                <ChevronRight className="w-3.5 h-3.5 text-[#00a3ff]" /> Protocol Title
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ex. Morning Cardio Session..."
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#161b22] border border-gray-800 p-5 rounded-xl text-base focus:outline-none focus:border-[#00a3ff] transition-all placeholder:text-gray-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                <ChevronRight className="w-3.5 h-3.5 text-[#00a3ff]" /> Alert Level
              </label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-[#161b22] border border-gray-800 p-5 rounded-xl text-base focus:outline-none focus:border-[#00a3ff] appearance-none cursor-pointer"
                >
                  <option className="bg-[#0b0f14]">Reminder</option>
                  <option className="bg-[#0b0f14]">Critical Alert</option>
                </select>
                <Zap className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Date, Time, Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            <div className="bg-[#161b22]/40 border border-gray-800/80 p-10 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:bg-[#1c232c]/50">
              <Calendar className="w-8 h-8 text-[#00a3ff] mb-5" />
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Target Date</span>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent text-xl font-black text-white text-center focus:outline-none w-full cursor-pointer" 
              />
            </div>

            <div className="bg-[#161b22]/40 border border-gray-800/80 p-10 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:bg-[#1c232c]/50">
              <Clock className="w-8 h-8 text-indigo-400 mb-5" />
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Target Time</span>
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-transparent text-xl font-black text-white text-center focus:outline-none w-full cursor-pointer" 
              />
            </div>

            <div className="bg-[#161b22]/40 border border-gray-800/80 p-10 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:bg-[#1c232c]/50">
              <Tag className="w-8 h-8 text-emerald-400 mb-5" />
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-xl font-black text-center focus:outline-none w-full cursor-pointer"
              >
                <option className="bg-[#0b0f14]">Workout</option>
                <option className="bg-[#0b0f14]">Nutrition</option>
                <option className="bg-[#0b0f14]">Meds</option>
              </select>
            </div>

          </div>

          {/* Notes Area */}
          <div className="mb-12 space-y-3">
             <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                <StickyNote className="w-3.5 h-3.5 text-amber-400" /> Strategy Notes
              </label>
              <textarea
                placeholder="Ex. Prepare pre-workout 30 minutes before cardio..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#161b22] border border-gray-800 p-5 rounded-xl text-base focus:outline-none focus:border-[#00a3ff] h-32 resize-none transition-all placeholder:text-gray-700 shadow-inner"
              />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1d4ed8] hover:bg-blue-600 text-white font-black uppercase italic tracking-[0.2em] py-6 rounded-xl flex items-center justify-center gap-4 transition-all shadow-[0_10px_30px_rgba(29,78,216,0.3)] active:scale-[0.98]"
          >
            <PlusCircle className="w-6 h-6" />
            Initialize Reminder Protocol
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-900/50 flex justify-between items-center text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em]">
          <span>System Status: Nominal // V3.0</span>
          <span className="text-blue-900/40">Fitcore V3.0 // Neural Link Active</span>
        </div>
      </div>
    </div>
  );
};

export default Reminders;