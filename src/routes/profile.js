const express=require("express");
const validator=require("validator");
const profileRouter=express.Router();
const bcrypt=require("bcrypt");
const {userAuth}=require("../middlewares/auth");
const {validateEditProfileData}=require("../utilis/validations");
// const router = require("./request");


profileRouter.get("/profile/view", userAuth,async (req,res)=>{
    try{const user=req.user;
     res.send(user);}
        
       catch(err)
       {
        res.send("Error : " + err.message);}

});
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
  try{

    if(!validateEditProfileData(req))
    {throw new Error("cannot Update the profile");}
    const loggedInUser=req.user;
    Object.keys(req.body).forEach((keys)=>(loggedInUser[keys]=req.body[keys]));
    await loggedInUser.save();
    res.send(` ${loggedInUser.firstName } ,your profile upadates succesfully`);



    
  }
  catch(err)
  {
      res.status(400).send("ERROR : "+err.message);
  }

} );
profileRouter.patch("/profile/password",userAuth,async (req,res)=>{
    try{const enteredPasswword=req.body.password;
        const newPassword=req.body.newPassword;
        const user=req.user;
         //loghic to check entered password is correct or not
         const isPasswordvalid=await bcrypt.compare(enteredPasswword,user.password);
         if(!isPasswordvalid)
         {throw new Error("incorrect password!!");}
         if(!validator.isStrongPassword(newPassword)){
             throw new Error("please enter the strong password");
          }
          const passwordHash=await bcrypt.hash(newPassword,10);
          user.password=passwordHash;
          user.save();
          res.send("password updated successfully");
        
        }
          catch(err)
          {
            res.status(400).send("ERROR : "+err.message);
          }
    
    
})
module.exports=profileRouter;