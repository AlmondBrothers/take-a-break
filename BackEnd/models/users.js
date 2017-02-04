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
  // see line 19 - represents 'User' table access by Mongoose ORM
  User.find(callback).limit(limit);
};

// '/api/users/:id - http://mongoosejs.com/docs/api.html#model_Model.findById
module.exports.getUserById = function(id, callback) {
  // see line 19 - represents 'User' table access by Mongoose ORM
  User.findById(id, callback);
};

// '/api/users/:name' in server.js
module.exports.getUserByName = function(userName, callback) {
  // see line 19 - represents 'User' table access by Mongoose ORM
  // User.findOne(userName, callback);
  // var query = User.where(userName);
  // query.findOne(callback);
  var specificUser = {name: userName};

  User.findOne(specificUser, callback);
};

// '/api/users/' in server.js
module.exports.addUser = function(userName, callback) {
  // http://mongoosejs.com/docs/models.html - create: User.create({}, callback)
  // callback in 'server.js' should be function (err, userName)
  User.create(userName, callback);
};

// '/api/users/' in server.js
module.exports.updateUserPassWord = function(email, pass, options, callback) {
  // email is the only 'unique' attribute!
  var query = {email: email};
  // only updating the password - not sure if this works
  var update = {password: pass};
  // http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
  User.findOneAndUpdate(query, update, options, callback);
};

// Update the Password 'PUT REQUEST'


// ** Dummy Data Instance **/
// var marcus = new User({
//   name: 'Marcus',
//   email: 'marcussvehlak.code@gmail.com',
//   password: 'asdf',
//   phoneNumber: '925-787-9988',
//   preferences: {
//     breaks: 3,
//     mental: 70,
//     physical: 30,
//   },
//   completedTasks: [],
// });

// marcus.save(function(err) {
//   if (err) {
//     console.log('Could Not Save User, Marcus: ', err);
//   // SAVE!
//   }
// });
