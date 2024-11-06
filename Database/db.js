import mongoose ,{ Schema }  from "mongoose";

export const  dbconnection   = () => {
    try {
        const db = mongoose.connect(process.env.DATABASE_URL, {
            dbName : 'course-website'
        }).then(con => console.log('Db  name is -',con.connection.name));

    } catch (error) {
        console.log('error is -',error);       
    }
}


// --- admin 
//-> _id, username , password , create-course ( use course--schema to create  ) 


const AdminSchema = new Schema({
     username : {
        type : String,
        unique : true,
        required : true
     },
     password : {
        type : String,
        unique : true,
        required : true
     },
 })

 
// --- user 
//-> _id , username , password , coursepurchased  ( put course-schema id here ) , viewallcourse


const UserSchema = new Schema({
    username : {
       type : String,
       unique : true,
       required : true
    },
    password : {
       type : String,
       unique : true,
       required : true
    },
    purchasedcourses : [{
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'Course'      // const Course (79)
    }]
})

const CourseSchema = new Schema({
        title : String,
        description : String,
        price : String,
        image : String,
})


export const Admin = mongoose.model('AdminTable',AdminSchema);
export const User = mongoose.model('UserTable',UserSchema);
export const Course = mongoose.model('CourseSchemaTable',CourseSchema);




