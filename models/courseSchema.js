const mongoose = require('mongoose');
const courseschema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
        unique:true
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teacher'
    }
},{timestamps:true});
const Course = mongoose.model('Course',courseschema);
module.exports = Course;