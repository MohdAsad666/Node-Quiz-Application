const courses = require('../models/courseSchema');
const quizes = require('../models/quizSchema');
module.exports.courses = function(req,res)
{
        courses.find({},function(err,course){
            return res.render('courses.ejs',{course:course});
        });
}
module.exports.courseProfile = function(req,res)
{
    // let quiz = quizes.find({});
    courses.findById(req.params.id,function(err,course) 
    {
        if(err)
        {
            console.log("Well there is error in finding the course");
            return res.redirect('/teacher/courses');
        }
        if(!course)
        {
            console.log("Course not found");
            return res.redirect('/teacher/courses');
        }
        if(course)
        {
            quizes.find({},function(err,quiz)
            {
                if(err)
                {
                    console.log("Error in fetching QUizes :: ",err);
                    return res.redirect('back');
                }
                else
                {
                    res.render('courseQuiz.ejs',{course:course,quiz:quiz});
                }
            })
            
        }
    });
}
module.exports.addcourses = function(req,res)
{
    courses.findOne({name:req.body.name},function(err,name)
    {
        if(name)
        {
            console.log("Course exist Try Making another");
            return res.redirect('/teacher/courses');
        }
        else if(!name)
        {
            // console.log(req.user.name);
            courses.create({
                name:req.body.name,
                teacher:req.user._id
            },function(err,course)
            {
                if(err)
                {
                    console.log("Error Occured in adding course :: ",err);
                    return res.redirect('/teacher/courses');;
                }
                console.log(course);
                return res.redirect('/teacher/courses');
            });
        }
    });
}
module.exports.deleteCourse = function(req,res)
{
    courses.findById(req.params.id,function(err,course)
    {
        console.log(course);
        if(err)
        {
            console.log("Error in deleting course :: ",err);
        }
        if(course.teacher == req.user.id)
        {
            course.remove();
        }
        return res.redirect('back');
    });
}
