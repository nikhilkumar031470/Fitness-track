import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Activity, Edit, Ruler, Weight, Target, ChevronRight, ShieldCheck, Zap } from "lucide-react";

const UserProfile = () => {

  const [editMode, setEditMode] = useState(false)
const loggedUser = JSON.parse(localStorage.getItem("user") || "{}")

const user = {
  name: loggedUser?.fullName || "Unknown",
  email: loggedUser?.email || "No Email",
  age: loggedUser?.age || "N/A",
  height: loggedUser?.height || "N/A",
  weight: loggedUser?.weight || "N/A",
  goal: loggedUser?.goal || "Not Set",
  joinedDate: loggedUser?.createdAt
    ? new Date(loggedUser.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      })
    : "Unknown"
}

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden font-sans antialiased">
      
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-sky-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-blue-600/5 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl w-full z-10"
      >
        
        <div className="flex items-end justify-between mb-10 px-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sky-500 font-bold text-[10px] tracking-[0.4em] uppercase">
              <ShieldCheck size={14} /> Security Verified
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase">
              Athlete <span className="text-sky-500">Profile.</span>
            </h1>

            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Registered {user.joinedDate}
            </p>

          </div>

          <motion.button
  onClick={() => setEditMode(!editMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-colors"
          >
            <Edit size={20} />
          </motion.button>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-sky-500/20 to-transparent" />

          <div className="flex flex-col md:flex-row items-center gap-10 mb-12">

            <div className="relative group">
              <div className="w-36 h-36 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center p-1 shadow-2xl group-hover:border-sky-500/50 transition-colors duration-500">
                <div className="w-full h-full rounded-2xl bg-linear-to-br from-slate-900 to-slate-950 flex items-center justify-center overflow-hidden border border-slate-800">
                  {loggedUser?.profilePic ? (
  <img
    src={loggedUser.profilePic}
    alt="profile"
    className="w-full h-full object-cover rounded-2xl"
  />
) : (
  <User size={64} className="text-slate-700 group-hover:text-sky-500 transition-colors duration-500" />
)}
                </div>
              </div>

              <div className="absolute -bottom-2 -right-2 bg-[#020617] p-2 rounded-xl border border-slate-800">
                <Zap size={16} className="text-sky-500 fill-sky-500/20" />
              </div>
            </div>

            <div className="text-center md:text-left space-y-4">

              <h2 className="text-5xl font-bold text-white tracking-tighter">
                {user.name}
              </h2>

              <div className="flex flex-col gap-3">

                <p className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-sm font-medium">
                  <Mail size={16} className="text-sky-500/50" /> {user.email}
                </p>

                <div className="flex items-center justify-center md:justify-start gap-3">

                  <span className="px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 text-sky-500 text-[10px] font-bold uppercase tracking-widest rounded-lg">
                    Pro Athlete
                  </span>

                  <span className="px-4 py-1.5 bg-slate-950 border border-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-lg">
                    Level 12
                  </span>

                </div>

              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">

            <StatBox icon={<Activity size={18}/>} label="Age" value={user.age} />

            <StatBox icon={<Ruler size={18}/>} label="Height" value={user.height} />

            <StatBox icon={<Weight size={18}/>} label="Weight" value={user.weight} />

          </div>

          <div className="bg-slate-950/50 border border-slate-800/50 p-8 rounded-3xl space-y-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="p-3 bg-sky-500/10 text-sky-500 rounded-xl border border-sky-500/10">
                  <Target size={20} />
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">
                    Primary Objective
                  </h4>

                  <p className="text-xl font-bold text-white tracking-tight">
                    {user.goal}
                  </p>
                </div>

              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">
                  75% Complete
                </span>
              </div>

            </div>

            <div className="relative h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 ring-1 ring-slate-800">

              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-sky-500 rounded-full shadow-[0_0_12px_rgba(14,165,233,0.4)]" 
              />

            </div>

          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-10 flex items-center justify-center gap-3 py-5 bg-white text-slate-950 font-bold uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-sky-500 hover:text-white transition-all shadow-xl active:shadow-inner"
          >
            Access Biometric Analytics <ChevronRight size={18} />
          </motion.button>

        </div>

        <div className="mt-10 flex items-center justify-center gap-4 opacity-40">
          <div className="h-px w-12 bg-slate-800" />
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em]">
            End-to-End Encryption Active
          </p>
          <div className="h-px w-12 bg-slate-800" />
        </div>

      </motion.div>
    </div>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="bg-slate-950/40 border border-slate-800/50 p-5 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-sky-500/30 transition-all duration-300">
    <div className="text-slate-600 group-hover:text-sky-500 transition-colors">{icon}</div>
    <div className="text-center">
      <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</span>
      <span className="block text-lg font-bold text-white tracking-tighter tabular-nums">{value}</span>
    </div>
  </div>
);

export default UserProfile;