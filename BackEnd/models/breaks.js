var mongoose = require('mongoose');

var breakSchema = mongoose.Schema({
  type: {type: String, required: true},
  title: {type: String, required: true, unique: true},
  description: {type: String, required: true, unique: true},
});

var Break = module.exports = mongoose.model('Break', breakSchema);

var mentalBreaks = require('../data/mental.json');
var physicalBreaks = require('../data/physical.json');

// Mental Break JSON upload
Break.create(mentalBreaks, function(err, breaks) {
  if (err) {
    return console.log(err);
  }
  console.log('Number of Mental Breaks: ', breaks.length);
});

// Physical Break JSON upload
Break.create(physicalBreaks, function(err, breaks) {
  if (err) {
    return console.log(err);
  }
  console.log('Number of Physical Breaks: ', breaks.length);
});
