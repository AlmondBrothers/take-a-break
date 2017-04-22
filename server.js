const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const autoIncrement = require('mongoose-auto-increment');
const passport = require('passport');
const path = require('path');

const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'client')));
require('./config/passport')(passport);
require('./app/routes')(app, passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mongoose.connect('mongodb://localhost/takeABreak');

autoIncrement.initialize(db);

app.listen(8000);
module.exports = app;
