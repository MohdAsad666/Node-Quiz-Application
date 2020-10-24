const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    question:
    {
        type:String,
        required:true,
        unique:true
    },
    option1:
    {
        type:String,
        required:true,
        unique:true
    },
    option2:
    {
        type:String,
        required:true,
        unique:true
    },
    option3:
    {
        type:String,
        required:true,
        unique:true
    },
    option4:
    {
        type:String,
        required:true,
        unique:true
    },
    course:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }
},{timestamps:true});

const QuesAns = mongoose.model('QuesAns',questionSchema);
module.exports = QuesAns;