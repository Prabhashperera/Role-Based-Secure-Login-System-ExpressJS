import express from 'express'
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import userRoute from './routes/userRoutes.js';

const app = express();
dotenv.config();
app.use(express.json())

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

connectDB(DB_URL)

app.use('/api/v1/' , userRoute)

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
})