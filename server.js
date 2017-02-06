var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var autoIncrement = require('mongoose-auto-increment');
var app = express();

var mongo_uri = ENV['PROD_MONGODB'];

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// var db = mongoose.connect('mongodb://localhost/takeABreak');

var db = mongoose.connect(mongo_uri);

autoIncrement.initialize(db);

User = require('./BackEnd/models/users.js');
Break = require('./BackEnd/models/breaks.js');

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Get a Break !
app.get('/api/break/', function(req, res) {
  Break.getBreak(function(err, aBreak) {
    if (err) {
      console.log('Could Not retrieve a specific Break: ', err);
    }
    res.json(aBreak);
  });
});

// TODO: Get All Users
// app.get('/api/users', function(req, res) {
//   console.log('server.js - api/users');
//   User.getUsers(function(err, users) {
//     if (err) {
//       console.log('Could not retrieve All Users: ', err);
//     }
//     res.json(users);
//   });
// });

// TODO: Create a route to get UserById!
app.get('/api/users/:email', function(req, res) {
  // var userName = {'name': req.params.name};
  console.log('Request to /api/users/:email successful!');
  User.getUserByEmail(req.params.email, function(err, user) {
    console.log('User is: ', user);
    if (err) {
      console.log('User error: ', err);
    }

    res.json(user);
  });
});

// Create a route to POST a new user!
app.post('/api/users', function(req, res) {
  // Obtain all the data 'requested' from the 'client'
  console.log('Request to /api/users successful!');
  var newUser = req.body;

  User.addUser(newUser, function(err, newUser) {
    if(err) {
      throw err;
    }
    // Respond back will all 'data' for the 'newUser'
    res.json(newUser);
  });
});

app.listen(8000);
module.exports = app;
