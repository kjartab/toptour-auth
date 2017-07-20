


var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
// var db = require('./db');

    
function findOrCreate(username, callback) {
    callback(null, "kjartan");

}

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
 
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3010/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(accessToken);
    console.log(refreshToken);
    console.log(done);
    done(null, profile);
    // findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Create a new Express application.
var app = express();
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));



app.use(passport.initialize());
app.use(passport.session());


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//     cb(null, { username: "kjartan", id: 1231})
//   // db.users.findById(id, function (err, user) {
//   //   if (err) { return cb(err); }
//   //   cb(null, user);
//   // });
// });




// Define routes.
app.get('/',
  function(req, res) {
    res.send({ user: req.user });
  });


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(res);
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  

app.listen(3010);