const validator=require("validator");
// const User=require("../models/user");
const {userAuth}=require("../middlewares/auth");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const validateSignUpData=(req)=>{

 const {firstName,lastName,emailId,password}=req.body;
 if(!firstName||!lastName)
 {
    throw new Error("please enter name");
 }
 else if(!validator.isEmail(emailId)){
    throw new Error("please enter the valid email id");
 }
 else if(!validator.isStrongPassword(password)){
    throw new Error("please enter the strong password");
 }

};
const validateEditProfileData=(req)=>{
   const allowedEditFiels=["fistName","lastName","age","gender","about","skills"];
   const isEditAllowed=Object.keys(req.body).every((field)=>allowedEditFiels.includes(field));
   return isEditAllowed;

}

module.exports={validateSignUpData,validateEditProfileData};