const express = require("express");
const cors = require("cors");
const path = require("path");
const Nutrition = require("./Model/Nutrition");
const connectDB = require("./config/dbConnection");
const Workout = require("./model/Workout");
const Progress = require("./model/Progress");
const goals = require("./model/goals");
const Reminder = require("./model/Reminder");
const bcrypt = require("bcrypt");
const multer = require("multer");
const Users = require("./model/Users");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })



app.post("/api/add-nutrition", async (req, res) => {
    try {

        const { mealType, date, foodName, quantity, calories, proteins, carbs, fats, userID } = req.body;

        await Nutrition.insertOne({ mealType, date, foodName, quantity, calories, proteins, carbs, fats, userID });

        res.status(200).send({ message: "Data added successfully" });

    } catch (err) {
        res.status(200).send({ message: "Error adding data" });
        console.log(err);
    }
});

app.post("/api/add-workout", async (req, res) => {
    try {

        const { Category, date: entryDate,ExerciseName,Tages, Sets, Reps, Weight, Note,userID } = req.body;

        await Workout.insertOne({ Category, date: entryDate,ExerciseName,Tages, Sets, Reps, Weight, Note,userID });

        res.status(200).send({ message: "Data added successfully" });

        

    } catch (err) {
        res.status(200).send({ message: "Error adding data" });
        console.log(err);
    }
});



app.post("/api/add-progress", async (req, res) => {
    try {

        const { date: entryDate, weight, chest, waist, runtime, liftweight,userID } = req.body;


        await Progress.insertOne({ date: entryDate, weight, chest, waist, runtime, liftweight,userID });

        res.status(200).send({ message: "Data added successfully" });

        

    } catch (err) {
        res.status(200).send({ message: "Error adding data" });
        console.log(err);
    }
});


app.post("/api/add-goals", async (req, res) => {
    try {

        const { goalType, deadline, targetweight, currentweight, notes, userID } = req.body;


        await goals.insertOne({ goalType, deadline, targetweight, currentweight, notes, userID });

        res.status(200).send({ message: "Data added successfully" });

        

    } catch (err) {
        res.status(200).send({ message: "Error adding data" });
        console.log(err);
    }
});


app.post("/api/add-reminder", async (req, res) => {
    try {

        const { title, type, date, time, category, notes,userID } = req.body;


        await Reminder.insertOne({ title, type, date, time, category, notes,userID });

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
        res.status(200).send({message: "reminder Fetched Successfully", reminderdata});
    }
    catch (error) {
        res.json({
            message:error.message,
            error
        })
    }
})




app.get("/api/fetch-progress", async(req, res) => {
    try{
        const progress = await Progress.find();
        res.status(200).send({message: "reminder Fetched Successfully", progress});
    }
    catch (error) {
        res.json({
            message:error.message,
            error
        })
    }
})
app.get("/api/fetch-userdata", async(req, res) => {
    try{
        const userdata = await Users.find();
        res.status(200).send({message: "User Data Fetched Successfully", userdata});
    }
    catch (error) {
        res.json({
            message:error.message,
            error
        })
    }
})

app.post("/api/register", upload.single("profilePic"), async (req, res) => {
  try {
    const { fullName, email, password, cPassword } = req.body;

    // Store only filename if an image is uploaded
    const profilePic = req.file ? req.file.filename : null;

    const hashPassword = await bcrypt.hash(password, 10);
    // const hashcPassword = await bcrypt.hash(cPassword, 10);

    await Users.insertOne({ fullName, email, password: hashPassword, cPassword, profilePic });

    res.status(200).send({ message: "User added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error adding user" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const registeredUser = await Users.findOne({email: email});
    
    if(registeredUser){
        const isMatch = await bcrypt.compare(password, registeredUser.password);
        if(isMatch){
            res.status(200).send({message: "Logged in Successfully", registeredUser});
            console.log("Login Successfully");
        }
        else {
            res.status(200).send({message: "Invalid Credentials"});
            console.log("Invalid Credentials");
        }
    }
    else {
        res.status(200).send({message: "User don't exist"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error adding user" });
  }
});
app.post("/api/update-profile", async (req,res)=>{

  const { userID, fullName, profilePic } = req.body

  const user = await User.findByIdAndUpdate(
    userID,
    { fullName, profilePic },
    { new:true }
  )

  res.json({
    message:"Profile updated",
    user
  })

})
app.listen(3000, () => {
    console.log("Server Started");
})