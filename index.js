const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const passport = require('passport');
const teacherPassport = require('./config/passport-local');
// const studentPassport = require('./config/student-passport-local');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require("./config/mongoose");
const ejs = require('ejs');
const MongoStore = require('connect-mongo')(session);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(cookieParser());
app.set('views', './views');
app.use(session({
    name:"navigus assignment",
    secret:"MadeByAsad",
    resave:false,
    cookie:{
        maxAge:1000*60*10
    },
    store: new MongoStore({mongooseConnection: db,autoRemove:'disabled'},function(err){
        if(err)
        {
            console.log("Error in storing userSession ::",err);
        }
        console.log("Connected to mongo store");
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
app.use('/',require('./routers'));
app.listen(port,function(err){
    if(err)
    {
        console.log("Error in ffiring Up server");
        return;
    }
    console.log(`Server is running fine on port:: ${port}`);
});
