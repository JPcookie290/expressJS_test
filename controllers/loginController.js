const loginGet = (req, res, next) => {
  res.render("login", {
    title: "Login",
  });
};

module.exports = {
  loginGet,
};
