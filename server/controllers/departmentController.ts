import Department from "../models/Department"
import { Request, Response } from "express"

const addDepartment =async(req: Request, res: Response)=>{
    try{
        const {dep_name, description}= req.body
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success: true, department:newDep})
    }catch(error){
        if (error instanceof Error) {
            return res.status(500).json({success:false, error:"add department server error"})
        }
    }

}

export {addDepartment}