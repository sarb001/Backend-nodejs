
import express from 'express';
import { Admin, Course } from '../Database/db.js';
import { adminmiddleware } from '../Middlewares/adminmiddleware.js';

const router = express.Router();

// create account now

router.post('/signup' , async function(req,res){
    try {
        const username = req.body.username;
        const password = req.body.password;

        console.log('username | pass -',username,password);

        if(!username || !password){
            return res.status(400).json({
                msg : "Invalid Credentails"
            })
        }
        
        const Createuser = await Admin.create({
            username,
            password
        });

        console.log('user is -',Createuser);
        return res.status(200).json({
            msg : "Admin Created"
        })

    } catch (error) {
        console.log('admin error -',error);
        return res.status(400).json({
            msg : "Signup Error"
        })
    }
})

// create course Admin Only

router.post('/courses' , adminmiddleware , async function(req,res){
        try {

            const Title = req.body.title;
            const Description = req.body.description;
            const Price = req.body.price;

            console.log('T|d|P- ',Title,Description,Price);

            if(!Title || !Description || !Price){
                return res.status(400).json({
                    msg : "Invalid Credentails"
                })
            }
        
            const CreateCourse = await Course.create({
                title : Title,
                description : Description,
                price : Price,
                image : "https://beebom.com/wp-content/uploads/2024/06/Apple-AI.jpg"
            });

            console.log('course created -',CreateCourse);
            
            return res.status(200).json({
                id : CreateCourse?._id,
                msg : "Course Created Successfully"
            })

        } catch (error) {
            console.log('creation course error -',error);
            return res.status(400).json({
                msg : "Course Error"
            })
        }
});

// get all Courses

router.get('/courses' ,adminmiddleware , async function(req,res){
        try {   

         const AllCourses =   await Course.find({});
         console.log('allcourses -',AllCourses);

         return res.status(200).json({
                msg : "All Courses Fetched"
        })

        } catch (error) {
            console.log('admin error -',error);
            return res.status(400).json({
                msg : "All Courses Error"
            })
        }
})

export default router;