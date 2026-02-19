import User from "../models/User"
import {Request, Response} from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const login=async(req: Request, res: Response)=>{
    try{
        const{email, password}=req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({success:false, error:"User Not Found"})
            return
        }
        const isMatch= await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(404).json({success:false, error:"Wrong Password"})
            return
        }
        const token= jwt.sign({_id: user._id, role:user.role},
            process.env.JWT_KEY!,{expiresIn: "10d"}
        )

        res.status(200).json({
            success:true,
            token,
            user:{_id:user._id, name: user.name, role:user.role}})
    }catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message })
    } else {
        res.status(500).json({ message: "Something went wrong" })
    }
}

}
const verify =(req: Request, res: Response)=>{
    return res.status(200).json({success: true, user: User})
}
export{login, verify}