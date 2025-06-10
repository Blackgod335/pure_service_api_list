import jwt from 'jsonwebtoken';
import process from 'process';
import dotenv from 'dotenv';
dotenv.config()

const jwtVerfication = function (req,res,next){
    if(process.env.JWT_EXCEPTIONAL.includes(req.path)){
        next()
    }
    else{
        jwt.verify(req.headers.authorization,process.env.JWT_SECRET_KEY,(err,result)=>{
            if(err){
                return res.status(401).send({
                    message : "provide authorization token"
                })
            }
            else{
                req.authBody = result,
                next()
            }
        })
    }
}

export default jwtVerfication