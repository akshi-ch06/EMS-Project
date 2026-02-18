import dotenv from "dotenv";
dotenv.config();

import connectToDatabase from "./db/db"
import User from "./models/User"
import bcrypt from 'bcrypt'


const userRegister= async()=>{
    connectToDatabase()

    try{
        const hashPassword =await bcrypt.hash("admin", 10)

        const newUser = new User({
            name:"Admin",
            email:"admin@gmail.com",
            password: hashPassword,
            role:"admin"
        })

        await newUser.save()
        console.log("Admin user created successfully ✅")
        process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

userRegister()