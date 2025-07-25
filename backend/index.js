import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
import path from 'path';
dotenv.config({});

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'];
const corsOption={
  origin: 'https://talkie-completed-fe.onrender.com', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],

};
app.use(cors(corsOption)); 

app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));

app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});

