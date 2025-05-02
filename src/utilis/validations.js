const validator=require("validator");
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
module.exports={validateSignUpData,};