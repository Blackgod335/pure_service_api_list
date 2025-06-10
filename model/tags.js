import mongoose from "mongoose";

const tagSchmea = new mongoose.Schema({
    tagName : {type : String, required : true, unique : true}
},{
    versionKey : false
})

const tagModel = mongoose.model('customerTag', tagSchmea);

export default tagModel;