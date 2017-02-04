var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var autoIncrement = require('mongoose-auto-increment');
var app = express();

app.use(express.static(__dirname + '/client'));
console.log('__dirname', __dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Refer to the --> MONGO 'collection' table
// ex: NAME_OF_COL = require('./UPDATE_ME.js');
// User = require('./BackEnd/models/users.js');
// Break = require('./BackEnd/models/breaks.js');

mongoose.connect('mongodb://localhost/takeABreak');
var db = mongoose.connection;
autoIncrement.initialize(db);

User = require('./BackEnd/models/users.js');
Break = require('./BackEnd/models/breaks.js');

// require('.config')(app, express);
// require('./config/routes.js')(app, express);

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

// Get All Users
app.get('/api/users', function(req, res) {
  User.getUsers(function(err, users) {
    if (err) {
      console.log('Could not retrieve All Users: ', err);
    }
    res.json(users);
  });
});

// Create a route to get UserById!
app.get('/api/users/:_id', function(req, res) {
  // var userName = {'name': req.params.name};

  User.getUserById(req.params._id, function(err, user) {
    if (err) {
      console.log('error: ', err);
    }

    res.json(user);
  });
});

// Create a route to get UserByName - DOES NOT WORK
app.get('/api/users/:name', function(req, res) {
  var userName = {'name': req.params.name};

  User.getUserByName(userName, function(err, user) {
    if (err) {
      console.log('error: ', err);
    }
    // respond back all 'data' for the specific user!
    // console.log(res.json(user));
    if (user) {
      console.log('Trying to Get a specific userName!');
      res.json(user);
    }
  });
});

// Create a route to POST a new user!
app.post('/api/users', function(req, res) {
  // obtain all the data 'requested' from the 'client'
  var newUser = req.body;

  User.addUser(newUser, function(err, newUser) {
    if(err) {
      throw err;
    }
    // respond back will all 'data' for the 'newUser'
    res.json(newUser);
  });
});

// Create a route to PUT (update) a user's password!
app.put('/api/users/:_id', function(req, res) {
  // obtain all the data 'requested' from the 'client'
  var email = req.body.email;
  var newPass = req.body.password;

  console.log('Email: ', email);
  console.log('Password: ', newPass);

  User.updateUserPassWord(email, newPass, {}, function(err, newUserPassword) {
    if(err) {
      console.log(err);
    }
    // respond back will all 'data' for the 'newUser'
    res.json(newUserPassword);
  });
});

app.listen(8000);

module.exports = app;
