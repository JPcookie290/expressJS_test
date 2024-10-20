// Other version
// const { Router } = require("express");
// const indexRouter = Router();
const passport = require("passport");
const { isMemberOrAdmin } = require("../middleware/authMiddleware");

const indexRouter = require("express").Router();

//index
const indexController = require("../controllers/indexController");
indexRouter.get("/", indexController.indexMessageGet);

//signup
const signUpController = require("../controllers/signUpController");
indexRouter.get("/signup", signUpController.singUpGet);
indexRouter.post("/signup", signUpController.singUpPost);

//login
const loginController = require("../controllers/loginController");
indexRouter.get("/login", loginController.loginGet);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/",
  })
);

//logout
indexRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});


//members
const memberController = require("../controllers/memberController");

indexRouter.get("/member-codes", isMemberOrAdmin, memberController.memberCodesGet)
indexRouter.get("/become-member", memberController.memberGet)
indexRouter.post("/become-member", memberController.memberPost)

module.exports = indexRouter;
