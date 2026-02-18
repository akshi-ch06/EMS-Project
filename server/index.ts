import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth'
import connectToDatabase from './db/db'

connectToDatabase()
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on port ${process.env.PORT}`)
});