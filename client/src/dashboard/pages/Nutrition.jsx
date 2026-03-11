import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Apple, Coffee, Utensils, Plus, Droplets, Zap, Waves, PieChart, Search, ArrowBigDownDash } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function Nutrition() {

  const [nutritionData, setNutritionData] = useState([])
  const [waterAmount, setWaterAmount] = useState(2.4)
  const [searchMeal, setSearchMeal] = useState("")
  const waterGoal = 3.0

  // FETCH NUTRITION
  const fetchNutrition = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/fetch-nutrition")
      setNutritionData(response.data.nutritiondata || [])
    }
    catch (err) {
      console.log("Error Fetching Nutrition", err)
      setNutritionData([])
    }
  }

  let filteredMeals = nutritionData;

  if (searchMeal !== "") {
    filteredMeals = nutritionData.filter((meal) =>
      meal.mealType.toLowerCase().includes(searchMeal.toLowerCase())
    );
  }

  useEffect(() => {
    fetchNutrition()
  }, [])

  // TOTAL CALCULATIONS
  const totalCalories = nutritionData.reduce(
    (sum, item) => sum + (Number(item.calories) || 0),
    0
  )

  const totalProtein = nutritionData.reduce(
    (sum, item) => sum + (Number(item.proteins) || 0),
    0
  )

  const totalCarbs = nutritionData.reduce(
    (sum, item) => sum + (Number(item.carbs) || 0),
    0
  )

  const totalFat = nutritionData.reduce(
    (sum, item) => sum + (Number(item.fats) || 0),
    0
  )

  const addWater = () => {
    if (waterAmount < waterGoal) {
      setWaterAmount(prev => Math.min(prev + 0.25, waterGoal))
    }
  }

  const getIcon = (type) => {
    if (type === "Breakfast") return <Coffee />
    if (type === "Lunch") return <Utensils />
    if (type === "Snack") return <Zap />
    return <Apple />
  }

  const getColor = (type) => {
    if (type === "Breakfast") return { color: "text-sky-400", bg: "bg-sky-400/10" }
    if (type === "Lunch") return { color: "text-indigo-400", bg: "bg-indigo-400/10" }
    if (type === "Snack") return { color: "text-emerald-400", bg: "bg-emerald-400/10" }
    return { color: "text-sky-400", bg: "bg-sky-400/10" }
  }

  // ==========================
  // DOWNLOAD LOGIC
  // ==========================

  const handleDownload = () => {

    const format = prompt("Enter format: PDF or CSV")

    if (!format) return

    if (format.toLowerCase() === "csv") {
      downloadCSV()
    }

    if (format.toLowerCase() === "pdf") {
      downloadPDF()
    }

  }

  // CSV DOWNLOAD
  const downloadCSV = () => {

    const headers = [
      "Meal Type",
      "Food Name",
      "Protein (g)",
      "Carbs (g)",
      "Fats (g)",
      "Calories"
    ]

    const rows = nutritionData.map(item => [
      item.mealType,
      item.foodName,
      item.proteins,
      item.carbs,
      item.fats,
      item.calories
    ])

    rows.push([])
    rows.push(["TOTAL", "", totalProtein, totalCarbs, totalFat, totalCalories])

    const csvContent =
      [headers, ...rows]
        .map(e => e.join(","))
        .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })

    const url = window.URL.createObjectURL(blob)

    const link = document.createElement("a")

    link.href = url
    link.download = "Nutrition.csv"

    link.click()
  }

  // PDF DOWNLOAD
  const downloadPDF = () => {

    const doc = new jsPDF()

    const tableColumn = [
      "Meal Type",
      "Food Name",
      "Protein (g)",
      "Carbs (g)",
      "Fats (g)",
      "Calories"
    ]

    const tableRows = []

    nutritionData.forEach(item => {

      const row = [
        item.mealType,
        item.foodName,
        item.proteins,
        item.carbs,
        item.fats,
        item.calories
      ]

      tableRows.push(row)

    })

    tableRows.push([
      "TOTAL",
      "",
      totalProtein,
      totalCarbs,
      totalFat,
      totalCalories
    ])

    doc.text("Nutrition Report", 14, 15)

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    })

    doc.save("Nutrition.pdf")

  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10 selection:bg-sky-500/30 font-sans"
    >

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-sky-500 p-2.5 rounded-2xl shadow-xl shadow-sky-500/20">
              <Apple size={28} className="text-slate-950" />
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
              Body Fuel
            </h2>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.25em] opacity-80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Bio-Metric Macro Architecture Engaged
          </p>
        </div>

        <div className="flex items-center gap-4">

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center justify-center gap-3 bg-white text-slate-950 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl"
          >
            <Plus size={18} strokeWidth={4} />
            <Link to="/dashboard/add-nutrition">Add Nutrition</Link>
          </motion.button>

          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center justify-center bg-white text-slate-950 px-10 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl"
          >
            <ArrowBigDownDash />
          </motion.button>

        </div>
      </header>

      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

        {/* Left Column: Progress & Hydration */}
        <div className="xl:col-span-1 space-y-8">

          {/* Calorie Ring Card */}
          <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 text-center">
              <div className="relative inline-flex items-center justify-center mb-8">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle cx="96" cy="96" r="82" stroke="currentColor" strokeWidth="14" fill="transparent" className="text-slate-800" />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="82"
                    stroke="currentColor"
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray={515}
                    initial={{ strokeDashoffset: 515 }}
                    animate={{ strokeDashoffset: 515 - (515 * 0.57) }}
                    transition={{ duration: 2 }}
                    strokeLinecap="round"
                    className="text-sky-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-4xl font-black text-white italic">
  {totalCalories}
