import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
   name:{
    type:String
   },
   base64:{
    type:String
   }


});

export const Image = mongoose.model("Image", imageSchema);
