import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Activity,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Eye,
  EyeOff,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    cPassword: ""
  });
  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.cPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (profilePic) data.append("profilePic", profilePic);

      const response = await axios.post("http://localhost:3000/api/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("User Registered:", response.data);
      setFormData({ fullName: "", email: "", password: "", cPassword: "" });
      setProfilePic(null);
      navigate("/dashboard/overview");
    } catch (err) {
      console.error("Error registering user", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#020617] selection:bg-sky-500/30 font-sans">
      {/* Left Panel UI unchanged */}
      <div className="hidden lg:flex w-5/12 bg-[#0B0F1A] border-r border-slate-800/50 flex-col justify-center p-20 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none uppercase font-black text-[12rem] leading-none italic select-none break-all">
          PERFORM ELITE LIMITLESS POWER
        </div>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative z-10">
          <div className="mb-16 flex items-center gap-4">
            <div className="bg-sky-500 p-2.5 rounded-2xl shadow-lg shadow-sky-500/20">
              <Activity className="text-slate-950" size={32} strokeWidth={3} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
              TRACKFITNESS
            </h1>
          </div>

          <h2 className="text-7xl font-black text-white mb-10 leading-[0.85] italic tracking-tighter uppercase">
            Build Your <br />
            <span className="text-sky-500 not-italic">Legacy</span> <br />
            Today.
          </h2>

          <div className="space-y-6 mb-16">
            <FeatureItem text="Unlimited workout architectures" delay={0.1} />
            <FeatureItem text="Advanced biometric analytics" delay={0.2} />
            <FeatureItem text="Neural performance heatmaps" delay={0.3} />
            <FeatureItem text="Elite tier community access" delay={0.4} />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-white/5 backdrop-blur-xl relative group shadow-2xl">
            <Star className="absolute -top-3 -right-3 text-sky-500 fill-sky-500 animate-pulse" size={24} />
            <p className="text-slate-400 italic text-base leading-relaxed mb-6">
              "This platform shifted my entire perspective on training. The data visualization is unmatched in the industry. It's not just an app; it's a digital coach."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 border-2 border-slate-800" />
              <div>
                <p className="text-white font-black text-xs uppercase tracking-widest">S. Kulkarni</p>
                <p className="text-sky-500/60 font-bold text-[9px] uppercase tracking-tighter">Professional Athlete</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel UI unchanged except profile pic input added */}
      <div className="w-full lg:w-7/12 flex flex-col items-center justify-center p-8 md:p-20 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-12 justify-center">
            <Activity className="text-sky-500" size={40} />
            <span className="text-3xl font-black text-white uppercase italic tracking-tighter">
              TRACKFITNESS
            </span>
          </div>

          <header className="mb-12 text-center lg:text-left">
            <h3 className="text-5xl font-black text-white mb-3 uppercase italic tracking-tighter">
              Create Profile
            </h3>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center lg:justify-start gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              Secure 256-bit Biometric Registration
            </p>
          </header>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Profile Pic */}
            <div className="flex flex-col items-center mb-4">
              <label className="relative cursor-pointer group">
                <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-700 group-hover:border-sky-500 transition-all">
                  {profilePic ? (
                    <img src={URL.createObjectURL(profilePic)} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={36} className="text-slate-500" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  className="hidden"
                />
                <span className="text-slate-400 text-[10px] mt-2 block text-center group-hover:text-sky-400 transition-colors">
                  Click to add profile picture
                </span>
              </label>
            </div>

            {/* Full Name */}
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" size={20} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="IDENTIFICATION (FULL NAME)"
                className="w-full bg-slate-900/40 border border-slate-800/80 text-white p-5 pl-14 rounded-2xl"
                required
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="COMMUNICATION ENDPOINT (EMAIL)"
                className="w-full bg-slate-900/40 border border-slate-800/80 text-white p-5 pl-14 rounded-2xl"
                required
              />
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="ACCESS KEY"
                  className="w-full bg-slate-900/40 border border-slate-800/80 text-white p-5 pl-14 rounded-2xl"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="cPassword"
                  value={formData.cPassword}
                  onChange={handleChange}
                  placeholder="RE-VERIFY"
                  className="w-full bg-slate-900/40 border border-slate-800/80 text-white p-5 pl-14 rounded-2xl"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-sky-500 text-slate-950 font-black p-5 rounded-2xl flex items-center justify-center gap-3 mt-8">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Initialize Protocol <ArrowRight size={20} /></>}
            </button>
          </form>

          <p className="text-slate-500 text-center mt-12 text-[11px] font-black uppercase tracking-[0.2em]">
            Existing Personnel?{" "}
            <Link to="/login" className="text-white hover:text-sky-400 underline ml-2">Access Vault</Link>
          </p>
        </motion.div>

        <div className="absolute bottom-8 text-[9px] font-bold text-slate-700 uppercase tracking-widest text-center">
          Protected by TrackFitness Core • v2.0.26
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text, delay }) => (
  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }} className="flex items-center gap-4 group cursor-default">
    <div className="bg-sky-500/10 p-2 rounded-xl border border-sky-500/10 group-hover:bg-sky-500/20 group-hover:border-sky-500/40 transition-all">
      <CheckCircle2 className="text-sky-400" size={18} />
    </div>
    <span className="text-slate-400 group-hover:text-white font-bold uppercase text-[11px] tracking-widest transition-colors">{text}</span>
  </motion.div>
);

export default Register;