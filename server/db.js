import mongoose from "mongoose";


export default async function connection() {
    try {
        await mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log("connected to database");
    } catch (error) {
        console.log(error);
    }
};