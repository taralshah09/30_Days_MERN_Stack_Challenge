import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    googleId:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
    },
    profilePicture:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        default:"Hey there, welcome to my profile",
    }

}) 

export const User = mongoose.model("User",userSchema);