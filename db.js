import mongoose  from "mongoose";

const db = async(url)=>{
    try {
        await mongoose.connect(url);
        console.log("database connected");
    } catch (error) {
        console.log("error from database file",error);
    }
}
export default db;