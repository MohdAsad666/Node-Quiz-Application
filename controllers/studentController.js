const teachers = require('../models/teacherSchema');
const students = require('../models/studentSchema');
module.exports.signup = function(req,res)
{
    return res.render('studentsignup.ejs');
}
module.exports.login = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    else
    {
        return res.render('studentlogin.ejs');
    }
}
module.exports.create = function(req,res)
{
    teachers.findOne({email:req.body.email},function(err,teacher)
    {
        if(err)
        {
            console.log("Error is :: ",err);
            return;
        }
        if(teacher)
        {
            console.log("Following Id is exist as that of teacher :: ",teacher);
            return res.redirect('/student/signup');
        }
        if(!teacher)
        {
            students.findOne({email:req.body.email},function(err,student)
        {
            if(student)
            {
                console.log("Account exist try Loggin in");
                return res.redirect('/student/login');
            }
            if(req.body.password!=req.body.confirm_password)
            {
                console.log("Password doesn't match :: Try again");
                return res.redirect('/student/login');
            }
            if(!student)
            {
                students.create(req.body,function(err)
                {
                    if(err)
                    {
                        console.log("Try Signing in Again");
                        return;
                    }
                    console.log("Account created");
                    return res.redirect('/');
                })
            }
        });
        }
    });
    
}
module.exports.signin = function(req,res)
{
    return res.redirect('/');
}