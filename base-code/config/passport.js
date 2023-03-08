// base passport basic using passport

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const helper = require("../helpers/helper");
// Set up the Passport strategy:
passport.use(
  new LocalStrategy(async function (username, password, done) {
    // Look up user in the db
    helper.findByUsername(username, async (err, user) => {
      const matchedPassword = await bcrypt.compare(password, user.password);

      if (err) return done(err);
      if (!user) return done(null, false);
      if (!matchedPassword) return done(null, false);
      console.log("toi day chua");
      return done(null, user);
    });
  })
);
// Serialize a user
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

// Deserialize a user
passport.deserializeUser((id, done) => {
  helper.findById(id, (err, user) => {
    if (!user) return done(err);
    return done(null, user);
  });
});
