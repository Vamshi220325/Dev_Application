const express=require("express");

const app=express();
const {userAuth}=require("./middlewares/auth");
app.get("/admin/login",(req,res)=>{
    res.send("succesfully logged");
})
app.use("/admin",userAuth);
app.get("/admin/getData",(req,res,next)=>
{
    res.send("data is send!!");
});
app.get("/admin/editData",(req,res,next)=>
    {
        res.send("Edited data successfully!!");
    });

app.listen(3000,()=>{console.log("server is successfully listening on port 3000!!")});