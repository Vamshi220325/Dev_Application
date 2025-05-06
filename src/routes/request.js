const express=require("express");
const ConnectionRequest=require("../models/connectionRequest");
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const User=require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    try{

      const fromUserId=req.user._id;
      const toUserId=req.params.toUserId;
      const status=req.params.status;
      const allowedStatus=["ignored","interested"];
      if(!allowedStatus.includes(status))
      {
        throw new Error("Invalid Status");
      }
      
      
      const connectionRequest=new ConnectionRequest(
        {fromUserId,toUserId,status}
      );
      const existingConnectionRequest=await ConnectionRequest.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
      });
      if(existingConnectionRequest)
        {throw new Error("connection already sent");}
      const toUser=await User.findById(toUserId);
      if(!toUser){
        throw new Error("to user doesnt exist");
      }
      if(fromUserId==toUserId){throw new Error("cannot send request to yourself");
      }
      const data=await connectionRequest.save();
      const user=req.user;
      res.send(`${user.firstName} is ${status} in ${toUser.firstName}`);


        
    }
    catch(err)
    {
        res.status(400).send("ERROR : "+err.message);
    }
   

});
requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
    
    try{
        const loggedInUserId=req.user;
      const {status,requestId}=req.params;
      const allowedStatus=["accepted","rejected"];
    
      if(!allowedStatus.includes(status))
      {
        throw new Error("status is not valid");
      }
      const connectionRequest=await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUserId,
        status:"interested"
      });
      if(!connectionRequest)
      {
        throw new Error("connection request not found");
      }

      connectionRequest.status=status;
      const data=await connectionRequest.save();
      const tempUser=ConnectionRequest.findOne({})
      res.json({
        message:` you ${status } the request of successfully`,
        data
      });



    }
    catch(err){
        res.send("ERROR : "+err.message);
    }




})
module.exports=requestRouter;