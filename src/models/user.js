const mongoose=require("mongoose");

const userSchema=mongoose.Schema(
    {
        firstName:
        {type:String,
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
        }
    },{timestamps:true,});
    const User=mongoose.model("user",userSchema);
    module.exports=User;