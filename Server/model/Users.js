const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    Username : String,
    Email : String,
    Password : String,
    ProfilePicture : String,
});


module.exports = mongoose.model("User", usersSchema);