const express=require("express");

const app=express();
app.get("/user",(req,res)=>{
    res.send({firstname:"vamshi",lastname:"yenaganti"})
});

app.post("/user",(req,res)=>{
    //data is saved to DB
    res.send("data successfully saved");
});
app.delete("/user",(req,res)=>{
    //data is deleted from db
    res.send("data is deleted from db");
});


app.listen(3000,()=>{console.log("server is successfully listening on port 3000")});