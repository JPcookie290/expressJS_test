// 1st Version
const express = require("express"); // npm install express

require("dotenv").config(); // npm i dotenv
const PORT = process.env.PORT || 3000;

const app = express();

const globalMiddleware = (req, res, next) => {
  console.log("global middleware running ...");
  next();
};
// register global middleware
app.use(globalMiddleware);

const middleware = (reg, res, next) => {
  res.send("hello express");
  next();
};

const middleware2 = (req, res, next) => {
  console.log("this is middleware #2");
  next();
};

const middleware3 = (req, res) => {
  console.log("this is middleware #3");
};

app.get("/", middleware, middleware2, middleware3);
// Code order is important
app.get("/users/create", (req, res) => {
  res.send("create new user");
});
app.get("/users/:userId", (req, res) => {
  console.log(`This is my user ID ${req.params.userId}`);
});
app.get("/login", (req, res) => {
  res.send("this is login");
});

app.listen(PORT); // can also use callback functions app.listen(PORT, () => console.log(`Sever at PORT: ${PORT}`));

// 2nd Version
