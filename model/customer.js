import mongoose from "mongoose";

const Schema = mongoose.Schema

const customerSchmea = new mongoose.Schema({
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
    ],
    createrId : {type :Schema.Types.ObjectId, ref : "user"},
    tagId : {type : Schema.Types.ObjectId, default: null}
},{
    timestamps : true,
    versionKey : false
})

const customer = mongoose.model('Customer', customerSchmea)

export default customer