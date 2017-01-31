var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/client'));
console.log('__dirname', __dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

User = require('./BackEnd/models/users.js');
Break = require('./BackEnd/models/breaks.js');

mongoose.connect('mongodb://localhost/takeABreak');
var db = mongoose.connection;

// require('.config')(app, express);
// require('./config/routes.js')(app, express);

// Refer to the --> MONGO 'collection' table
// NAME_OF_COL = require('./UPDATE_ME.js');

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// app.get('/api/users', function (req, res) {
//   Genre.getGenres(function(err, genres) {
//     if (err) {
//       console.log('error: ' + err);
//     }
//     res.json(genres);
//   });
// });

// app.post('/api/users', function (req, res)  {
//   var genre = req.body;

//   Genre.addGenre(genre, function (err, genre)  {
//     if(err){
//       throw err;
//     }
//     res.json(genre);
//   });
// });

app.listen(8000);

module.exports = app;
