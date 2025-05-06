const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const User=require("../models/user");
 
const ConnectionRequest = require("../models/connectionRequest");
const userSaveInfo="firstName lastName age about skills";
userRouter.get("/user/request/received",userAuth,async (req,res)=>{

  try{
    const loggedInUser=req.user;
    const connectionRequest=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
    }).populate("fromUserId",userSaveInfo);
    res.json({
        message:"Data fecthed suuccesfully",
        data:connectionRequest
    });




  }
  catch(err)
  {
    res.send("ERROR : "+err.message);
  }


});
userRouter.get("/user/connections",userAuth,async (req,res)=>{

  try{
   const loggedInUser=req.user;
   const connectionRequest= await ConnectionRequest.find({
    $or:[
        {toUserId:loggedInUser._id,status:"accepted"},
        {fromUserId:loggedInUser._id,status:"accepted"}
    ]
   }).populate("fromUserId",userSaveInfo).populate("toUserId",userSaveInfo);
   
   const data=connectionRequest.map(row=>
   {
      if(row.fromUserId._id.toString()===loggedInUser._id.toString())
        {return row.toUserId;}
      return row.fromUserId;
   }
   
   );

   res.json({data});



  }catch(err)
  {
    res.send("ERROR : "+err.message);
  }

});
userRouter.get("/feed",userAuth,async (req,res)=>{

  try{
   const loggedInUser=req.user;
   const connectionRequests=await ConnectionRequest.find({
       $or:[
        {fromUserId:loggedInUser._id},
        {toUserId:loggedInUser._id}
       ]
   }).select("fromUserId toUserId");
   const hideFromFeed=new Set();
   connectionRequests.forEach(req=>{
    hideFromFeed.add(req.fromUserId.toString());
    hideFromFeed.add(req.toUserId.toString());

   });
   
   const users=await User.find(
    {  $and:[{ _id:{$nin: Array.from(hideFromFeed)}},
      {_id:{$ne:loggedInUser._id}}
    ]
     
    }).select(userSaveInfo);
    res.send(users);






  }
  catch(err)
  {res.status(400).send("ERROR : "+err.message);}



})

module.exports=userRouter;