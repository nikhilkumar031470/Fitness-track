const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        goalType: {
            type: String,
            enum: ["Weight Loss", "Weight Gain", "Muscle Gain", "Endurance", "Custom"],
        },
        targetweight: Number, 
        currentweight: Number,
        deadline: Date,
        notes: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Goals", goalSchema);