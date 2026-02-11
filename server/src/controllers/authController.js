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

const login=async(req,res)=>{
    //extract data from the user
    const {username,password}=req.body;
    try{
        //find user by email
        const user=await findUserByMail(username);
        if(!user)
            return res.status(400).json({error:'User not found'});

        //compare the password
        const matchedPassword=await bcrypt.compare(password,user.password_hash)
        if(!matchedPassword)
            return res.status(401).json({error:'Invalid credentials'});

        //generate a token
        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'1h'});

        //store a token as a cookie
        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            maxAge:3600000
        })
        return res.json({message:'Login Successful',token})
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server error'})
    }
}

const logout=(req,res)=>{
    try{
        //if your JWT is stored in cookies
        res.clearCookie('token',{
            path:"/",
            httpOnly:true,
            secure:false
        })
        res.json({message:'Logged out successfully'});
    }catch(err){
        console.error(err);
        return res.status(500).json({error:'Server error during logout'})
    }
}



export {registerUser,login,logout}