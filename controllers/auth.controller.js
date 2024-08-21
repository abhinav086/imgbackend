import { User } from "../models/user.model.js"

export const Register = async(req,res)=>{
    const user = await User.find();
    
    console.log("resgiter api called",user);
    res.status(200).json({
        userCreated: true,
      });
}