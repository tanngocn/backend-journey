const express = require('express');

/** passport encoding password;
 * @install
 * npm install passport passport-local
 */

// passport package
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportRouter = express.Router();

// Add the middleware to initialize the passport library below:
passportRouter.use(passport.initialize());
// Add the middleware to implement a session with passport below:
passportRouter.use(passport.session());

// using passport LocalStrategy
passport.use(
  new LocalStrategy(function (username, password, done) {
    // Look up user in the db
    db.users.findByUsername(username, (err, user) => {
      // If there's an error in db lookup,
      // return err callback function
      if (err) return done(err);

      // If user not found,
      // return null and false in callback
      if (!user) return done(null, false);

      // If user found, but password not valid,
      // return err and false in callback
      if (user.password != password) return done(null, false);

      // If user found and password valid,
      // return the user object in callback
      return done(null, user);
    });
  })
);
/**
 * If authentication succeeds, a session will be established and maintained via a cookie
 * set in the user’s browser. However, if a user logs in and refreshes the page,
 * the user data won’t persist across HTTP requests. We can fix this by serializing and deserializing users.
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});
/**
 * When we serialize a user, Passport takes that user id and stores it internally
 * on req.session.passport which is Passport’s internal mechanism to keep track of things.
 */
/**
 * The first argument in the done() function is an error object.
 * In this case, since there was no error we pass null as the argument.
 * For the second argument, we pass in the value that we want to store
 * in our Passport’s internal session, the user id. Once configured,
 * the user id will then be stored in Passport’s internal session:
 * @log req.session.passport.user ~ {id: 'xyz'}
 */

/**
 * For any subsequent request, the user object can be retrieved from
 * the session via the @func deserializeUser() function.
 *  We can implement the deserializeUser function as follows:
 */

passport.deserializeUser((id, done) => {
  // Look up user id in database.
  db.users.findById(id, function (err, user) {
    if (err) return done(err);
    done(null, user);
  });
});
/**
 * For the deserializeUser function, we pass the key that was used when we initially
 *  serialized a user (id). The id is used to look up the user in storage,
 *  and the fetched object is attached to the request object as req.user across our whole application.
 */
module.exports = {
  passportRouter,
};
