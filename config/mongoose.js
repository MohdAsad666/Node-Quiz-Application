const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/Quiz");
const db = mongoose.connection;

db.on('error',console.error.bind("Error in connecting to DataBase"));

db.once('open',function(err)
{
    if(err)
    {
        console.log("error is connecting to DB");
    }
    else
    {
        console.log("Connected to DB and up and running");
    }
});

module.exports = db;