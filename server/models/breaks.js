const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const mentalBreaks = require('../data/mental.json');
const physicalBreaks = require('../data/physical.json');

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

Break.resetCount((err, nextCount) => {
  console.log('Count is at: ', nextCount);
});

Break.create(mentalBreaks, (err, breaks) => {
  if (err) return console.log(err);
  Break.create(physicalBreaks, (err, breaks) => {
    if (err) return console.log(err);
  });
});

function randNumGen() {
  // TODO: change '10' to 'breaks.length'...
  return Math.floor(Math.random() * 10) + 1;
}

// Random Number Generator - BreakById
module.exports.getBreak = callback => {
  const BreakId = randNumGen();
  Break.find({ _id: BreakId }, callback);
};
