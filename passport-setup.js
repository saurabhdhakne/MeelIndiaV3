var passport = require('passport')

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
   done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: "416605011673-84me0ll76ug0orh56l6ke9foc3f3n46i.apps.googleusercontent.com",
    clientSecret: "CiMh_S62F3PxRy_bzqm26GfF",
    callbackURL: "https://meelindia.com/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));