import React from 'react'
import Sidebar from './components/Sidebar'
import TopNavbar from './components/TopNavbar'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const DashboardLayout = ({logoutUser, loggedUser}) => {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-sky-500/30 overflow-hidden">
      {/* 1. Tactical Sidebar */}
      <Sidebar logoutUser = {logoutUser} />

      {/* 2. Main Command Interface */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Ambient Background Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

        <TopNavbar loggedUser={loggedUser} />

        {/* 3. Content Arena */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-[1600px] mx-auto p-6 md:p-10 lg:p-12"
          >
            {/* The Outlet renders our Workouts, Overview, or Detail pages */}
            <Outlet />
          </motion.div>
        </main>

        {/* Integrated Tactical Footer (Optional/Subtle) */}
        <footer className="px-12 py-4 border-t border-slate-900 bg-slate-950/50 backdrop-blur-md flex justify-between items-center">
            <div className="flex gap-6">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">System Status: Nominal</span>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Sync: 0.02ms</span>
            </div>
            <div className="text-[10px] font-black text-sky-500/40 uppercase tracking-[0.2em] italic">
                FitCore v3.0 // Neural Link Active
            </div>
        </footer>
      </div>
    </div>
  )
}

export default DashboardLayout