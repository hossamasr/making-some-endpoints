import express from "express"
import { login, register } from "../services/userServices"
import bcrypt from "bcrypt"

const router=express.Router()

router.post('/register',async (req,res)=>{
    const {firstName,lastName,email,password}=req.body
    const hashed_password=await bcrypt.hash(password,10)
    const result =await register({firstName,lastName,email,password:hashed_password})
    res.status(result.statusCode).send(result.data)
})

router.post('/login',async (req,res)=>{
    const {email,password}=req.body
    const result =await login({email,password})
    res.status(result.statusCode).send(result.data)
})


export default router