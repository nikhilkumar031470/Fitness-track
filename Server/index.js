const express = require("express");
const cors = require("cors");
const path = require("path");
const Nutrition = require("./Model/Nutrition");
const connectDB = require("./config/dbConnection");
const Workout = require("./model/Workout");
const Progress = require("./model/Progress");
const goals = require("./model/goals");
const Reminder = require("./model/Reminder");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.post("/api/add-nutrition", async (req, res) => {
    try {

        const { mealType, date, foodName, quantity, calories, proteins, carbs, fats } = req.body;

        await Nutrition.insertOne({ mealType, date, foodName, quantity, calories, proteins, carbs, fats });

        res.status(200).send({ message: "Data added successfully" });

    } catch (err) {
        res.status(200).send({ message: "Error adding data" });
        console.log(err);
    }
});

app.post("/api/add-workout", async (req, res) => {
    try {

        const { Category, date: entryDate,ExerciseName,Tages, Sets, Reps, Weight, Note } = req.body;

        await Workout.insertOne({ Category, date: entryDate,ExerciseName,Tages, Sets, Reps, Weight, Note });

        res.status(200).send({ message: "Data added successfully" });

        

    } catch (err) {
        res.status(200).send({ message: "Error adding data" });
        console.log(err);
    }
});



app.post("/api/add-progress", async (req, res) => {
    try {

        const { date: entryDate, weight, chest, waist, runtime, liftweight } = req.body;


        await Progress.insertOne({ date: entryDate, weight, chest, waist, runtime, liftweight });

        res.status(200).send({ message: "Data added successfully" });

        

    } catch (err) {
        res.status(200).send({ message: "Error adding data" });
        console.log(err);
    }
});


app.post("/api/add-goals", async (req, res) => {
    try {

        const { goalType, deadline, targetweight, currentweight, notes } = req.body;


        await goals.insertOne({ goalType, deadline, targetweight, currentweight, notes });

        res.status(200).send({ message: "Data added successfully" });

        

    } catch (err) {
        res.status(200).send({ message: "Error adding data" });
        console.log(err);
    }
});


app.post("/api/add-reminder", async (req, res) => {
    try {

        const { title, type, date, time, category, notes } = req.body;


        await Reminder.insertOne({ title, type, date, time, category, notes });

        res.status(200).send({ message: "Data added successfully" });

        

    } catch (err) {
        res.status(200).send({ message: "Error adding data" });
        console.log(err);
    }
});

app.get("/api/fetch-workouts", async(req, res) => {
    try{
        const workoutdata = await Workout.find();
        res.status(200).send({message: "workoutdata Fetched Successfully", workoutdata});
    }
    catch (error) {
        res.json({
            message:error.message,
            error
        })
    }
})


app.get("/api/fetch-nutrition", async(req, res) => {
    try{
        const nutritiondata = await Nutrition.find();
        res.status(200).send({message: "Nutrition Fetched Successfully", nutritiondata});
    }
    catch (error) {
        res.json({
            message:error.message,
            error
        })
    }
})



app.get("/api/fetch-goals", async(req, res) => {
    try{
        const goalsdata = await goals.find();
        res.status(200).send({message: "Goals Fetched Successfully", goalsdata});
    }
    catch (error) {
        res.json({
            message:error.message,
            error
        })
    }
})

app.get("/api/fetch-reminder", async(req, res) => {
    try{
        const reminderdata = await Reminder.find();
        res.status(200).send({message: "Goals Fetched Successfully", reminderdata});
    }
    catch (error) {
        res.json({
            message:error.message,
            error
        })
    }
})

app.post("/api/register", async (req, res) => {
    try {

        const { fullName, email,password, cPassword } = req.body;

        await User.insertOne({  });

        res.status(200).send({ message: "User added successfully" });

    } catch (err) {
        res.status(200).send({ message: "Error adding data" });
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log("Server Started");
})