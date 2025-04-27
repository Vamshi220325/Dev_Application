const express=require("express");

const app=express();
app.get("/u(s)?er",(req,res)=>{
    res.send({firstname:"vamshi",lastname:"yenaganti"})
});




app.listen(3000,()=>{console.log("server is successfully listening on port 3000")});