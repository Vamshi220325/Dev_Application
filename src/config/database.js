const mongoose=require("mongoose");

const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://vamshi22:Vamshi22@cluster0.qkwvz.mongodb.net/dev");
};

module.exports=connectDB;
// connectDB()
// .then(()=>{
//     console.log("connected successfully");
// })
// .catch((err)=>{
//     console.log("error is occured that is",err);
// });
