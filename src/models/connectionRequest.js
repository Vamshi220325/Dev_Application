const mongoose=require("mongoose");
// const User=require("./user");
const connectionRequestSchema=new mongoose.Schema(
    {
       fromUserId:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        reuired:true,
        
       },
       toUserId:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        reuired:true
       },
       status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
       }




    },{timestamps:true,}
);
connectionRequestSchema.index({fromUserId:1,toUserId:1});
// connectionRequestSchema.pre("save",function(next){
//     const connectionRequest=this;
//     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
//     {throw new Error("cannot send request to yourself");}
// });
const ConnectionRequest=new mongoose.model("connectionRequestModel",connectionRequestSchema);
module.exports=ConnectionRequest;