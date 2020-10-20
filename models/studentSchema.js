const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    score:
    {
        type:Number
    }
},{timestamps:true});

const student = mongoose.model('student',studentSchema);
module.exports = student;