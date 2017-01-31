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
