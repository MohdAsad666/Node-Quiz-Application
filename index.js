const express = require('express');
const app = express();
const port = 8000;

app.listen(port,function(err){
    if(err)
    {
        console.log("Error in ffiring Up server");
        return;
    }
    console.log(`Server is running fine on port:: ${port}`);
});