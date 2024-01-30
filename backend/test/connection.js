const mongoose = require('mongoose');

//connect to mongodb

mongoose.connect("mongodb://127.0.0.1/NutriTech");


mongoose.connection.once('open',function(){
    console.log('Connected to the database..')
}).on('error',function(error){
    console.log('Connection error:',error);
});


