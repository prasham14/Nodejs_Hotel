const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./models/person");
passport.use(
  new localStrategy(async (username, password, done) => {
    // login authentication

    try {
      // console.log("Received data : ", username, password);
      const user = await Person.findOne({ username });
      if (!user) return done(null, false, { message: "Incorrect Username" });

      const ispasswordRight = await user.comparePassword(password);
      if (ispasswordRight) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
