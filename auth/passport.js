const db = require("../db/index.js");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const response = await db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      if (response.rows.length === 0) {
        return done(null, false);
      }

      const user = response.rows[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const response = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, response.rows[0]);
  } catch (e) {
    done(e);
  }
});

module.exports = passport;