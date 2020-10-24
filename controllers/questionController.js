const question = require('../models/QuestionShema');
const course = require('../models/courseSchema');
module.exports.questionPage = function(req,res)
{
    return res.render('questionPage.ejs',{course:req.params.id});
}