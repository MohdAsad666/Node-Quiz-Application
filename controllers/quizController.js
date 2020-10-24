const quizes = require('../models/quizSchema');
const teachers = require('../models/teacherSchema');
module.exports.addQuiz = function(req,res)
{
    if(req.isAuthenticated())
    {
        teachers.findById(req.user.id,function(err,teacher)
        {
            if(err)
            {
                console.log("Eror in opening page please try again");
                return res.redirect('back');
            }
            if(!teacher)
            {
                console.log("Only Teacher has Permission to alter Quiz");
                return res.redirect('back');
            }
            if(teacher)
            {
                quizes.findOne({quizname:req.body.quizname},function(err,quiz)
                {
                    if(err)
                    {
                        console.log("Error in Adding Quiz");
                    }
                    if(quiz)
                    {
                        console.log("Quiz Exist try another name ");
                    }
                    if(!quiz)
                    {
                        quizes.create({
                            quizname:req.body.quizname,
                            teacher:req.user._id
                            },function(err,quiz){
                                if(err)
                                {
                                    console.log("Error in addding Quiz",err); 
                                }
                                else
                                {
                                    console.log(quiz);
                                }
                            });
                    }
                    return res.redirect('back');
                })
            }
        });
    }
    else
    {
        return res.redirect('/teacher/login');
    }
}
module.exports.deletequiz = function(req,res)
{
    if(req.isAuthenticated())
    {
        quizes.findById(req.params.id,function(err,quiz){
            if(err)
            {
                console.log("Error in deleting the Course :: ",err);
            }
            else
            {
                if(quiz.teacher == req.user.id)
                {
                    quiz.remove();
                }
            }
            return res.redirect('back');
        })
    }
    else
    {
        return res.redirect('/teacher/login');
    }
}