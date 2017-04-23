const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const autoIncrement = require('mongoose-auto-increment');
const passport = require('passport');
const path = require('path');

const app = express();
const uri = process.env.MONGODB_URI;

const db = mongoose.connect(uri);

autoIncrement.initialize(db);
require('./server/models/breaks');

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/app')));

const Break = require('./server/models/breaks');
require('./config/passport')(passport);
require('./server/routes')(app, passport, Break);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 8000);
module.exports = app;
