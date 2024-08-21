import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    sex:{
        type:String,
    },
    age:{
        type:Number,
    },
    mobile:{
        type:Number,
    },
    premium:{
        type:Boolean,
    },
    photos:[],
});
export const User = mongoose.model("user",userSchema);