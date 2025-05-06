const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=mongoose.Schema(
    {  newPassword:{type:String},
        firstName:
        {type:String,
            ref:"User",
            required:true,
            maxLength:50,
            minLength:4

        },
        lastName:{type:String},
        emailId:{type:String,
            unique:true,
            trim:true,
            required:true
        },
        password:{type:String,
            required:true
        },
        age:{type:Number,
            min:18
        },
        gender:{type:String,
            validate(value){
                if(!["male","female","others"].includes(value))
                {throw new Error("gender is not valid");}
            }
        },
        skills:{
            type:[]
        }
    },{timestamps:true,});

    userSchema.methods.JWT=async function(){
        const user=this;

      const token=await jwt.sign({_id:user._id},"DEV@TINDER$7822",{expiresIn:"7d"});
        
        return token;


    };
    userSchema.methods.ValidatePassword=async function(password){
    const user=this;
    const isPasswordvalid=await bcrypt.compare(password,user.password);
    return isPasswordvalid;
    }

    const User=mongoose.model("user",userSchema);
    module.exports=User;