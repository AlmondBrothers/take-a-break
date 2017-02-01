"use strict";
// NPM install mongoose and chai. Make sure mocha is globally
// installed
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var chai = require('chai');
var expect = chai.expect;
// Create a new schema that accepts a 'name' object.
// 'name' is a required field
// var testSchema = new Schema({
//   name: { type: String, required: true }
// });

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


//Create a new collection called 'User'

var User = module.exports = mongoose.model('User', userSchema);



describe('Database Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('Test Database', function() {
    //Save object with 'name' value of 'Marcus"
    it('New name saved to test database', function(done) {
     var marcus = new User({
       name: 'Marcus',
       email: 'marcussvehlak.code@gmail.com',
       password: 'asdf',
       phoneNumber: '925-787-9988',
       preferences: {
         breaks: 3,
         mental: 70,
         physical: 30,
       },
       completedTasks: [],
     });
 
      marcus.save(done);
    });
    
    it('Dont save incorrect format to database', function(done) {
      //Attempt to save with wrong info. An error should trigger
    var wrongMarcus = new User({
      name: '',
      email: 'peterianmuller@gmail.com',
      password: '',
      phoneNumber: '510-687-9988',
      preferences: {
        breaks: 3,
        mental: 70,
        physical: 30,
      },
      completedTasks: [],
    });

      wrongMarcus.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    
    it('Should retrieve data from test database', function(done) {
      //Look up the 'Marcus' object previously saved.
      User.find({name: 'Marcus'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });
  });
  //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});