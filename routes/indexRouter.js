// Other version
// const { Router } = require("express");
// const indexRouter = Router();

const indexRouter = require("express").Router();

//index
const indexController = require("../controllers/indexController");
indexRouter.get("/", indexController.indexMessageGet);

//login/signup
const signUpController = require("../controllers/signUpController");
indexRouter.get("/signup", signUpController.singUpGet);
indexRouter.post("/signup", signUpController.singUpPost);

module.exports = indexRouter;
