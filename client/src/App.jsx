import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Cards from "./features/Cards";
import Feedback from "./features/Feedback";
import About from "./features/About";
import DashboardLayout from "./dashboard/DashboardLayout";
import Analytics from "./dashboard/pages/Analytics";
import Community from "./dashboard/pages/Community";
import MiniCalendar from "./dashboard/pages/MiniCalendar";
import Nutrition from "./dashboard/pages/Nutrition";
import Overview from "./dashboard/pages/Overview";
import Workouts from "./dashboard/pages/Workouts";
import Register from "./dashboard/pages/Register";
import Login from "./dashboard/pages/Login";
import AppLayout from "./AppLayout";
import AddProgress from "./dashboard/pages/AddProgress";
import AddGoals from "./dashboard/pages/AddGoals";
import AddReminders from "./dashboard/pages/AddReminder";
import AddNutrition from "./dashboard/pages/AddNutrition";
import AddWorkout from "./dashboard/pages/AddWorkout";
import Goals from "./dashboard/pages/Goals";
import Progress from "./dashboard/pages/Progress";
import ReminderCard from "./dashboard/pages/Reminders";
import { GooeyToaster } from "goey-toast";
import NutritionAnalysis from "./dashboard/pages/NutritionAnalysis";
import UserProfile from "./dashboard/pages/UserProfile";

const App = () => {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || "",
  );

  const loginUser = (data) => {
    setLoggedUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logoutUser = () => {
    setLoggedUser("");
    localStorage.removeItem("user");
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={
              loggedUser ? (
                <DashboardLayout
                  logoutUser={logoutUser}
                  loggedUser={loggedUser}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route
              path="overview"
              element={<Overview loggedUser={loggedUser} />}
            />
            <Route path="analytics" element={<Analytics />} />
            <Route path="community" element={<Community />} />
            <Route path="minicalender" element={<MiniCalendar />} />
            <Route path="nutrition" element={<Nutrition />} />
            <Route
              path="add-nutrition"
              element={<AddNutrition loggedUser={loggedUser} />}
            />
            <Route
              path="add-workout"
              element={<AddWorkout loggedUser={loggedUser} />}
            />
            <Route path="progress" element={<Progress />} />
            <Route path="goals" element={<Goals />} />
            <Route path="reminder" element={<ReminderCard />} />
            <Route
              path="add-progress"
              element={<AddProgress loggedUser={loggedUser} />}
            />
            <Route
              path="add-goals"
              element={<AddGoals loggedUser={loggedUser} />}
            />
            <Route
              path="add-reminders"
              element={<AddReminders loggedUser={loggedUser} />}
            />
            <Route path="workouts" element={<Workouts />} />
            <Route path="nutrition-analysis" element={<NutritionAnalysis />} />
            <Route path="userprofile" element={<UserProfile  loggedUser={loggedUser}/>} />
          </Route>

          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="cards" element={<Cards />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="about" element={<About />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login loginUser={loginUser} />} />
        </Routes>
      </BrowserRouter>

      {/* this is latest project */}
    </>
  );
};

export default App;
