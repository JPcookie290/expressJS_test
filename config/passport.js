const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/querys");
const { verifyPassword } = require("../lib/passwordUtil");

const verifyCallback = async (username, password, done) => {
  try {
    const user = await db.getUserCredentials(username);
    if (!user) {
      return done(null, false, { message: "incorrect username" });
    }
    const match = await verifyPassword(password, user.password);
    if (!match) {
      return done(null, false, { message: "incorrect password" });
    }
    return done(null, user);
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
