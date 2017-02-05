var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  preferences: {
    breaks: {type: Number, required: true},
    mental: {type: Number, required: true},
    physical: {type: Number, required: true},
  },
  completedTasks: [
    // type: mental or physical
    {type: String, date: Date},
  ],
});

var User = module.exports = mongoose.model('User', userSchema);

// '/api/users/' in server.js
module.exports.getUsers = function(callback, limit) {
  User.find(callback).limit(limit);
};

// '/api/users/:id - http://mongoosejs.com/docs/api.html#model_Model.findById
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

// '/api/users/:name' in server.js
module.exports.getUserByName = function(userName, callback) {
  var specificUser = {name: userName};

  User.findOne(specificUser, callback);
};

// '/api/users/' in server.js
module.exports.addUser = function(userName, callback) {
  // http://mongoosejs.com/docs/models.html - create: User.create({}, callback)
  // callback in 'server.js' should be function (err, userName)
  User.create(userName, callback);
};

// ** Dummy Data Instance **/
var marcus = new User({
  name: 'Hello',
  email: 'helloworld@gmail.com',
  password: 'asdf',
  phoneNumber: '925-666-7777',
  preferences: {
    breaks: 3,
    mental: 70,
    physical: 30,
  },
  completedTasks: [],
});

marcus.save(function(err) {
  if (err) {
    console.log('Could Not Save This Specific User: ', err);
  }
});
