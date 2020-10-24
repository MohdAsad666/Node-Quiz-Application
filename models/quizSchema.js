const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
    quizname:{
        type:String,
        required:true,
        unique:true
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    }
},{timestamps:true});

const QuizName = mongoose.model('QuizName',quizSchema);
module.exports = QuizName;