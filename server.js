import express from 'express'
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

connectDB(DB_URL)

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
})