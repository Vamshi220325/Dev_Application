 const jwt=require("jsonwebtoken");
 const User=require("../models/user");
const userAuth=async (req,res,next)=>{
  //read the token
  try{
    
    const {token}=req.cookies;
  const decodeTheData=await jwt.verify(token,"DEV@TINDER$7822");
  const {_id}=decodeTheData;
  const user=await User.findById(_id);
  if(!user){
  throw new Error("please login");
  }
  req.user=user;
  next();
  }
  catch(err)
  {
    res.status(400).send("ERROR : "+err.message);
  }




}
module.exports={userAuth};