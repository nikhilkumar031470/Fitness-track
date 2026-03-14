import React, { useState, useRef } from "react";
import { gooeyToast, GooeyToaster } from "goey-toast";
import { 
  Target, 
  Calendar, 
  TrendingUp, 
  ChevronRight, 
  PlusCircle, 
  StickyNote,
  Flag,
  Activity
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddGoals = ({ loggedUser }) => {

  const navigate = useNavigate();
  const dateInputRef = useRef(null);

  const [goalType, setGoalType] = useState("Weight Loss");
  const [deadline, setDeadline] = useState("");
  const [targetweight, setTargetweight] = useState("");
  const [currentweight, setCurrentweight] = useState("");
  const [notes, setNotes] = useState("");

  const userID = loggedUser._id;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post("http://localhost:3000/api/add-goals", {
        userID,
        goalType,
        deadline,
        targetweight,
        currentweight,
        notes
      });
      console.log(response.data.message);
gooeyToast("Goal added Successfully", {
fillColor: '05070a',
  borderColor: '#cfcfcf',
  borderWidth: 1,

});
      setGoalType("Weight Loss");
      setDeadline("");
      setTargetweight("");
      setCurrentweight("");
      setNotes("");

      setTimeout(() => {
        navigate("/dashboard/goals");
      }, 1500);

    } catch (err) {
      console.log(`Something went wrong!`);
      console.log(err);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 text-white font-sans">

      <div className="w-full max-w-5xl bg-[#0b0f14] rounded-2xl border border-gray-800/50 shadow-2xl p-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          
          <div className="flex items-center gap-5">
            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
              <Target className="w-9 h-9 text-[#00a3ff]" />
            </div>

            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                Fitness Goals
              </h2>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                Set and Track Your Objectives
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#161b22] px-4 py-2 rounded-full border border-gray-800">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Objective Sync // Active
            </span>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Goal Type + Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">

            {/* Goal Type */}
            <div className="space-y-3">

              <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                <ChevronRight className="w-3.5 h-3.5 text-[#00a3ff]" /> Goal Type
              </label>

              <div className="relative">

                <select
                  value={goalType}
                  onChange={(e) => setGoalType(e.target.value)}
                  className="w-full bg-[#161b22] border border-gray-800 p-5 rounded-xl text-base focus:outline-none focus:border-[#00a3ff]"
                >
                  <option>Weight Loss</option>
                  <option>Weight Gain</option>
                  <option>Muscle Gain</option>
                  <option>Strength</option>
                  <option>Endurance</option>
                </select>

                <Flag className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 pointer-events-none" />

              </div>

            </div>

            {/* Deadline */}
            <div className="space-y-3">

              <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                <ChevronRight className="w-3.5 h-3.5 text-[#00a3ff]" /> Target Deadline
              </label>

              <div className="relative">

                <input
                  ref={dateInputRef}
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-[#161b22] border border-gray-800 p-5 rounded-xl text-base focus:outline-none focus:border-[#00a3ff]"
                />

                <Calendar
                  onClick={() => dateInputRef.current.showPicker()}
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 cursor-pointer"
                />

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

            <div className="bg-[#161b22]/40 border border-gray-800/80 p-10 rounded-2xl flex flex-col items-center text-center">
              <TrendingUp className="w-8 h-8 text-emerald-400 mb-5" />

              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                Current Weight
              </span>

              <div className="flex items-baseline gap-1">

                <input
                  type="number"
                  value={currentweight}
                  onChange={(e) => setCurrentweight(e.target.value)}
                  className="bg-transparent text-4xl font-black text-white w-24 text-center focus:outline-none"
                />

                <span className="text-xs font-black text-gray-600 italic uppercase">
                  kg
                </span>

              </div>

            </div>

            <div className="bg-[#161b22]/40 border border-gray-800/80 p-10 rounded-2xl flex flex-col items-center text-center">
              
              <Activity className="w-8 h-8 text-[#00a3ff] mb-5" />

              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                Target Weight Goal
              </span>

              <div className="flex items-baseline gap-1">

                <input
                  type="number"
                  value={targetweight}
                  onChange={(e) => setTargetweight(e.target.value)}
                  className="bg-transparent text-4xl font-black text-white w-24 text-center focus:outline-none"
                />

                <span className="text-xs font-black text-gray-600 italic uppercase">
                  kg
                </span>

              </div>

            </div>

          </div>

          {/* Notes */}
          <div className="mb-12 space-y-3">

            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              <StickyNote className="w-3.5 h-3.5 text-amber-400" /> Strategy Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex. 500 calorie deficit with 3 days of heavy lifting..."
              className="w-full bg-[#161b22] border border-gray-800 p-5 rounded-xl text-base focus:outline-none focus:border-[#00a3ff] h-32 resize-none"
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#1d4ed8] hover:bg-blue-600 text-white font-black uppercase italic tracking-[0.2em] py-6 rounded-xl flex items-center justify-center gap-4 transition-all shadow-[0_10px_30px_rgba(29,78,216,0.3)] active:scale-[0.98]"
          >
            <PlusCircle className="w-6 h-6" />
            Initialize Goal Protocol
          </button>

        </form>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-900/50 flex justify-between text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em]">
          <span>Track Status: Calibrating // V2.0</span>
          <span className="text-blue-900/40">Fitcore V3.0 // Neural Link Active</span>
        </div>

      </div>

    </div>
    </>
  );
};

export default AddGoals;