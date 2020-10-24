const teacher = require('../models/teacherSchema');
const student = require('../models/studentSchema');
const { localsName } = require('ejs');

module.exports.homePage = function(req,res)
{
    return res.render('homepage.ejs');
}

module.exports.login = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    {
        res.render('login.ejs');
    }
}
module.exports.logout = function(req,res)
{
    req.logout();
    return res.redirect('/');
}