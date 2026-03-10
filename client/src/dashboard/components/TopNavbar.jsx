import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

/**
 * Search Bar Sub-component
 * Human Touch: Added keyboard listener for the Cmd+K shortcut
 */
const CommandSearch = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative hidden md:block group">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors"
        size={16}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search analytics, workouts, or meals..."
        className="w-80 lg:w-96 rounded-2xl bg-white/5 border border-transparent focus:border-sky-500/30 focus:bg-white/10 px-11 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none transition-all duration-300"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-none">
        <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-[10px] text-slate-500 font-sans group-focus-within:hidden">
          ⌘
        </kbd>
        <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-[10px] text-slate-500 font-sans group-focus-within:hidden">
          K
        </kbd>
      </div>
    </div>
  );
};

/**
 * User Profile Sub-component
 */
const UserMenu = ({ onLogout }) => (
  <button
    onClick={onLogout}
    className="flex items-center gap-3 group p-1.5 pr-3 rounded-2xl hover:bg-white/5 transition-all duration-300 focus:outline-none"
  >
    <div className="relative">
      <img
        src="https://i.pravatar.cc/150?u=shah"
        alt="Sameer Khan"
        className="h-10 w-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-sky-500/50 transition-all"
        onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Sameer+Khan&background=0ea5e9&color=fff"; }}
      />
      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-500 border-2 border-[#020617] rounded-full" />
    </div>

    <div className="hidden sm:block text-left">
      <p className="text-[12px] font-black text-white group-hover:text-sky-400 transition-colors tracking-tight">
        Sameer Khan
      </p>
      <p className="text-[9px] font-black uppercase text-slate-500 group-hover:text-rose-500 transition-colors tracking-widest">
        Sign Out
      </p>
    </div>
  </button>
);

const TopNavbar = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    // Human touch: Wrap logout in a function for future logic (like clearing tokens)
    setIsAuthenticated(false);
  };

  return (
    <header className="sticky top-0 z-40 h-20 w-full border-b border-slate-800 bg-[#020617]/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-6 md:px-10">
        
        <CommandSearch />

        <div className="flex items-center gap-3 md:gap-6">
          <ThemeToggle />
          <UserMenu onLogout={handleLogout} />
        </div>

      </div>
    </header>
  );
};

export default TopNavbar;