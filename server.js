var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
// var db = require('./db');
    
function findByUsername(username, callback) {
    callback(null, "kjartan");

}

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    console.log("test");
    console.log(username, password);
    var user = {
        "username": "kjartan",
        "id" : "1231"
    }
    cb(null, user);
    
  }));



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
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    cb(null, { username: "kjartan", id: 1231})
  // db.users.findById(id, function (err, user) {
  //   if (err) { return cb(err); }
  //   cb(null, user);
  // });
});




// Define routes.
app.get('/',
  function(req, res) {
    res.send({ user: req.user });
  });

app.get('/login',
  function(req, res){
    res.send('login');
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login-fail' }),
  function(req, res) {
    res.redirect('/');
  });
  
  

app.listen(3005);