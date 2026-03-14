import React, { useState } from "react";
import { PlusCircle, Utensils, Calendar, Flame, Dna, Wheat, Droplet, ChevronRight } from "lucide-react";
import axios from "axios";
import { gooeyToast } from "goey-toast";
import { Navigate } from "react-router-dom";

const AddNutrition = ({loggedUser}) => {
  const [mealType, setMealType] = useState("Breakfast");
  const [entryDate, setEntryDate] = useState(""); // for the date
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");
  const [proteins, setProteins] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const userID = loggedUser._id;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:3000/api/add-nutrition", {
        mealType,
        date: entryDate,
        foodName,
        quantity,
        calories,
        proteins,
        carbs,
        fats,
        userID,
      })

   console.log(response.data.message);
gooeyToast("Nutrition added Successfully", {
fillColor: '05070a',
  borderColor: '#cfcfcf',
  borderWidth: 1,

});
      console.log(response.data.message);

      setMealType("");
      setFoodName("");
      setQuantity("");
      setCalories("");
      setProteins("");
      setCarbs("");
      setFats("");
      setEntryDate("");
      setTimeout(() => {
        Navigate("/dashboard/nutrition");
      }, 1500);
    }

    
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-[#020810] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans">
      <div className="w-full max-w-6xl bg-[#0B121E] rounded-[24px] border border-[#1A2637] p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">

        {/* Background Blue Circle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00A3FF] opacity-5 blur-[100px] pointer-events-none"></div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-[#1A2637] pb-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#00A3FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,163,255,0.2)]">
              <Utensils className="text-white w-7 h-7" />
            </div>
            <div>
              <h2 className="text-white text-2xl font-black tracking-tight italic uppercase leading-none">Nutrition Tracker</h2>
              <p className="text-[#4F6B8A] text-[10px] tracking-[0.2em] font-bold mt-2 uppercase">Log New Intake Protocol</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#4F6B8A] text-[10px] font-mono bg-[#0D1624] px-4 py-2 rounded-full border border-[#1A2637]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            SYSTEM ACTIVE // v3.0
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Meal Type & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[#8B9DB1] text-[11px] font-bold tracking-widest uppercase ml-1 flex items-center gap-2">
                <ChevronRight size={12} className="text-[#00A3FF]" /> Meal Type
              </label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full bg-[#151D29] border border-[#243042] rounded-xl p-4 text-white text-base focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none transition-all cursor-pointer appearance-none shadow-sm"
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snacks</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[#8B9DB1] text-[11px] font-bold tracking-widest uppercase ml-1 flex items-center gap-2">
                <Calendar size={12} className="text-[#00A3FF]" /> Entry Date
              </label>
              <input
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="w-full bg-[#151D29] border border-[#243042] rounded-xl p-4 text-white text-base focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Food Name & Quantity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-2">
              <label className="text-[#8B9DB1] text-[11px] font-bold tracking-widest uppercase ml-1">Food Name / Description</label>
              <input
                type="text"
                placeholder="Ex: Grilled Chicken with Avocado"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full bg-[#151D29] border border-[#243042] rounded-xl p-4 text-white text-base placeholder:text-gray-700 focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#8B9DB1] text-[11px] font-bold tracking-widest uppercase ml-1">Quantity</label>
              <input
                type="text"
                placeholder="e.g. 200g"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-[#151D29] border border-[#243042] rounded-xl p-4 text-white text-base placeholder:text-gray-700 focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none transition-all"
              />
            </div>
          </div>

          {/* Calories, Proteins, Carbs, Fats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
            <div className="bg-[#0D1624] border border-[#1E293B] p-5 sm:p-8 rounded-2xl flex flex-col items-center hover:bg-[#151D29] transition-all group">
              <Flame className="text-gray-500 mb-3 group-hover:text-white" size={20} />
              <label className="text-white text-[10px] font-black tracking-widest mb-2 uppercase opacity-60">Calories</label>
              <input
                type="number"
                placeholder="0"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="bg-transparent text-white text-2xl sm:text-3xl font-bold text-center w-full outline-none"
              />
            </div>

            <div className="bg-[#0D1624] border border-[#1E293B] p-5 sm:p-8 rounded-2xl flex flex-col items-center hover:border-[#00E5FF]/40 transition-all group">
              <Dna className="text-[#00E5FF] mb-3 opacity-50 group-hover:opacity-100" size={20} />
              <label className="text-[#00E5FF] text-[10px] font-black tracking-widest mb-2 uppercase">Proteins</label>
              <input
                type="number"
                placeholder="0g"
                value={proteins}
                onChange={(e) => setProteins(e.target.value)}
                className="bg-transparent text-white text-2xl sm:text-3xl font-bold text-center w-full outline-none"
              />
            </div>

            <div className="bg-[#0D1624] border border-[#1E293B] p-5 sm:p-8 rounded-2xl flex flex-col items-center hover:border-[#AA00FF]/40 transition-all group">
              <Wheat className="text-[#AA00FF] mb-3 opacity-50 group-hover:opacity-100" size={20} />
              <label className="text-[#AA00FF] text-[10px] font-black tracking-widest mb-2 uppercase">Carbs</label>
              <input
                type="number"
                placeholder="0g"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="bg-transparent text-white text-2xl sm:text-3xl font-bold text-center w-full outline-none"
              />
            </div>

            <div className="bg-[#0D1624] border border-[#1E293B] p-5 sm:p-8 rounded-2xl flex flex-col items-center hover:border-[#FFAA00]/40 transition-all group">
              <Droplet className="text-[#FFAA00] mb-3 opacity-50 group-hover:opacity-100" size={20} />
              <label className="text-[#FFAA00] text-[10px] font-black tracking-widest mb-2 uppercase">Fats</label>
              <input
                type="number"
                placeholder="0g"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                className="bg-transparent text-white text-2xl sm:text-3xl font-bold text-center w-full outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-xl text-sm sm:text-base tracking-[0.2em] transition-all transform hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,99,235,0.2)] mt-4 uppercase"
          >
            <PlusCircle size={20} />
            Add Nutrition Log
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddNutrition;