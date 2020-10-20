const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./config/mongoose");
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', './views');
app.use('/',require('./routers'));
app.listen(port,function(err){
    if(err)
    {
        console.log("Error in ffiring Up server");
        return;
    }
    console.log(`Server is running fine on port:: ${port}`);
});
