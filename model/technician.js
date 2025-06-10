import mongoose from "mongoose";

const Schema = mongoose.Schema

const technicianSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    mobile : {type : Number},
    email : {type: String, required: true, unique: true},
    address :[
        {street : String, 
        city : String,
        state : String,
        zipCode : String}
    ],
    role : {
        type : String,
        enum : ['TEMPORARY','JUNIOR', 'SENIOR'],
        default : 'TEMPORARY'
    },
    createrId : {type : Schema.Types.ObjectId, ref : "customer"}
},{
    timestamps : true,
    versionKey : false
})

const techni = mongoose.model('technician', technicianSchema)

export default techni