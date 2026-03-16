const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    mealType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    foodName: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    proteins: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    fats: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Nutrition", nutritionSchema);