</h3>
                  <span className="text-[9px] font-black text-slate-500 uppercase">
                    kcal remaining
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50">
                  <p className="text-[9px] font-black text-slate-500 uppercase">
                    Fuel In
                  </p>
                  <p className="text-xl font-black text-sky-400 italic">
                    1,240
                  </p>
                </div>

                <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50">
                  <p className="text-[9px] font-black text-slate-500 uppercase">
                    Burn Out
                  </p>
                  <p className="text-xl font-black text-rose-500 italic">
                    420
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Hydration Card */}
          <div className="p-8 bg-sky-500 rounded-[3rem] text-slate-950 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <div className="p-3 bg-slate-950/10 rounded-2xl">
                <Waves size={24} />
              </div>
              <span className="text-[10px] font-black uppercase bg-slate-950 text-sky-500 px-4 py-2 rounded-xl">
                {Math.round((waterAmount / waterGoal) * 100)}%
              </span>
            </div>

            <h3 className="text-5xl font-black mb-1 italic">
              {waterAmount.toFixed(1)} <span className="text-xl opacity-40">LTR</span>
            </h3>

            <button
              onClick={addWater}
              className="w-full py-5 bg-slate-950 text-sky-500 rounded-[2rem] font-black text-xs uppercase"
            >
              Add 250ML
            </button>
          </div>

        </div>

        {/* Right Column */}
        <div className="xl:col-span-3 space-y-8">

          {/* Macros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <MacroCard
  label="Protein"
  current={totalProtein}
  goal={150}
  unit="g"
  color="from-sky-400 to-sky-600"
  icon={<Zap size={14} />}
/>

<MacroCard
  label="Carbs"
  current={totalCarbs}
  goal={220}
  unit="g"
  color="from-indigo-400 to-indigo-600"
  icon={<PieChart size={14} />}
/>

<MacroCard
  label="Fats"
  current={totalFat}
  goal={70}
  unit="g"
  color="from-slate-400 to-slate-600"
  icon={<Droplets size={14} />}
/>
          </div>
{/* Fuel Chronology */}
<div className="bg-slate-900/50 backdrop-blur-xl rounded-[3rem] border border-slate-800 p-10 shadow-2xl">

  {/* Title + Search Row */}
  <div className="flex items-center justify-between mb-8">

    <h3 className="text-2xl font-black text-white italic uppercase">
      Fuel Chronology
    </h3>

    {/* Search */}
    <div className="relative hidden md:block group">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors"
        size={18}
      />

      <input
  type="text"
  placeholder="Search analytics, workouts, or meals..."
  value={searchMeal}
  onChange={(e) => setSearchMeal(e.target.value)}
  className="w-80 lg:w-70 rounded-2xl bg-white/5 border border-transparent focus:border-sky-500/30 focus:bg-white/10 px-11 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none transition-all duration-300"
/>
    </div>

  </div>
            <div className="space-y-4">

              <AnimatePresence>

                {(filteredMeals || []).map((meal, i) => {
                  const style = getColor(meal.mealType)
                  return (
                    <motion.div
                      key={meal._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-6 rounded-[2.5rem] border hover:border-slate-800"
                    >
                      <div className="flex items-center gap-6">

                        <div className={`w-16 h-16 flex items-center justify-center rounded-2xl ${style.bg} ${style.color}`}>
                          {getIcon(meal.mealType)}
                        </div>

                        <div>
                          <span className={`text-[10px] font-black uppercase ${style.color}`}>
                            {meal.mealType}
                          </span>

                          <h4 className="font-black text-white text-xl italic uppercase">
                            {meal.foodName}
                          </h4>

                          <div className="flex gap-4 mt-2">
                            <span className="text-[9px] text-slate-500 bg-slate-800 px-3 py-1 rounded-lg">
                              P: {meal.proteins}g
                            </span>
                            <span className="text-[9px] text-slate-500 bg-slate-800 px-3 py-1 rounded-lg">
                              C: {meal.carbs}g
                            </span>
                          </div>
                        </div>

                      </div>

                      <div className="text-right">
                        <span className="block font-black text-white text-3xl">
                          {meal.calories}
                        </span>
                        <span className="text-[9px] text-slate-500 uppercase">
                          Calories
                        </span>
                      </div>

                    </motion.div>
                  )
                })}

              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>

    </motion.div>

  )
}

function MacroCard({ label, current, goal, color, icon, unit }) {

  const percentage = Math.min((current / goal) * 100, 100)
  const remaining = goal - current

  return (
    <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem]">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-[11px] text-slate-500 uppercase">
            {label}
          </span>
        </div>
        <span className="text-[10px] text-sky-400">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="text-4xl font-black text-white">
        {current}{unit}
        <span className="text-xs text-slate-600"> / {goal}{unit}</span>
      </div>

      <div className="h-3 bg-slate-800 rounded-full mt-4">
        <div
          className={`h-full bg-gradient-to-r ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="text-[10px] text-slate-500 mt-4">
        {remaining > 0 ? `${remaining}${unit} left to target` : "Goal achieved"}
      </div>
    </div>
  )
}