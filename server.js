var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(_dirname + FILL_ME_IN))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/takeABreak');
var db = mongoose.connection;

// require('.config')(app, express);
// require('./config/routes.js')(app, express);

//Refer to the --> MONGO 'collection' table
//NAME_OF_COL = require('./UPDATE_ME.js');

app.listen(8000);

module.exports = app;