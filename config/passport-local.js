const passport = require('passport');
const teachers = require("../models/teacherSchema");
const students = require("../models/studentSchema");
const localStrategy = require('passport-local').Strategy;
passport.use('teacher',new localStrategy(
    {
        usernameField:'email'
    },
    function(email, password, done) {
        teachers.findOne({ email: email }, function (err, teacher) {
        if (err)
        { 
            console.log(err);
            return done(err);
        }
        if (!teacher) 
        {
            console.log("teacher not found"); 
            return done(null, false); 
        }
        if (!teacher||teacher.password!=password) 
        {
            console.log("Password Doesnt match");
            return done(null, false); 
        }
        return done(null, teacher);
      });
    }
));
passport.use('student',new localStrategy(
    {
        usernameField:'email',
    },
    function(email, password, done) {
        students.findOne({ email: email }, function (err, student) {
        if (err)
        { 
            console.log(err);
            return done(err);
        }
        if (!student) 
        {
            console.log("student not found"); 
            return done(null, false); 
        }
        if (!student||student.password!=password) 
        {
            console.log("Password Doesnt match of student");
            return done(null, false); 
        }
        return done(null, student);
      });
    }
));
function SessionConstructor(userId, userGroup, details) 
{
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
  }
  passport.serializeUser(function (userObject, done) 
  {
    let userGroup = "teachers";
    let userPrototype =  Object.getPrototypeOf(userObject);
    if (userPrototype === teachers.prototype) 
    {
      userGroup = "teachers";
    } 
    else if (userPrototype === students.prototype) 
    {
      userGroup = "students";
    }
    let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
    done(null,sessionConstructor);
  });
  passport.deserializeUser(function (sessionConstructor, done) 
  {
    if (sessionConstructor.userGroup == 'teachers') 
    {
        teachers.findOne({
          _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) {
          done(err, user);
      });
    } else if (sessionConstructor.userGroup == 'students') 
    {
        students.findOne({
          _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) {
          done(err, user);
      });
    }
  });
  passport.setAuthentication = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        console.log("Well its working");
        res.locals.user = req.user;
    }
    return next();
}
module.exports = passport;