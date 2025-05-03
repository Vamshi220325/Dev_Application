const express=require("express");
const {validateSignUpData}=require("../utilis/validations");
const bcrypt=require("bcrypt");
const User=require("../models/user");
const { route } = require("./profile");
const authRouter=express.Router();

authRouter.post("/signup",async (req,res)=>{

  const {firstName,lastName,emailId,password}=req.body;
   try{ 
     validateSignUpData(req);
     const passwordHash=await bcrypt.hash(password,10);
     
    const user=new User({firstName,lastName,emailId,password:passwordHash});
    await user.save();
    res.send("user added successfuly");
   }
   catch(err)
   { console.log(err.message);
    res.send("Error : " + err.message);}


});

//
authRouter.post("/login",async (req,res)=>{
    try{  const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordvalid=await user.ValidatePassword(password);
    if(isPasswordvalid)
    {
        const token=await user.JWT();
        res.cookie("token",token,{expires:new Date(Date.now()+7 * 3600000)});

      res.send("login successful");
    }
    else{
      throw new Error("Invalid credentials(pw is wrong)")
    }}
    catch(err)
    {
        res.status(404).send("ERROR : "+err.message);
    }

});
module.exports={authRouter};