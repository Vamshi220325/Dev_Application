const mongoose=require("mongoose");

const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://Vamshi123:orKcgWuNDmmbgmZi@cluster0.qkwvz.mongodb.net/devTinder");
};
//mongodb+srv://Vamshi123:<db_password>@cluster0.qkwvz.mongodb.net/
module.exports=connectDB;
// connectDB()
// .then(()=>{
//     console.log("connected successfully");
// })
// .catch((err)=>{
//     console.log("error is occured that is",err);
// });
//IdtNttryDRxVESOH