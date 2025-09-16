import dotenv from "dotenv";
import { app } from "./app.js";

import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
});




connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 8000,()=>{
        console.log(`Server started on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.error("Monogodb connection failed !! ",error);
})





















/*
import express from "express";
const app=express();
(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB");
        app.on("error",(error)=>{
            console.error("Error",error);
            throw error;
        }) 
        app.listen(process.env.PORT,()=>{
            console.log(`Server started on port ${process.env.PORT}`);          

        })
    }catch(err){
        console.error("Error connecting to MongoDB", err);
        throw err;
    }
})()
*/