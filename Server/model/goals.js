const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
        goalType: {
            type: String,
            enum: ["Weight Loss", "Weight Gain", "Muscle Gain", "Strength", "Endurance"],
        },
        targetweight: Number, 
        currentweight: Number,
        deadline: Date,
        notes: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Goals", goalSchema);
