const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        min:3,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})
module.exports = mongoose.model("Users",userSchema);