import mongoose from "mongoose";


export const conn  = async () : Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URI || "");
        console.log("Database connection succesfully");
    } catch (error) {
        console.log(error);
    }
}