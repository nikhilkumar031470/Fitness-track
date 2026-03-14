  const mongoose = require("mongoose");

  const workoutSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ExerciseName : String,
    Sets: Number,
    Reps: Number,
    Weight: Number,
    Note: String,
    Category: {
      type: String,
      enum: ["Chest","Back", "Legs", "Arms", "Shoulders", "Other"]
    },
    Tages: String,
    date: {
      type: Date,
      default: Date.now
    }
  }, { timestamps: true });

  module.exports = mongoose.model("WorkOut", workoutSchema);
