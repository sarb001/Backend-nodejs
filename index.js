import express from 'express' ;
import dotenv from 'dotenv';
import { dbconnection } from './Database/db.js';
import AdminRouter from './Routes/Admin.js';
import UserRouter from './Routes/User.js';
const app  = express();
const PORT = 3000;

const router = express.Router();

dotenv.config();
app.use(express.json());
dbconnection();

app.use('/admin',AdminRouter);
app.use('/user',UserRouter);


app.listen(PORT , () => {
    console.log(` Server is Running on ${PORT} here `);
})