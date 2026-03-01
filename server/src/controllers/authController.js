import {findUserByMail, createUser, findUserById } from "../models/userModel.js";
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
            return res.status(400).json({error:'User not found, Please register first and then try signing in'});

        //compare the password
        const matchedPassword=await bcrypt.compare(password,user.password_hash)
        if(!matchedPassword)
            return res.status(401).json({error:'Invalid credentials'});

        //generate a token
        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'1d'});

        //store a token as a cookie
        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            maxAge:1*24*60*60
        })
        return res.json({message:'Login Successful',token,user:{id:user.id,username:user.username}})
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

const getProfile=async(req,res)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({error:'Not Authenticated'});
        }

        const user=await findUserById(userId);
        if(!user){
            return res.status(404).json({error:'User not found'});
        }
        res.json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Server error'});
    }
}



export {registerUser,login,logout,getProfile}