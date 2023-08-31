const User = require("../models/userModel");
const bcrypt = require("bcrypt");
 module.exports.register = async (req,res,next) =>{
    try{
        const {username,email,password} = req.body;
        const usernameCheck = await User.findOne({username})
        if(usernameCheck){
            return res.json({msg:"This Username already used" , status:false})
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck) {
            return res.json({msg:"Email already exists" , status:false});
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const ss = await User.create({
            username,email,password:hashedPassword,
        })
        const userobj = ss;
        userobj.password = null;
        return res.json({status:true,userobj});
    }catch(ex){
        console.log(ex);
        next(ex);
    }
 }
 module.exports.login = async(req,res,next)=>{
    try{
        const{username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.json({msg:"Incorrect Username or password" , status:false})
        }
        const isPasswordValid = await bcrypt.compare(password , user.password);
        if(!isPasswordValid){
            return res.json({ msg: "Inncorect Username or Password", status: false });
        }
        let userobj = user;
        userobj.password = null;
        return res.json({status:true , userobj});
    }catch(ex){
        console.log(ex);
        next(ex)
    }
 }
 module.exports.allusers = async(req,res,next) =>{
    try{
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email" , "username" , "_id"
        ]);
        return res.json(users);
    } catch (ex) {
        console.log(ex);
        next(ex);
    }
 }