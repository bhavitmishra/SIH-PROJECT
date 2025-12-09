import { Request, Response } from "express";
import { prisma } from "../db";
export default async (req : Request , res : Response)=>{
    const {instituteName ,state , city , pincode , type , levelName , levelCount , email} = req.body;
    const existing = await prisma.instituteName.findFirst({
        where : {
            name : instituteName ,
            pincode
        }
    })
    if(existing)
    {
        return res.json({
            msg : "Already registered"
        })
    }
    else {
        const institute = await prisma.instituteName.create({
            data : {
                name : instituteName , state , city , pincode , type , levelType : levelName , levels : levelCount
            }
        })

        const admin = await prisma.admin.create({
            data : {
                email , instituteId : institute.id
            }
        })
        return res.json({msg : "institute registered successfully" , admin})
    }

}