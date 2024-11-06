import express from 'express';
import { Admin } from '../Database/db.js';
import jwt from 'jsonwebtoken' ;


export const adminmiddleware = async(req,res,next) => {
    try {
        // const Username  = req.headers.username;
        // const Password  = req.headers.password;
        // console.log('header User | Pass -',Username,Password);

        // if(!Username || !Password){
        //     return res.status(400).json({
        //         msg : "User not Logged In "
        //     })
        // }    

        // const checkAdminExists = await Admin.findOne({username : Username});
        // console.log('admin exists -',checkAdminExists);

        // if(!checkAdminExists){
        //     return res.status(400).json({
        //         msg : "Admin Doesn't Exist"
        //     })
        // }
        // next();


            // With Token --

        // const Token = req.headers.authorization;            // For Putting token manually 
        // console.log('token -',Token);

        // const VerifiedToken = jwt.verify(Token,process.env.JwtSecret);
        // console.log('token is -',VerifiedToken);

        // if(!VerifiedToken){
        //     return res.status(400).json({
        //         msg : " Logged in Error "
        //     })
        // }
        // next();

             // With  Bearer Token  

             
        const MainToken = req.headers.authorization || req.headers.Authorization;            
        console.log('token -',MainToken);
        
        const Token = MainToken.split(" ")[1];
        console.log('token -',Token);

        const VerifiedToken = jwt.verify(Token,process.env.JwtSecret);
        console.log('token is -',VerifiedToken);

        if(!VerifiedToken){
            return res.status(403).json({
                msg : "You are not authenticated"
            })
        }
        next();


    } catch (error) {
        console.log(' admin middle error -',error);
            return res.status(400).json({
                msg : "Only Admin Authorized"
        })
    }
}

// do same for user middleware -> verify and allow next()