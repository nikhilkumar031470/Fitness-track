import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Custom Hook: Encapsulates theme logic.
 * This is the "Human" way to handle side effects like localStorage.
 */
function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    const theme = isDark ? 'dark' : 'light';
    
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [isDark]);

  return [isDark, setIsDark];
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useDarkMode();

  // Theme-specific configurations
  const themeConfig = {
    dark: {
      Icon: Sun,
      color: "text-amber-400",
      fill: "fill-amber-400/20",
      glow: "bg-amber-400/40",
      hover: "group-hover:rotate-90"
    },
    light: {
      Icon: Moon,
      color: "text-sky-500",
      fill: "fill-sky-500/20",
      glow: "bg-sky-500/30",
      hover: "group-hover:-rotate-12"
    }
  };

  const current = isDark ? themeConfig.dark : themeConfig.light;

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="group relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white dark:bg-[#0B0F1A] shadow-sm border border-gray-100 dark:border-white/5 transition-all duration-300 hover:border-sky-500/30 hover:shadow-lg active:scale-90"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: 10, opacity: 0, scale: 0.5, rotate: -90 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          exit={{ y: -10, opacity: 0, scale: 0.5, rotate: 90 }}
          transition={{ duration: 0.25, ease: "backOut" }}
          className="relative z-10 flex items-center justify-center"
        >
          <current.Icon 
            size={20} 
            strokeWidth={2.5}
            className={`${current.color} ${current.fill} ${current.hover} transition-transform duration-700 ease-in-out`} 
          />
          
          {/* Pulsing Background Glow */}
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className={`absolute inset-0 blur-lg ${current.glow} -z-10`} 
          />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}