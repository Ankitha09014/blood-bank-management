const express =require('express');
const dotenv=require('dotenv');
const colors=require('colors');
const morgan=require('morgan');
const cors=require('cors');
const connectDB = require('./config/db');
dotenv.config();

connectDB();
//rest object
const app=express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
//routes
app.use('/api/v1/test',require('./routes/testroute'));
app.use('/api/v1/auth',require('./routes/authroutes'));
app.use('/api/v1/inventory',require('./routes/inventoryRoutes'));
const PORT=process.env.PORT || 8080;
app.listen(PORT,( )=>{
    console.log(
        `Node Server Running in mode${process.env.DEV_MODE}MODE ON PORT ${process.env.PORT}`
         .bgBlue.white
        );
});