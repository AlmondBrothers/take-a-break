var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

// autoIncrement.initialize(connection);

var breakSchema = mongoose.Schema({
  // _id: {type: Number, required: true}
  type: {type: String, required: true},
  title: {type: String, required: true, unique: true},
  description: {type: String, required: true, unique: true},
  // seq: {}
});

breakSchema.plugin(autoIncrement.plugin, {
  model: 'Break',
  startAt: 1,
});

var Break = module.exports = mongoose.model('Break', breakSchema);

var mentalBreaks = require('../data/mental.json');
var physicalBreaks = require('../data/physical.json');

Break.resetCount(function(err, nextCount) {
  console.log('Count is at: ', nextCount);
});

// Mental Break JSON upload
Break.create(mentalBreaks, function(err, breaks) {
  if (err) {
    return console.log(err);
  }
  // console.log('Number of Mental Breaks: ', breaks.length);
  Break.create(physicalBreaks, function(err, breaks) {
  if (err) {
    return console.log(err);
  }
  console.log('Number of Physical Breaks: ', breaks.length);
  });
});

// Physical Break JSON upload
// Break.create(physicalBreaks, function(err, breaks) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('Number of Physical Breaks: ', breaks.length);
// });

function randNumGen() {
  // TODO: change '10' to 'breaks.length'...
  return Math.floor(Math.random() * 10) + 1;
};

// Random Number Generator - BreakById
module.exports.getBreak = function(callback) {
  // Get a random Break by its _id
  var BreakId = randNumGen();

  Break.find({_id: BreakId}, callback);
};
