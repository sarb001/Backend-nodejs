import express from 'express';
import { Admin, User } from '../Database/db.js';


export const usermiddleware = async(req,res,next) => {
    try {

        const Username  = req.headers.username;
        const Password  = req.headers.password;
        console.log('header User | Pass -',Username,Password);

        if(!Username || !Password){
            return res.status(400).json({
                msg : "User not Logged In "
            })
        }    
        const checkUserExists = await User.findOne({username : Username});
        console.log('user exists -',checkUserExists);

        if(!checkUserExists){
            return res.status(400).json({
                msg : "User Doesn't Exist"
            })
        }

        next();

    } catch (error) {
        console.log(' user middle error -',error);
            return res.status(400).json({
                msg : "Only User Authorized"
        })
    }
}