import express from "express"
import auth from "../middlewares/auth.middlewares.js";


const router = express.Router()

router.get("/",auth,(req,res)=>{
    res.status(200).json({message:"Authorised path"})
})

export {router};