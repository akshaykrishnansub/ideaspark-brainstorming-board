import {findUserByMail, createUser } from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const registerUser=async(req,res)=>{
    const {username,password}=req.body;
    try{
        //check if user exists
        const existingUser=await findUserByMail(username);
        if(existingUser)
            return res.status(400).json({error:'User already Registered'});

        //hash the password
        const hashedPassword=await bcrypt.hash(password,10);

        //Insert the new user
        const newUser=await createUser(username,hashedPassword);

        //generate the token
        const token=jwt.sign({id:newUser.id},process.env.JWT_SECRET,{expiresIn:'1h'})

        //return the success message
        return res.status(201).json({message:'User Registered Successfully',token})
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server error'});
    }
}

export default registerUser