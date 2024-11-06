import express from 'express';
import { Admin } from '../Database/db.js';


export const adminmiddleware = async(req,res,next) => {
    try {

        const Username  = req.headers.username;
        const Password  = req.headers.password;
        console.log('header User | Pass -',Username,Password);

        if(!Username || !Password){
            return res.status(400).json({
                msg : "User not Logged In "
            })
        }    

        const checkAdminExists = await Admin.findOne({username : Username});
        console.log('admin exists -',checkAdminExists);

        if(!checkAdminExists){
            return res.status(400).json({
                msg : "Admin Doesn't Exist"
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