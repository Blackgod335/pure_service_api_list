import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import process from 'process';

import router from './router.js'
import commonfunction from './common/common_function.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const mongodb = process.env.MONGO_URL


mongoose.connect(mongodb)
.then(()=>{
    console.log('Database conneted successfully');
})
.catch(err => console.log(`DataBase Error: ${err}`))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api',commonfunction,router)

app.listen(port,commonfunction,(err)=>{
    if(err) console.log(err);
    console.log(`Server Running successfully ${port}`)
})

