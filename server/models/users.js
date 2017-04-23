const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String },
  id: { type: String },
  phoneNumber: { type: String },
  preferences: {
    breaks: { type: Number },
    mental: { type: Number },
    physical: { type: Number },
  },
  completedTasks: [
    // type: mental or physical
    { type: String, date: Date },
  ],
});

const User = module.exports = mongoose.model('User', userSchema);

User.getUsers = function (callback, limit) {
  User.find(callback).limit(limit);
};

// '/api/users/:id'
User.getUserById = function (id, callback) {
  User.findById(id, callback);
};

// '/api/users/:email'
User.getUserByEmail = function (email, callback) {
  const specificEmail = { email };
  console.log('specificEmail is: ', specificEmail);
  User.findOne(specificEmail, callback);
};

// '/api/users/'
User.addUser = function (userName, callback) {
  User.create(userName, callback);
};
