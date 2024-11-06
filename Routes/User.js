
import express from 'express';
import { Course, User } from '../Database/db.js';
import { usermiddleware } from '../Middlewares/usermiddleware.js';

const router = express.Router();

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
        const Createuser = await User.create({
            username,
            password
        });

        console.log('user is -',Createuser);
        return res.status(200).json({
            msg : "User Created"
        })

    } catch (error) {
        console.log('admin error -',error);
        return res.status(400).json({
            msg : "Signup Error"
        })
    }
})

// return all public courses 

router.get('/courses' , async function(req,res){
    try {
        const AllCourses = await Course.find({});
        console.log('allcourses -',AllCourses);

        return res.status(200).json({
               msg : "All Public Courses Fetched"
       })

    } catch (error) {
        console.log(' course fetching error -',error);
        return res.status(400).json({
            msg : "Course fetching Error"
        })
    }
})
                                                                                                                    
// Buy Specific Course 

router.post('/courses/:id' , usermiddleware , async function(req,res){
            try {
                 const CourseId = req.params.id;
                 console.log('params is -',CourseId);

                 const username = req.headers.username;

                 const CourseAdded = await User.updateOne({
                     username : username
                 },{
                    $push : {
                        purchasedcourses : CourseId
                    }
                 })

                 console.log('added -',CourseAdded);

                 return res.status(200).json({
                    msg : "Bought Specific Course"
                 })

            } catch (error) {
                console.log('buy course error -',error);
                return res.status(400).json({
                    msg : "Unable to  Buy Course"
                })
            }
})

// Show All Purchased Courses

router.get('/purchasedcourses' , usermiddleware ,  async function(req,res){
        try {

            const username = req.headers.username;
            const Usermain = await User.findOne({
                username
            });

            console.log('Purchased all courses -',Usermain?.purchasedcourses);      // get objectid's

            // fetched all details wrt to _id's 

            const allDetails = await Course.find({
                _id :  Usermain?.purchasedcourses.map(s => s._id)
            });
            console.log('detials -',allDetails);

            return res.status(200).json({
               msg : "All Purchased Course"
            })

        } catch (error) {
            console.log('all paid course error -',error);
                return res.status(400).json({
                    msg : "Paid Courses not Fetched"
                })
        }
})

export default router