import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';

//Generate JWT token
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'7d',
    })
}

//Api to register the user
export const registerUser = async(req,res) =>{
    const {name,email,password} = req.body;
    try{
        //Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({message:"User already exists"});
        }
        const newUser = await User.create({name,email,password});

        const token = generateToken(newUser._id);
        
        res.status(201).json({success:true,token});
    }
    catch(error){
        res.status(500).json({message:"error registering user", error:error.message});
    }
}


//Api to Login the user
export const loginUser = async(req , res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            const isPasswordCorrect = await bcrypt.compare(password,user.password);
            if(isPasswordCorrect){
                const token = generateToken(user._id);
                return res.json({success:true,token});
            }
        }
        return res.json({success:false,message:"Invalid email or password"});
    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
}


//Api tp get User details
export const getUser=async(req,res)=>{
    try{
        const user = req.user;
        return res.json({success:true,user});
    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
}