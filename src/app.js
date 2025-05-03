const express=require("express");
const connectDB=require("./config/database");
const app=express();
// const User=require("./models/user");
// const {validateSignUpData}=require("./utilis/validations");
// // const bcrypt=require("bcrypt");
const cookiesParser=require('cookie-parser');
// const jwt=require("jsonwebtoken");
// const {userAuth}=require("./middlewares/auth");
app.use(express.json());
app.use(cookiesParser());


const {authRouter}=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB()
.then(()=>{
    console.log("DB connected successfully");
    app.listen(3000,()=>{console.log("server is successfully listening on port 3000!!")});
})
.catch((err)=>{
    console.log("error is occured that is",err);
});


