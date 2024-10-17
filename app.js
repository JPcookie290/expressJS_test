const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

// define public assets path (frontend)
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// define view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// read body
app.use(express.urlencoded({ extended: true }));

// session start
const sessionStore = require("./session/sessionStore");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

//init passport
require("./config/passport");
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//debug passport
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);
const messageRouter = require("./routes/messageRouter");
app.use("/messages", messageRouter);


app.listen(PORT);
