import React, { useState } from "react";
import {
  Trophy,
  Users,
  Star,
  Flame,
  CheckCircle2,
  ChevronRight,
  Target,
  Zap,
  Crown,
  Award,
  Activity as ActivityIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LEADERBOARD = [
  {
    rank: 1,
    name: "Shabbir",
    points: 12890,
    img: "https://i.pravatar.cc/150?u=3",
    level: "Elite",
  },
  {
    rank: 2,
    name: "Sameer",
    points: 11450,
    img: "https://i.pravatar.cc/150?u=1",
    level: "Pro",
  },
  {
    rank: 3,
    name: "Nikil",
    points: 11200,
    img: "https://i.pravatar.cc/150?u=2",
    level: "Pro",
  },
  {
    rank: 4,
    name: "Ahsan",
    points: 10200,
    img: "https://i.pravatar.cc/150?u=5",
    level: "Veteran",
  },
];

const FEED_DATA = [
  {
    id: 1,
    user: "Sarah Miller",
    action: "crushed 5km Run",
    time: "2m ago",
    img: "https://i.pravatar.cc/150?u=12",
    type: "burn",
  },
  {
    id: 2,
    user: "Alex Johnson",
    action: "leveled up to Elite",
    time: "15m ago",
    img: "https://i.pravatar.cc/150?u=11",
    type: "level",
  },
  {
    id: 3,
    user: "Mike Ross",
    action: "joined Heavy Lifters",
    time: "1h ago",
    img: "https://i.pravatar.cc/150?u=13",
    type: "join",
  },
];

export default function Community() {
  const [joinedChallenges, setJoinedChallenges] = useState([0]); // Simulating user joined first challenge

  const toggleJoin = (idx) => {
    setJoinedChallenges((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-10"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
              Squad Goals
            </h2>
            <div className="bg-sky-500/10 p-1.5 rounded-lg text-sky-400 border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
              <Users size={22} />
            </div>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
            Join the FitCore elite community
          </p>
        </div>

        <div className="flex -space-x-3 items-center bg-slate-900/30 backdrop-blur-md p-2 rounded-2xl border border-slate-800/50">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              className="w-9 h-9 rounded-full border-[3px] border-[#020617] object-cover hover:translate-y-[-2px] transition-transform cursor-pointer"
              src={`https://i.pravatar.cc/150?u=${i + 20}`}
              alt="user"
            />
          ))}
          <div className="w-9 h-9 rounded-full border-[3px] border-[#020617] bg-sky-500 flex items-center justify-center text-[9px] font-black text-slate-950 shadow-lg shadow-sky-500/20">
            +2K
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-10">
          <section>
            <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="text-xl font-black text-white tracking-tight italic flex items-center gap-3">
                Active Challenges
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
              </h3>
              <button className="text-[10px] font-black text-sky-400 bg-sky-500/10 border border-sky-500/20 px-5 py-2.5 rounded-xl uppercase tracking-widest hover:bg-sky-500 hover:text-slate-950 transition-all">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "30 Day Plank Challenge",
                  participants: "1,240",
                  color: "from-sky-500 to-blue-700",
                  progress: 65,
                  tag: "Hard",
                  icon: <Target className="text-white/10" size={100} />,
                },
                {
                  title: "Morning Run Streak",
                  participants: "850",
                  color: "from-slate-800 to-slate-950",
                  progress: 40,
                  tag: "Daily",
                  icon: <Zap className="text-white/10" size={100} />,
                },
              ].map((challenge, idx) => (
                <div
                  key={idx}
                  className={`group relative overflow-hidden p-8 bg-gradient-to-br ${challenge.color} rounded-[2.5rem] text-white shadow-2xl transition-all hover:-translate-y-2`}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start">
                      <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">
                        {challenge.tag}
                      </span>
                      <Trophy
                        size={20}
                        className="text-white/40 group-hover:text-white/80 transition-colors"
                      />
                    </div>

                    <h3 className="text-2xl font-black mt-6 mb-1 tracking-tighter uppercase italic">
                      {challenge.title}
                    </h3>
                    <p className="text-white/60 text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide">
                      <Users size={12} className="text-sky-300" />{" "}
                      {challenge.participants} in squad
                    </p>

                    <div className="mt-8 space-y-3">
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.15em]">
                        <span className="text-white/50">Completion</span>
                        <span className="text-white">
                          {challenge.progress}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${challenge.progress}%` }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] rounded-full"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => toggleJoin(idx)}
                      className={`mt-8 w-full py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 ${
                        joinedChallenges.includes(idx)
                          ? "bg-emerald-500 text-white"
                          : "bg-white text-slate-950 hover:bg-sky-100"
                      }`}
                    >
                      {joinedChallenges.includes(idx)
                        ? "Active Protocol"
                        : "Join Challenge"}
                    </button>
                  </div>
                  <div className="absolute -right-6 -bottom-6 rotate-12 opacity-20 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-0">
                    {challenge.icon}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 bg-slate-900/20 rounded-[2.5rem] border border-slate-800/50 backdrop-blur-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
              <ActivityIcon size={20} className="text-sky-500" />
              <h3 className="text-xl font-black text-white tracking-tight italic uppercase">
                Live Feed
              </h3>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {FEED_DATA.map((item) => (
                  <ActivityItem key={item.id} {...item} />
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>

        <aside>
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl sticky top-24">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3 italic">
                <Star
                  className="text-sky-400 fill-sky-400/20 animate-pulse"
                  size={20}
                />{" "}
                RANKINGS
              </h3>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                GLOBAL
              </span>
            </div>

            <div className="space-y-6">
              {LEADERBOARD.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between group cursor-pointer p-2 -m-2 rounded-2xl hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={user.img}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-sky-500/50 transition-all duration-300 shadow-lg"
                        alt=""
                      />
                      <div
                        className={`absolute -top-2 -left-2 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shadow-lg rotate-[-10deg] group-hover:rotate-0 transition-transform
                        ${user.rank === 1 ? "bg-sky-400 text-slate-950" : "bg-slate-800 text-slate-400"}`}
                      >
                        {user.rank}
                      </div>
                    </div>
                    <div>
                      <p className="font-black text-white text-sm leading-tight group-hover:text-sky-400 transition-colors uppercase italic">
                        {user.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mt-0.5">
                        {user.points.toLocaleString()} XP{" "}
                        <span className="text-slate-700 mx-1">//</span>{" "}
                        {user.level}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-slate-700 group-hover:text-sky-400 group-hover:translate-x-1 transition-all"
                  />
                </div>
              ))}
            </div>

            <button className="mt-12 w-full py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-sky-500 hover:text-slate-950 hover:border-sky-500 transition-all">
              View World Rankings
            </button>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

function ActivityItem({ user, action, time, img, type }) {
  const icons = {
    burn: <Flame size={14} className="text-orange-500" />,
    level: <Award size={14} className="text-sky-500" />,
    join: <Crown size={14} className="text-amber-500" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between group p-4 rounded-3xl border border-transparent hover:border-slate-800 hover:bg-slate-800/30 transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={img}
            className="w-11 h-11 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            alt=""
          />
          <div className="absolute -bottom-1.5 -right-1.5 bg-[#020617] p-1 rounded-lg shadow-xl border border-slate-800">
            {icons[type]}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400">
            <span className="font-black text-white italic uppercase">
              {user}
            </span>{" "}
            {action}
          </p>
          <p className="text-[9px] font-black text-slate-600 uppercase mt-1 tracking-widest">
            {time}
          </p>
        </div>
      </div>
      <CheckCircle2
        size={16}
        className="text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.div>
  );
}
