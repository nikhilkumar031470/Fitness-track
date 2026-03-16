import React, { useState } from "react";
import axios from "axios";
import {
  Dumbbell,
  Calendar,
  LayoutGrid,
  Tag,
  FileText,
  Zap,
  Repeat,
  BarChart3,
  PlusCircle,
  Loader2
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { gooeyToast } from "goey-toast";

const AddWorkout = ({loggedUser}) => {

  const [Category, setCategory] = useState("Chest");
  const [entryDate, setEntryDate] = useState("");
  const [ExerciseName, setExerciseName] = useState("");
  const [Tags, setTags] = useState("");
  const [Sets, setSets] = useState("");
  const [Reps, setReps] = useState("");
  const [Weight, setWeight] = useState("");
  const [Note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const userID = loggedUser._id;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/add-workout", {
        userID,
        Category,
        entryDate,
        ExerciseName,
        Tags,
        Sets,
        Reps,
        Weight,
        Note
      });

      console.log(response.data.message);

      gooeyToast("Progress added Successfully", {
fillColor: '05070a',
  borderColor: '#cfcfcf',
  borderWidth: 1,

});

      setCategory("Chest");
      setEntryDate("");
      setExerciseName("");
      setTags("");
      setSets("");
      setReps("");
      setWeight("");
      setNote("");
      setTimeout(() => {
              Navigate("/dashboard/workouts");
            }, 1500);

      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-[#0d1117] border border-[#30363d] rounded-[24px] p-10 shadow-2xl relative overflow-hidden">

        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600 opacity-5 blur-[80px] pointer-events-none" />

        <header className="flex justify-between items-center mb-10 pb-8 border-b border-[#30363d]">
          <div className="flex items-center gap-5">
            <div className="bg-[#1a5fff] p-3.5 rounded-xl shadow-[0_0_20px_rgba(26,95,255,0.3)]">
              <Dumbbell size={28} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase text-white leading-none">
                Workout Tracker
              </h1>
              <p className="text-gray-500 text-[10px] tracking-[0.2em] uppercase font-bold mt-2">
                Log New Training Protocol
              </p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-bold text-blue-500 uppercase tracking-widest ml-1">
                <LayoutGrid size={14} /> Category
              </label>

              <select
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#161b22] border border-[#30363d] rounded-xl p-4 text-gray-300 focus:outline-none focus:border-[#1a5fff] transition-all cursor-pointer appearance-none"
              >
                <option>Chest</option>
                <option>Back</option>
                <option>Legs</option>
                <option>Arms</option>
                <option>Shoulders</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-bold text-blue-500 uppercase tracking-widest ml-1">
                <Calendar size={14} /> Entry Date
              </label>

              <input
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                required
                className="w-full bg-[#161b22] border border-[#30363d] rounded-xl p-4 text-gray-300 focus:outline-none focus:border-[#1a5fff]"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="md:col-span-2 space-y-3">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                Exercise Name / Description
              </label>

              <input
                type="text"
                placeholder="Ex: Barbell Bench Press"
                value={ExerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                required
                className="w-full bg-[#161b22] border border-[#30363d] rounded-xl p-4 text-gray-300 focus:outline-none focus:border-[#1a5fff]"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                <Tag size={14} /> Tags
              </label>

              <input
                type="text"
                placeholder="Strength, HIIT"
                value={Tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-[#161b22] border border-[#30363d] rounded-xl p-4 text-gray-300 focus:outline-none focus:border-[#1a5fff]"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-[#161b22] border border-[#30363d] p-8 rounded-2xl flex flex-col items-center space-y-3">
              <Zap className="text-[#00f2ff]" size={24} />
              <span className="text-[11px] font-bold text-[#00f2ff] uppercase tracking-[0.2em]">Sets</span>
              <input
                type="number"
                placeholder="0"
                value={Sets}
                onChange={(e) => setSets(e.target.value)}
                className="bg-transparent text-4xl font-black italic text-center w-full outline-none text-white"
              />
            </div>

            <div className="bg-[#161b22] border border-[#30363d] p-8 rounded-2xl flex flex-col items-center space-y-3">
              <Repeat className="text-[#bc13fe]" size={24} />
              <span className="text-[11px] font-bold text-[#bc13fe] uppercase tracking-[0.2em]">Reps</span>
              <input
                type="number"
                placeholder="0"
                value={Reps}
                onChange={(e) => setReps(e.target.value)}
                className="bg-transparent text-4xl font-black italic text-center w-full outline-none text-white"
              />
            </div>

            <div className="bg-[#161b22] border border-[#30363d] p-8 rounded-2xl flex flex-col items-center space-y-3">
              <BarChart3 className="text-[#ff8c00]" size={24} />
              <span className="text-[11px] font-bold text-[#ff8c00] uppercase tracking-[0.2em]">
                Weight (kg)
              </span>
              <input
                type="number"
                placeholder="0"
                value={Weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-transparent text-4xl font-black italic text-center w-full outline-none text-white"
              />
            </div>

          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
              <FileText size={14} /> Internal Notes
            </label>

            <textarea
              placeholder="How did the set feel? Any pain points?"
              value={Note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-[#161b22] border border-[#30363d] rounded-xl p-4 text-gray-300 focus:outline-none focus:border-[#1a5fff] min-h-[120px] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a5fff] hover:bg-[#2e6bff] disabled:bg-blue-900 disabled:opacity-50 text-white font-black uppercase tracking-[0.25em] py-5 rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
            {loading ? "Transmitting Log..." : <Link to={"/dashboard/workouts"}>Add Workout Log</Link>}
            
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddWorkout;