var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var autoIncrement = require('mongoose-auto-increment');
var app = express();
var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth');

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use(express.static(__dirname + '/client'));
require('./app/routes')(app, passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var db = mongoose.connect('mongodb://localhost/takeABreak');

autoIncrement.initialize(db);

User = require('./BackEnd/models/users.js');
Break = require('./BackEnd/models/breaks.js');

app.listen(8000);
module.exports = app;
