// models/Reminder.js
const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["Reminder", "Critical Alert"],
    default: "Reminder",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, // Storing time as string (HH:mm)
    required: true
  },
  category: {
    type: String,
    enum: ["Workout", "Nutrition", "Meds"],
    default: "Workout",
    required: true
  },
  notes: {
    type: String,
    trim: true,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Reminder", ReminderSchema);