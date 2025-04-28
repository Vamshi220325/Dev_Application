const express=require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
app.post("/signup",async (req,res)=>{
    const user=new User({
        firstName:"dhoni",
        lastName:"mahendra singh",
        emailId:"mahi@gmail.com",
        password:"mahi777"
    });
    await user.save();
    res.send("user added succesfully");
});

// app.listen(3000,()=>{console.log("server is successfully listening on port 3000!!")});

connectDB()
.then(()=>{
    console.log("DB connected successfully");
    app.listen(3000,()=>{console.log("server is successfully listening on port 3000!!")});
})
.catch((err)=>{
    console.log("error is occured that is",err);
});


