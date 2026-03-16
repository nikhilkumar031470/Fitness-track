import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, Activity, Heart } from "lucide-react";

const Footer = () => {
  // Navigation Links array for cleaner code
  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Workouts & Training", path: "/workouts" },
    { name: "Meal Tracking", path: "/nutrition" },
    { name: "Visual Progress", path: "/progress" },
    { name: "About Us", path: "/about" },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    // Reduced margin-top (mt-0) and border-t for a seamless look
    <footer className="bg-[#020617] text-slate-400 mt-0 border-t border-slate-800">
      <div className="container mx-auto px-8 py-10"> {/* Reduced vertical padding from 16 to 10 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="text-sky-400" size={28} />
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
                Track<span className="text-sky-400">Fitness</span>
              </h2>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 max-w-xs">
              Empowering your fitness journey through data-driven insights. Track your progress and crush your goals.
            </p>
          </div>

          {/* Quick Navigation - Optimized with Map */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Platform</h3>
            <ul className="space-y-3 text-xs font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-sky-400 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Support</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3 group cursor-pointer">
                <Mail size={14} className="text-sky-400" />
                <span className="group-hover:text-slate-200 transition-colors">support@trackfitness.com</span>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <Phone size={14} className="text-sky-400" />
                <span className="group-hover:text-slate-200 transition-colors">+92 319 103 1909</span>
              </div>
              <div className="pt-2 flex gap-3">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-sky-400 border border-slate-800 transition-all">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Stay Motivated</h3>
            <div className="flex group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-[#0f172a] border border-slate-800 rounded-l-xl px-4 py-2 w-full focus:outline-none focus:border-sky-500 transition-colors text-xs text-white"
              />
              <button className="bg-sky-500 text-slate-950 px-4 py-2 rounded-r-xl font-black text-[10px] hover:bg-sky-400 transition-all uppercase">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Reduced mt-16 to mt-10 */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} TrackFit. Precision in every rep.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
          <p className="flex items-center gap-1">
            Made with <Heart size={10} className="text-sky-500 fill-sky-500 animate-pulse" /> for elite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;