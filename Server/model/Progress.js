const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
    {
        userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

        date: {
            type: Date,
            default: Date.now,
        },
        weight: Number,
        chest: Number,
        waist: Number,
        runTime: Number,
        liftWeight: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
