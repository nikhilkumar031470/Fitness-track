import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clock, Flame, Search, Plus, Trash2, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Workouts() {

  const [workoutsData, setWorkoutsData] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  // ⭐ search state
  const [searchWorkout, setSearchWorkout] = useState("");

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/fetch-workouts");
      console.log(response.data.workoutdata);
      setWorkoutsData(response.data.workoutdata);
    }
    catch (err) {
      console.log("Error Fetching Users", err);
    }
  };

  const fetchNutritionCalories = async () => {
    try {

      const res = await axios.get("http://localhost:3000/api/fetch-nutrition");

      const data = res.data.nutritiondata || [];

      const total = data.reduce(
        (sum, item) => sum + (Number(item.calories) || 0),
        0
      );

      setTotalCalories(total);

    } catch (err) {
      console.log("Error fetching nutrition calories", err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
    fetchNutritionCalories();
  }, []);

  // convert calories → 2.4k format
  const caloriesK = (totalCalories / 1000).toFixed(1) + "k";


  // ⭐ simple human search logic
  let filteredWorkouts = workoutsData;

  if (searchWorkout !== "") {
    filteredWorkouts = workoutsData.filter((item) =>
      item.ExerciseName.toLowerCase().includes(searchWorkout.toLowerCase())
    );
  }


  return (
    <div className="min-h-screen bg-[#020617] p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {[
            { label: "Workouts", val: workoutsData.length, icon: <Trophy className="text-yellow-500" />, bg: "bg-[#161b22]" },

            { label: "Calories", val: caloriesK, icon: <Flame className="text-orange-500" />, bg: "bg-[#161b22]" },

            { label: "Avg Time", val: "28m", icon: <Clock className="text-blue-500" />, bg: "bg-[#161b22]" },

            { label: "Streak", val: "12d", icon: <Zap className="text-purple-500" />, bg: "bg-[#161b22]" },

          ].map((s, i) => (
            <div key={i} className={`${s.bg} p-4 rounded-3xl flex items-center gap-4 shadow-sm`}>

              <div className="p-3 bg-white rounded-2xl shadow-sm">
                {s.icon}
              </div>

              <div className="font-black uppercase tracking-tighter leading-tight">
                <p className="text-[10px] text-slate-400">{s.label}</p>
                <p className="text-xl italic">{s.val}</p>
              </div>

            </div>
          ))}

        </div>

        {/* Search */}
        <div className="relative hidden md:block group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search analytics, workouts, or meals..."
            value={searchWorkout}
            onChange={(e) => setSearchWorkout(e.target.value)}
            className="w-80 lg:w-70 rounded-2xl bg-white/5 border border-transparent focus:border-sky-500/30 focus:bg-white/10 px-11 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none transition-all duration-300"
          />
        </div>

        {/* Add Workout Button */}
        <div className="flex justify-end">
          <Link to="/dashboard/add-workout">
            <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest">
              <Plus size={18} /> Add workout
            </button>
          </Link>
        </div>

        {/* Workout Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredWorkouts.map((w) => (

            <div
              key={w._id}
              className="group rounded-[3rem] overflow-hidden border border-slate-900 flex flex-col hover:shadow-2xl transition-all duration-500"
            >

              {/* Image */}
              <div className="relative h-60 m-2 rounded-[2.5rem] overflow-hidden">

                <img
                  src={
                    w.Category === "Chest"
                      ? "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800"
                      : w.Category === "Back"
                        ? "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800"
                        : w.Category === "Legs"
                          ? "https://images.unsplash.com/photo-1541600383005-565c949cf777?w=800"
                          : w.Category === "Arms"
                            ? "https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?w=800"
                            : w.Category === "Shoulders"
                              ? "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800"
                              : "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800"
                  }
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt=""
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black uppercase text-white tracking-widest">
                  {w.Category}
                </div>

                <button className="absolute top-5 right-5 p-3 bg-red-500/10 hover:bg-red-500 text-white rounded-2xl">
                  <Trash2 size={16} />
                </button>

                <div className="absolute bottom-5 left-6 text-white uppercase italic leading-none">
                  <p className="text-blue-400 font-black text-[10px] tracking-widest not-italic mb-1">
                    {w.Tages}
                  </p>
                  <h3 className="text-3xl font-black tracking-tighter">
                    {w.ExerciseName}
                  </h3>
                </div>

              </div>

              <div className="p-8 pt-4 space-y-6">

                <div className="flex gap-6 text-slate-500 font-black text-[11px] uppercase tracking-tighter border-b border-slate-50 pb-4">

                  <span className="flex items-center gap-2">
                    <Clock size={18} className="text-blue-500" />
                    Sets: {w.Sets}
                  </span>

                  <span className="flex items-center gap-2">
                    <Flame size={18} className="text-orange-500" />
                    Reps: {w.Reps}
                  </span>

                </div>

                <div className="text-sm text-gray-400">
                  Weight: {w.Weight} kg
                </div>

                <p className="text-slate-400 text-xs">
                  {w.Note}
                </p>

                <div className="text-xs text-gray-500">
                  {new Date(w.date).toLocaleDateString()}
                </div>

                <button className="w-full py-5 bg-slate-900 text-white rounded-[1.8rem] font-black uppercase text-[11px] tracking-widest hover:bg-blue-600 transition-all">
                  Start Workout
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}