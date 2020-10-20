const mongoose = require('mongoose');
const courses = new mongoose.Schema({
    course:
    {
        type:String,
        required:true
    }
});
const Course = mongoose.model('Course',courses);
module.exports = Course;