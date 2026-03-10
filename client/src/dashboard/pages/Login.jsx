import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Mail, Lock, Activity, ArrowRight, 
  ShieldCheck, Eye, EyeOff, Loader2 
} from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Human Validation logic
    if (!formData.email.includes("@")) {
      setError("Please enter a valid mission-critical email.");
      setLoading(false);
      return;
    }

    // Simulate Auth Latency
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard/overview");
    }, 1800);
  };

  return (
    <div className="min-h-screen flex bg-[#020617] selection:bg-sky-500/30 font-sans">
      
      {/* Left Side: Brand & Visual Punch */}
      <section className="hidden lg:flex w-1/2 bg-sky-500 items-center justify-center relative overflow-hidden">
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23000'/%3E%3C/svg%3E")` }}
        />

        <div className="z-20 p-20 text-slate-950">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Activity size={100} strokeWidth={3} className="mb-10 drop-shadow-2xl" />
          </motion.div>

          <h1 className="text-8xl font-black uppercase leading-[0.85] mb-8 italic tracking-tighter">
            Defy <br /> Your <br /> DNA.
          </h1>

          <div className="h-2 w-32 bg-slate-950 mb-10 rounded-full" />

          <blockquote className="text-2xl font-black italic opacity-90 max-w-sm uppercase tracking-tight leading-tight">
            "Performance is the only <br /> universal currency."
          </blockquote>
        </div>

        {/* Dynamic Atmosphere */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/30 rounded-full blur-[120px] mix-blend-overlay" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-sky-400 rounded-full blur-[100px] opacity-60" />
      </section>

      {/* Right Side: Authentication Interface */}
      <main className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-24 relative">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-10"
        >
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-4 mb-12">
            <div className="bg-sky-500 p-2.5 rounded-2xl shadow-lg shadow-sky-500/20">
              <Activity className="text-slate-950" size={32} />
            </div>
            <span className="text-3xl font-black text-white uppercase tracking-tighter italic">FitCore</span>
          </div>

          <header>
            <h2 className="text-5xl font-black text-white mb-4 uppercase italic tracking-tighter leading-none">
              Initialize <br /> Access
            </h2>
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-8 bg-sky-500 rounded-full" />
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">
                Secure Biometric Protocol
              </p>
            </div>
          </header>

          {/* Error Feedback */}
          {error && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-4 shadow-xl shadow-rose-500/5"
            >
              <ShieldCheck size={20} className="shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Vector</label>
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 group-focus-within:scale-110 transition-all duration-300" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@fitness.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/30 border border-slate-800 text-white p-5 pl-14 rounded-2xl focus:border-sky-500/50 focus:bg-slate-900 focus:outline-none transition-all font-bold text-sm placeholder:text-slate-700"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Key</label>
              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 group-focus-within:scale-110 transition-all duration-300" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/30 border border-slate-800 text-white p-5 pl-14 pr-14 rounded-2xl focus:border-sky-500/50 focus:bg-slate-900 focus:outline-none transition-all font-bold text-sm placeholder:text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-[10px] font-black text-slate-600 hover:text-sky-400 uppercase tracking-widest transition-all">
                Sync Recovery?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-sky-500 text-slate-950 font-black p-5 rounded-[20px] hover:bg-sky-400 transition-all uppercase tracking-[0.25em] flex items-center justify-center gap-3 shadow-2xl shadow-sky-500/20 disabled:opacity-50 active:scale-[0.97]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Verifying Vector...</span>
                </>
              ) : (
                <>
                  Sync Account
                  <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <footer className="pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              No Data Found?{" "}
              <Link to="/register" className="text-sky-500 hover:text-sky-300 transition-colors ml-1">Establish Profile</Link>
            </p>
            <button className="text-[9px] font-black text-slate-600 hover:text-white border border-slate-800 px-4 py-2 rounded-lg uppercase tracking-tighter transition-all">
              Bypass (Guest)
            </button>
          </footer>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;