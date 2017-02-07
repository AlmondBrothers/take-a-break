var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var autoIncrement = require('mongoose-auto-increment');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client'));

var db = mongoose.connect('mongodb://localhost/takeABreak');
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
// app.get('/api/users/:_id', function(req, res) {
//   // var userName = {'name': req.params.name};

//   User.getUserById(req.params._id, function(err, user) {
//     if (err) {
//       console.log('error: ', err);
//     }

//     res.json(user);
//   });
// });

// Create a route to POST a new user!
app.post('/api/users', function(req, res) {
  // Obtain all the data 'requested' from the 'client'
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
