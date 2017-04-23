module.exports = (app, passport, Break) => {
  // route for home page
  app.get('/', (req, res) => {
    res.render('index.html'); // load the index.ejs file
  });
  // route for showing the profile page
  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });
  // route for logging out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/#/home',
      failureRedirect: '/'
  }));

  app.get('/api/break', (req, res) => {
    Break.getBreak((err, randomBreak) => {
      if (err) console.log(err);
      res.json(randomBreak);
    });
  });
};

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
};
