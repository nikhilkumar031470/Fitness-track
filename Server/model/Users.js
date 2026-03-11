const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    fullName : String,
    email : String,
    password : String,
    cPassword : String,
    profilePic : String,
});


module.exports = mongoose.model("User", usersSchema);