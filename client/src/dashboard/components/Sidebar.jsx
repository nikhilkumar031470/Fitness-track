import React from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  BarChart3,
  Settings,
  LogOut,
  Heart,
  Apple,
  Users,
  Sparkles,
  Target,
  Bell,
  TrendingUp
} from "lucide-react";

// Navigation Links
const NAVIGATION_LINKS = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard/overview" },
  { icon: Dumbbell, label: "Workouts", path: "/dashboard/workouts" },
  { icon: Apple, label: "Nutrition", path: "/dashboard/nutrition" },
  { icon: TrendingUp, label: "Progress", path: "/dashboard/progress" }, // Progress Tab
  { icon: Target, label: "Goals", path: "/dashboard/goals" }, // Goals Tab
  { icon: Bell, label: "Reminders", path: "/dashboard/reminder" }, // Reminder Tab
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Users, label: "Community", path: "/dashboard/community" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

/**
 * Logo Component
 */
const BrandLogo = () => (
  <div className="mb-12 flex items-center gap-4 px-2">
    <motion.div
      whileHover={{ rotate: 15, scale: 1.1 }}
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-[#020617] shadow-xl shadow-sky-500/20"
    >
      <Heart fill="currentColor" size={24} />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-sky-400 border-2 border-[#020617]"
      />
    </motion.div>

    <div className="hidden lg:block text-white">
      <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
        TRACK<span className="text-sky-400">FITNESS</span>
      </h1>
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mt-1 flex items-center gap-1">
        <Sparkles size={10} className="text-sky-400" />
        Pro Performance
      </p>
    </div>
  </div>
);

/**
 * Sidebar Link Component
 */
const SidebarLink = ({ item, isMobile = false }) => {
  const { pathname } = useLocation();
  const isActive = pathname === item.path;

  if (isMobile) {
    return (
      <NavLink to={item.path} className="relative p-4">
        {isActive && (
          <motion.div
            layoutId="mobile-nav-pill"
            className="absolute inset-0 bg-sky-500/10 rounded-full"
          />
        )}

        <item.icon
          size={22}
          className={`relative z-10 transition-colors ${
            isActive ? "text-sky-400" : "text-slate-500"
          }`}
        />
      </NavLink>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `
        relative group flex items-center gap-4 rounded-2xl px-4 py-4 text-sm transition-all duration-300
        ${
          isActive
            ? "font-black text-[#020617]"
            : "font-bold text-slate-500 hover:text-sky-400 hover:bg-white/5"
        }
      `}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-active-pill"
          className="absolute inset-0 bg-sky-400 rounded-2xl"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <div className="relative z-10 flex items-center gap-4 w-full">
        <item.icon
          size={22}
          strokeWidth={isActive ? 3 : 2}
          className="group-hover:scale-110 transition-transform shrink-0"
        />
        <span className="hidden lg:block uppercase text-[11px] tracking-[0.15em]">
          {item.label}
        </span>
      </div>
    </NavLink>
  );
};

export default function Sidebar({logoutUser}) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-screen w-20 lg:w-72 flex-col border-r border-slate-800 bg-[#020617] transition-all duration-500">
        <div className="flex flex-col h-full p-4 lg:p-8">
          <BrandLogo />

          <nav className="flex-1 space-y-2">
            {NAVIGATION_LINKS.map((item) => (
              <SidebarLink key={item.path} item={item} />
            ))}
          </nav>

          {/* Logout */}
          <div className="pt-6 border-t border-slate-800">
            <Link to="/" className="block">
              <button className="group flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-sm font-black text-red-400 hover:bg-red-500/10 transition-all">
                <LogOut
                  size={22}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span onClick={logoutUser} className="hidden lg:block uppercase text-[11px] tracking-widest">
                  Logout
                </span>
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50 flex md:hidden items-center justify-around bg-[#0f172a]/80 backdrop-blur-2xl border border-slate-800 p-2 rounded-[2.5rem] shadow-2xl">
        {NAVIGATION_LINKS.slice(0, 5).map((item) => (
          <SidebarLink key={item.path} item={item} isMobile />
        ))}
      </nav>
    </>
  );
}