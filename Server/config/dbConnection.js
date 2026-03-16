const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://Fitness-track:fitness-track@cluster0.g0n3zta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB Connected!");
    }
    catch(err){
        console.log("Error Connecting DB:", err);
    }
} 

module.exports = connectDB;