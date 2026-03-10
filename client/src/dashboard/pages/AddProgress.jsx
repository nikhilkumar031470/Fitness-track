import React, { useState, useRef } from "react";
import { 
  Calendar, 
  Scale, 
  Ruler, 
  Activity, 
  Dumbbell, 
  PlusCircle, 
  ChevronRight,
  ClipboardCheck
} from "lucide-react";
import axios from "axios";

const AddProgress = () => {

  const dateInputRef = useRef(null);

  const [entryDate, setentryDate] = useState("03/05/2026");
  const [weight, setWeight] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [runtime, setRuntime] = useState("");
  const [liftweight, setLiftweight] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post("http://localhost:3000/api/add-progress", {
        date: entryDate,
        weight,
        chest,
        waist,
        runtime,
        liftweight,
      });

      console.log(response.data.message);

      setentryDate("");
      setWeight("");
      setChest("");
      setWaist("");
      setRuntime("");
      setLiftweight("");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020810] flex items-center justify-center p-6 text-white font-sans">

      <div className="w-full max-w-6xl bg-[#020810] rounded-2xl border border-gray-800/50 shadow-2xl p-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          
          <div className="flex items-center gap-5">
            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
              <ClipboardCheck className="w-9 h-9 text-[#00a3ff]" />
            </div>

            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                Progress Tracker
              </h2>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                Log New Performance Metrics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#161b22] px-4 py-2 rounded-full border border-gray-800">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Biometric Sync // Active
            </span>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Main Input Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">

            {/* Date */}
            <div className="space-y-3">

              <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                <Calendar size={12} className="text-[#00A3FF]" /> Entry
              </label>

              <div className="relative">

                <input
                  ref={dateInputRef}
                  type="date"
                  value={entryDate}
                  onChange={(e) => setentryDate(e.target.value)}
                  className="w-full bg-[#161b22] border border-gray-800 p-5 rounded-xl text-base focus:outline-none focus:border-[#00a3ff] transition-all"
                />

                <Calendar
                  onClick={() => dateInputRef.current.showPicker()}
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 cursor-pointer"
                />

              </div>

            </div>

            {/* Weight */}
            <div className="space-y-3">

              <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                <ChevronRight className="w-3.5 h-3.5 text-[#00a3ff]" /> Current Weight
              </label>

              <div className="relative">

                <input
                  type="text"
                  placeholder="e.g. 85.5kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-[#161b22] border border-gray-800 p-5 rounded-xl text-base focus:outline-none focus:border-[#00a3ff] transition-all"
                />

                <Scale className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

            {[
              { label: "Chest", icon: Ruler, value: chest, setter: setChest, unit: "cm", iconColor: "text-cyan-400" },
              { label: "Waist", icon: Ruler, value: waist, setter: setWaist, unit: "cm", iconColor: "text-emerald-400" },
              { label: "Run Time", icon: Activity, value: runtime, setter: setRuntime, unit: "min", iconColor: "text-rose-500" },
              { label: "Max Lift", icon: Dumbbell, value: liftweight, setter: setLiftweight, unit: "kg", iconColor: "text-amber-400" },
            ].map((metric) => (

              <div
                key={metric.label}
                className="bg-[#161b22]/40 border border-gray-800/80 p-10 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-[#1c232c]/50 transition-all"
              >

                <metric.icon className={`w-8 h-8 ${metric.iconColor} mb-5`} />

                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                  {metric.label}
                </span>

                <div className="flex items-baseline gap-1">

                  <input
                    type="number"
                    placeholder="0"
                    value={metric.value}
                    onChange={(e) => metric.setter(e.target.value)}
                    className="bg-transparent text-3xl font-black text-white w-20 text-center focus:outline-none"
                  />

                  <span className="text-xs font-black text-gray-600 italic uppercase">
                    {metric.unit}
                  </span>

                </div>

              </div>

            ))}

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#1d4ed8] hover:bg-blue-600 text-white font-black uppercase italic tracking-[0.2em] py-6 rounded-xl flex items-center justify-center gap-4 transition-all shadow-[0_10px_30px_rgba(29,78,216,0.3)] active:scale-[0.98]"
          >
            <PlusCircle className="w-6 h-6" />
            Add Progress Log
          </button>

        </form>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-900/50 flex justify-between items-center text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em]">
          <span>System Status: Nominal // Sync: 0.02ms</span>
          <span className="text-blue-900/40">Fitcore V3.0 // Neural Link Active</span>
        </div>

      </div>

    </div>
  );
};

export default AddProgress;