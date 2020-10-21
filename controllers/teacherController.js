const teachers = require('../models/teacherSchema');
const students = require('../models/studentSchema');
const courses = require('../models/courseSchema');
module.exports.signup = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    else
    {
        return res.render('teachersignup.ejs');
    }
}
module.exports.login = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    else
    {
        return res.render('teacherlogin.ejs');
    }
    
}
module.exports.courses = function(req,res)
{
        courses.find({},function(err,course){
            return res.render('courses.ejs',{course:course});
        });
}
module.exports.courseProfile = function(req,res)
{
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
            res.render('courseQuiz.ejs',{course:course});
        }
    });
}
module.exports.create = function(req,res)
{
    students.findOne({email:req.body.email},function(err,student){
        if(student)
        {
            console.log("Following Id is exist as that of student :: ",student);
            return res.redirect("/teacher/signup");
        }
        if(!student)
        {
            teachers.findOne({email:req.body.email},function(err,teacher)
    {
        if(teacher)
        {
            console.log("Account exist try Loggin in");
            return res.redirect('/teacher/login');
        }
        if(req.body.password!=req.body.confirm_password)
        {
            console.log("Password doesn't match :: Try again");
            return res.redirect('/teacher/login');
        }
        if(!teacher)
        {
            teachers.create(req.body,function(err)
            {
                if(err)
                {
                    console.log("Try Signing in Again");
                    return;
                }
                console.log("Account created");
                return res.redirect('/');
            });
        }
    });
        }
    });
    
}
module.exports.signin = function(req,res)
{
    return res.redirect('/');
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
            courses.create({
                name:req.body.name},function(err,course)
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