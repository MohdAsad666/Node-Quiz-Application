const teachers = require('../models/teacherSchema');
const students = require('../models/studentSchema');

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
