const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
module.exports = function connectToMongo(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("db connection success");
    })
    .catch((err)=>{
        console.log(err);
    });
}