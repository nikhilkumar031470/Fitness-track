import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Activity,
  House,
  MessageSquareMore,
  Info,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const navItemStyles = ({ isActive }) =>
    `flex items-center gap-2 transition-all duration-300 ${
      isActive
        ? "text-sky-400 font-black" // Increased from font-bold to font-black
        : "text-slate-300 hover:text-sky-400 font-bold" // Increased from font-medium to font-bold
    }`;

  return (
    // 1. Fixed Wrapper - This creates the "floating" area
    <div className="fixed top-0 left-0 w-full z-[100] px-4 py-6 md:px-8 pointer-events-none">
      
      {/* 2. The Actual Navbar - Rounded and Glassy */}
      <nav className="max-w-7xl mx-auto h-16 md:h-20 bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl shadow-black/50 pointer-events-auto px-6 flex justify-between items-center transition-all duration-300">
        
        {/* LOGO */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 z-[110]">
          <div className="bg-sky-500 p-1.5 rounded-xl shadow-lg shadow-sky-500/20">
            <Activity size={22} className="text-[#020617]" />
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
            Track<span className="text-sky-400">Fitness</span>
          </h1>
        </Link>

        {/* DESKTOP NAV */}
        {/* Changed text-[10px] to text-[12px] and increased tracking */}
        <ul className="hidden md:flex items-center gap-10 text-[12px] uppercase tracking-[0.2em]">
          <li><NavLink to="/" className={navItemStyles}><House size={16} /> Home</NavLink></li>
          <li><NavLink to="/about" className={navItemStyles}><Info size={16} /> About</NavLink></li>
          <li><NavLink to="/feedback" className={navItemStyles}><MessageSquareMore size={16} /> Feedback</NavLink></li>
        </ul>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {/* Increased font size to 11px and weight to font-black */}
          <Link to="/login" className="hidden lg:block text-slate-400 hover:text-sky-400 text-[11px] font-black uppercase tracking-widest px-4">
            Dashboard
          </Link>
          {/* Increased font size to 11px */}
          <Link to="/register" className="hidden sm:block bg-sky-500 text-[#020617] px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-sky-400 transition-all">
            Join Now
          </Link>

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden text-sky-400 p-2 z-[110]" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div 
        className={`fixed inset-0 bg-[#020617]/98 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden pointer-events-auto ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } z-[105] flex flex-col items-center justify-center`}
      >
        <div className="flex flex-col items-center gap-10">
          <NavLink to="/" onClick={closeMenu} className="flex items-center gap-4 text-2xl font-black uppercase tracking-widest text-white">
            <House size={28} className="text-sky-500" /> Home
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} className="flex items-center gap-4 text-2xl font-black uppercase tracking-widest text-white">
            <Info size={28} className="text-sky-500" /> About
          </NavLink>
          <NavLink to="/feedback" onClick={closeMenu} className="flex items-center gap-4 text-2xl font-black uppercase tracking-widest text-white">
            <MessageSquareMore size={28} className="text-sky-500" /> Feedback
          </NavLink>
          
          <div className="h-px w-12 bg-slate-800 my-4" />
          
          <Link to="/login" onClick={closeMenu} className="text-slate-500 font-black uppercase tracking-widest">Dashboard</Link>
          <Link to="/register" onClick={closeMenu} className="bg-sky-500 text-[#020617] px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm">Join Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;