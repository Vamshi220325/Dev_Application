const express=require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
const {validateSignUpData}=require("./utilis/validations");
const bcrypt=require("bcrypt");
const cookiesParser=require('cookie-parser');
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth");
app.use(express.json());
app.use(cookiesParser());

app.post("/signup",async (req,res)=>{

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

app.post("/login",async (req,res)=>{
    try{  const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordvalid=await bcrypt.compare(password,user.password);
    if(isPasswordvalid)
    {
        const token=await jwt.sign({_id:user._id},"DEV@TINDER$7822",{expiresIn:"7d"});
        console.log(token);
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
app.get("/profile", userAuth,async (req,res)=>{
    try{const user=req.user;
     res.send(user);}
        
       catch(err)
       {
        res.send("Error : " + err.message);}

});
app.post("/sendConnection",userAuth,async (req,res)=>{
    try{
        const user=req.user;
        res.send(user.firstName +" sent a request to you");
    }
    catch(err)
    {
        res.status(400).send("ERROR : "+err.message);
    }
   

})





// })

// app.listen(3000,()=>{console.log("server is successfully listening on port 3000!!")});

connectDB()
.then(()=>{
    console.log("DB connected successfully");
    app.listen(3000,()=>{console.log("server is successfully listening on port 3000!!")});
})
.catch((err)=>{
    console.log("error is occured that is",err);
});


