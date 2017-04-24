const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../server/models/users');
// const Break = require('./BackEnd/models/breaks.js');
// load the auth variables
const configAuth = require('./auth');

module.exports = (passport) => {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => done(null, user.id));

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  passport.use(new GoogleStrategy({
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL,
  },
  (token, refreshToken, profile, done) => {
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(() => {
      // try to find the user based on their google id
      User.findOne({
        'id': profile.id
      },
      (err, user) => {
        if (err) return done(err);
        // if a user is found, log them in
        if (user) return done(null, user);
        // if the user isnt in our database, create a new user
        let newUser = new User();
        // set all of the relevant information
        newUser.id = profile.id;
        newUser.token = token;
        newUser.name = profile.displayName;
        newUser.email = profile.emails[0].value; // pull the first email
        // save the user
        newUser.save((err) => {
          if (err) throw err;
          return done(null, newUser);
        });
      });
    });
  }));
};
