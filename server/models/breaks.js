const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const breakSchema = mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
});

breakSchema.plugin(autoIncrement.plugin, {
  model: 'Break',
  startAt: 1,
});

const Break = module.exports = mongoose.model('Break', breakSchema);

const mentalBreaks = require('../data/mental.json');
const physicalBreaks = require('../data/physical.json');

Break.resetCount((err, nextCount) => {
  console.log('Count is at: ', nextCount);
});

// Mental Break JSON upload
Break.create(mentalBreaks, (err, breaks) => {
  if (err) {
    return console.log(err);
  }
  // Create Physical Break JSON upload
  Break.create(physicalBreaks, (err, breaks) => {
    if (err) {
      return console.log(err);
    }
  });
});

function randNumGen() {
  // TODO: change '10' to 'breaks.length'...
  return Math.floor(Math.random() * 10) + 1;
}

// Random Number Generator - BreakById
module.exports.getBreak = callback => {
  // Get a random Break by its _id
  const BreakId = randNumGen();

  Break.find({ _id: BreakId }, callback);
};
