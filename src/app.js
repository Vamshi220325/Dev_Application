const express=require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
app.use(express.json());
app.post("/pushUser",async (req,res)=>{
    const user=new User(req.body);
    try{
        await user.save();
        res.send(" user added");
    }
    catch(err)
    {
        res.status(404).send("something went wrong");
    }
 
});




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


