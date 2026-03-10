import React from "react";
import { Dumbbell } from "lucide-react";

const FitnessLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617]">
      <div className="relative group">
        {/* Main Glowing Background behind the dumbbell */}
        <div className="absolute inset-0 bg-sky-500/20 blur-[60px] rounded-full animate-pulse"></div>

        {/* Rotating Dumbbell Container */}
        <div className="relative flex items-center justify-center mb-12">
          <div className="animate-smooth-rotate">
            <Dumbbell 
              size={80} 
              className="text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]" 
              strokeWidth={1.5}
            />
          </div>
          
          {/* Floor Reflection/Shadow Effect */}
          <div className="absolute -bottom-8 w-20 h-2 bg-sky-500/10 blur-md rounded-[100%] animate-shadow-scale"></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h2 className="text-white font-black text-2xl tracking-[0.6em] uppercase flex items-center justify-center gap-1">
          LIFTING<span className="text-sky-400 animate-bounce">...</span>
        </h2>
        <div className="w-32 h-1 bg-slate-800 mx-auto mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-sky-500 animate-loading-slide"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes smooth-rotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes shadow-scale {
          0%, 100% { transform: scaleX(1); opacity: 0.3; }
          50% { transform: scaleX(1.5); opacity: 0.6; }
        }

        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-smooth-rotate {
          animation: smooth-rotate 2.5s infinite cubic-bezier(0.45, 0, 0.55, 1);
        }

        .animate-shadow-scale {
          animation: shadow-scale 2.5s infinite cubic-bezier(0.45, 0, 0.55, 1);
        }

        .animate-loading-slide {
          animation: loading-slide 1.5s infinite linear;
        }
      `}} />
    </div>
  );
};

export default FitnessLoader;