const express = require('express');
var bodyParser = require('body-parser');
const multer = require ('multer')

const route = require('./route/route.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://ratneshnath:RATNESh99@cluster0.x9keh.mongodb.net/myFirst-1?retryWrites=true&w=majority",{useNewUrlParser: true}) //{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
.then(() => console.log('mongodb running on 8080'))
.catch(err => console.log(err))

app.use('/', route);



app.listen(process.env.PORT || 8080, function() {
	console.log('Express app running on port ' + (process.env.PORT || 8080))
});