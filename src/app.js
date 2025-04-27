const express=require("express");

const app=express();
app.use("/solve",(req,res)=>{res.send("solve question here!!");});
app.use("/webpage",(req,res)=>{res.send("this is your beautiful webpage!!");});
app.use("/test",(req,res)=>{res.send("test your code here!!");});
app.use((req,res)=>{res.send("hello from server!!");});


app.listen(3000,()=>{console.log("server is successfully listening on port 3000")});