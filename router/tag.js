import express from 'express';

import {createTag, getTagsList} from '../controller/tag.js';

const router = express.Router();

router.post('/createtag',async(req,res)=>{
    createTag(req)
    .then((result)=>{
        if(result){
            res.status(201).send(result)
        }
        else{
            res.status(500).send(result)
        }
    })
    .catch(err => res.status(500).send({
        message : err.message
    }))
})

router.get('/gettags', async(req,res)=>{
    getTagsList(req)
   .then((result)=>{
        if(result){
            res.status(200).send(result)
        }
        else{
            res.status(500).send(result)
        }
    })
    .catch(err => res.status(500).send({
        message : err.message
    }))})

export default router