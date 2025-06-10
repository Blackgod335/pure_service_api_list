import express from 'express';

import {fetchData} from '../controller/fetch.js';

const router = express.Router()

router.get('/show',async(req,res)=>{
    fetchData(req)
    .then((result)=>{
        if(!result){
            res.status(501).send(result)
        }
        else{
            res.status(200).send(result)
        }
    })
    .catch(err => res.status(500).send({
        message : err.message
    }))
})

export default router