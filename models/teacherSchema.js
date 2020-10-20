const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
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
    }
},{timestamps:true});

const teacher = mongoose.model('teacher',teacherSchema);
module.exports = teacher;