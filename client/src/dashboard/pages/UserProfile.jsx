import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Activity,
  Edit,
  Ruler,
  Weight,
  Target,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";

const UserProfile = () => {

  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [editMode, setEditMode] = useState(false);

  const user = {
    name: loggedUser?.fullName || "Unknown",
    email: loggedUser?.email || "No Email",
    age: loggedUser?.age || "",
    height: loggedUser?.height || "",
    weight: loggedUser?.weight || "",
    goal: loggedUser?.goal || "",
    joinedDate: loggedUser?.createdAt
      ? new Date(loggedUser.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric"
        })
      : "Unknown"
  };

  const [formData, setFormData] = useState({
    age: user.age,
    height: user.height,
    weight: user.weight,
    goal: user.goal
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {

      const res = await axios.post(
        "http://localhost:3000/api/update-profile",
        {
          userID: loggedUser._id,
          age: formData.age,
          height: formData.height,
          weight: formData.weight,
          goal: formData.goal
        }
      );

      toast.success(res.data.message);

      localStorage.setItem("user", JSON.stringify(res.data.updatedUser));

      setEditMode(false);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden font-sans antialiased">

      <div className="absolute top-0 left-1/4 w-125 h-125 bg-sky-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-blue-600/5 blur-[100px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full z-10"
      >

        {/* Header */}

        <div className="flex items-end justify-between mb-10 px-2">

          <div className="space-y-2">

            <div className="flex items-center gap-2 text-sky-500 font-bold text-[10px] tracking-[0.4em] uppercase">
              <ShieldCheck size={14} /> Security Verified
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase">
              Profile <span className="text-sky-500">Page.</span>
            </h1>


          </div>

          <div className="flex gap-3">

            <motion.button
              onClick={() => setEditMode(!editMode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-colors"
            >
              <Edit size={20} />
            </motion.button>

            {editMode && (
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-sky-500 rounded-xl text-white text-sm"
              >
                Save
              </button>
            )}

          </div>
        </div>

        {/* Card */}

        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">

          <div className="flex flex-col md:flex-row items-center gap-10 mb-12">

            {/* Profile Image */}

            <div className="relative group">

              <div className="w-36 h-36 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center p-1">

                <div className="w-full h-full rounded-2xl overflow-hidden">

                  {loggedUser?.profilePic ? (
                    <img
                      src={`http://localhost:3000/uploads/${loggedUser.profilePic}`}
                      alt="profile"
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${user.name}`;
                      }}
                    />
                  ) : (
                    <User size={64} className="text-slate-700" />
                  )}

                </div>

              </div>

              <div className="absolute -bottom-2 -right-2 bg-[#020617] p-2 rounded-xl border border-slate-800">
                <Zap size={16} className="text-sky-500" />
              </div>

            </div>

            {/* User Info */}

            <div className="text-center md:text-left space-y-4">

              <h2 className="text-5xl font-bold text-white tracking-tighter">
                {user.name}
              </h2>

              <p className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail size={16} /> {user.email}
              </p>

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-4 mb-10">

            <StatBox
              icon={<Activity size={18} />}
              label="Age"
              value={
                editMode ? (
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="bg-slate-800 text-white p-1 rounded text-center"
                  />
                ) : formData.age || "N/A"
              }
            />

            <StatBox
              icon={<Ruler size={18} />}
              label="Height"
              value={
                editMode ? (
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="bg-slate-800 text-white p-1 rounded text-center"
                  />
                ) : formData.height || "N/A"
              }
            />

            <StatBox
              icon={<Weight size={18} />}
              label="Weight"
              value={
                editMode ? (
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="bg-slate-800 text-white p-1 rounded text-center"
                  />
                ) : formData.weight || "N/A"
              }
            />

          </div>

          {/* Goal */}

          <div className="bg-slate-950/50 border border-slate-800/50 p-8 rounded-3xl space-y-6">

            <div className="flex items-center gap-4">

              <Target size={20} className="text-sky-500" />

              {editMode ? (
                <input
                  type="text"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="bg-slate-800 text-white p-2 rounded w-full"
                  placeholder="Enter goal"
                />
              ) : (
                <p className="text-xl font-bold text-white">
                  {formData.goal || "Not Set"}
                </p>
              )}

            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="bg-slate-950/40 border border-slate-800/50 p-5 rounded-2xl flex flex-col items-center justify-center gap-2">
    <div className="text-slate-600">{icon}</div>
    <div className="text-center">
      <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">
        {label}
      </span>
      <span className="block text-lg font-bold text-white">
        {value}
      </span>
    </div>
  </div>
);

export default UserProfile;