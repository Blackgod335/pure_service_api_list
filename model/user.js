import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    mobile : Number,
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    address :[
        {street : String, 
        city : String,
        state : String,
        zipCode : String}
    ]
},{
    timestamps : true,
    versionKey : false
})

const verifyEmailSchmea = new mongoose.Schema({
    email : {type : String, required: true},
    code : {type : String, required: true},
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 300
    }
})

const user = mongoose.model('user', userSchema)

export const verfiyemailModel = mongoose.model('verfiyCode', verifyEmailSchmea)

export default user